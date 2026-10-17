/**
 * hakomc/testing — @minecraft/server の模擬環境を、テストから操作するための API。
 *
 * ```ts
 * import { sim } from 'hakomc/testing';
 *
 * sim.defineEntityType('my:boss', { health: 300, properties: { 'my:rage': false } });
 * const player = sim.spawnPlayer('Steve', { x: 0, y: 64, z: 5 });
 * const boss = sim.spawn('my:boss', { x: 0, y: 64, z: 0 });
 * sim.tick(40);
 * expect(player.getComponent('health').currentValue).toBeLessThan(20);
 * ```
 */
import { state, signals, record, clearAllSubscriptions, type EntityTypeDef, type LogEntry, type Vector3 } from './runtime';
import { MockEntity, MockPlayer, stepPhysics, flushProperties } from './entity';
import { MockCustomCommandRegistry, selectEntities, tokenize } from './commands';
import { getDimension, world as mockWorld, system as mockSystem } from './server';
import type { Entity, Player, Dimension, World, System } from '@minecraft/server';

export type { EntityTypeDef, LogEntry, Vector3 };
export { MockEntity, MockPlayer };

function runTimers() {
  const due = [...state.timers.values()].filter((t) => t.at <= state.tick).sort((a, b) => a.at - b.at || a.id - b.id);
  for (const t of due) {
    if (!state.timers.has(t.id)) continue;   // 同じ tick の中で clearRun された
    try {
      if (t.job) {
        const r = t.job.next();
        if (r.done) { state.timers.delete(t.id); continue; }
      } else {
        t.fn();
      }
    } catch (e) {
      state.errors.push({ where: `timer#${t.id}`, error: e });
    }
    if (t.every) t.at = state.tick + t.every;
    else state.timers.delete(t.id);
  }
}

function advanceOneTick() {
  state.tick++;
  stepPhysics();
  runTimers();
  flushProperties();
}

/** 前回の確認以降に、スクリプト側で投げられた例外 */
let reportedErrors = 0;
function rethrowNewErrors() {
  if (!sim.rethrowErrors || state.errors.length === reportedErrors) return;
  const e = state.errors[reportedErrors];
  reportedErrors = state.errors.length;
  const err = e.error instanceof Error ? e.error : new Error(String(e.error));
  err.message = `[hakomc/testing] ${e.where} で例外: ${err.message}`;
  throw err;
}

/** 戦闘ログなどをまとめて調べるための絞り込み */
function logOf(kind?: string, where: Partial<LogEntry> = {}): LogEntry[] {
  return state.log.filter((l) => (!kind || l.kind === kind) && Object.entries(where).every(([k, v]) => l[k] === v));
}

/** entity JSON（behavior pack）から、模擬環境に必要な情報を読み取る */
function typeFromEntityJson(json: any): [string, EntityTypeDef] {
  const ent = json['minecraft:entity'];
  if (!ent) throw new Error('[hakomc/testing] minecraft:entity がない JSON です');
  const id: string = ent.description.identifier;
  const comps = { ...(ent.components ?? {}) };
  const props: Record<string, any> = {};
  for (const [k, v] of Object.entries<any>(ent.description.properties ?? {})) props[k] = v.default ?? (v.type === 'bool' ? false : v.type === 'enum' ? v.values?.[0] : 0);
  const events: EntityTypeDef['events'] = {};
  for (const [k, v] of Object.entries<any>(ent.events ?? {})) if (v?.set_property) events[k] = { setProperty: v.set_property };
  const seats = comps['minecraft:rideable']?.seats?.map((s: any) => {
    const p = s.position ?? [0, 0, 0];
    return { x: p[0], y: p[1], z: p[2] };
  });
  const box = comps['minecraft:collision_box'];
  return [id, {
    health: comps['minecraft:health']?.max ?? comps['minecraft:health']?.value,
    families: comps['minecraft:type_family']?.family,
    properties: props,
    seats,
    physics: !!comps['minecraft:physics'],
    collision: box ? { width: box.width, height: box.height } : undefined,
    movement: comps['minecraft:movement']?.value,
    events,
  }];
}

let commandRegistry: MockCustomCommandRegistry | undefined;

export const sim = {
  /** スクリプトの例外（タイマーやイベントハンドラ内）を、tick() の呼び出し元に投げ直すか。既定 true */
  rethrowErrors: true,

  get tickCount() { return state.tick; },
  get world(): World { return mockWorld as unknown as World; },
  get system(): System { return mockSystem as unknown as System; },
  get log() { return state.log; },
  get errors() { return state.errors; },

  /** n tick 進める。物理 → タイマー → setProperty の反映、の順 */
  tick(n = 1) {
    for (let i = 0; i < n; i++) {
      advanceOneTick();
      rethrowNewErrors();
    }
  },

  /** await を含むスクリプト（sleep / waitTicks など）向け。tick ごとに Promise の続きを走らせる */
  async tickAsync(n = 1) {
    for (let i = 0; i < n; i++) {
      advanceOneTick();
      await new Promise((r) => setImmediate(r));
      rethrowNewErrors();
    }
  },

  /** 条件を満たすまで進める。満たしたときの tick 数を返し、max を超えたら例外 */
  tickUntil(predicate: () => boolean, max = 2000) {
    for (let i = 0; i < max; i++) {
      if (predicate()) return i;
      this.tick();
    }
    if (predicate()) return max;
    throw new Error(`[hakomc/testing] ${max} tick 以内に条件を満たさなかった`);
  },

  /**
   * エンティティと記録を消して tick を 0 に戻す。
   * スクリプトが登録したイベント購読や runInterval は残す（モジュールの読み込みは 1 回きりのため）。
   * all: true なら購読やタイマーも全部消す。
   */
  reset({ all = false } = {}) {
    for (const e of state.entities.values()) e._valid = false;
    state.entities.clear();
    state.pendingProperties.length = 0;
    state.worldDynamic.clear();
    state.blocks.clear();
    state.log.length = 0;
    state.errors.length = 0;
    reportedErrors = 0;
    state.groundY = -Infinity;
    state.difficulty = 'Normal';
    state.tick = 0;
    for (const t of [...state.timers.values()]) {
      if (all || !t.every) state.timers.delete(t.id);
      else t.at = t.every;
    }
    if (all) {
      state.types.clear();
      clearAllSubscriptions();
    }
  },

  /** エンティティの種類を登録する（プロパティ、体力、座席、物理など） */
  defineEntityType(typeId: string, def: EntityTypeDef) {
    state.types.set(typeId, def);
  },

  /** behavior pack の entity JSON から種類を登録する */
  loadEntityJson(json: any) {
    const [id, def] = typeFromEntityJson(json);
    state.types.set(id, def);
    return id;
  },

  /**
   * hakomc/entity で定義したクラスの JSON（部位のエンティティも含む）を、まとめて読み込む。
   * @returns 読み込んだエンティティの識別子
   */
  loadEntityClass(cls: { toFiles(): { behavior: Record<string, unknown> } }): string[] {
    return Object.values(cls.toFiles().behavior)
      .filter((json: any) => json?.['minecraft:entity'])
      .map((json) => this.loadEntityJson(json));
  },

  dimension(id = 'overworld'): Dimension { return getDimension(id) as unknown as Dimension; },

  /** エンティティを出す。戻り値は本物の Entity 型（スクリプトの関数にそのまま渡せる） */
  spawn(typeId: string, location: Vector3, dimension = 'overworld'): Entity {
    return getDimension(dimension).spawnEntity(typeId, location) as unknown as Entity;
  },

  /** プレイヤーを出す（実機の spawnEntity ではプレイヤーは出せないため、専用の関数） */
  spawnPlayer(name = 'Steve', location: Vector3 = { x: 0, y: 64, z: 0 }, opts: { gameMode?: string, dimension?: string } = {}): Player {
    const p = new MockPlayer(name, getDimension(opts.dimension ?? 'overworld'), location);
    if (opts.gameMode) p._gameMode = opts.gameMode;
    state.entities.set(p.id, p);
    record('spawn', { entityId: p.id, typeId: p.typeId, location: { ...location } });
    signals.worldAfter.playerSpawn.emit({ player: p, initialSpawn: true });
    return p as unknown as Player;
  },

  /**
   * 模擬エンティティの内部状態を触る（テスト専用）。
   * 例: sim.internals(boss).headYawOffset = 90  … 頭だけ別の方向を向いている状態を作る
   */
  internals(entity: Entity | Player) {
    const e = entity as unknown as MockEntity;
    return {
      get headYawOffset() { return e._headYawOffset; },
      set headYawOffset(v: number) { e._headYawOffset = v; },
      get velocity() { return { ...e._vel }; },
      get onGround() { return e._ground; },
      set onGround(v: boolean) { e._ground = v; },
      get pendingProperties() { return state.pendingProperties.filter(([x]) => x === e).map(([, k, v]) => [k, v]); },
      get riders() { return e._riders as unknown as Entity[]; },
      setHealth(v: number) { e._hp = v; },
    };
  },

  /** 死んだプレイヤーを生き返らせる（playerSpawn が initialSpawn: false で発火する） */
  respawn(playerArg: Player, location?: Vector3) {
    const player = playerArg as unknown as MockPlayer;
    player._dead = false;
    player._hp = player._maxHp;
    if (location) player._loc = { ...location };
    signals.worldAfter.playerSpawn.emit({ player, initialSpawn: false });
  },

  /**
   * スクリプトを通さずにダメージを与える（バニラのモブの攻撃などの再現）。
   * applyDamage と違い 0 ダメージでも割り込みイベントまで流れる。
   */
  hurt(targetArg: Entity, amount: number, opts: { cause?: string, damagingEntity?: Entity } = {}) {
    const target = targetArg as unknown as MockEntity;
    // 近接攻撃が当たったことの通知（ダメージが取り消されても、当たったこと自体は通知される）
    if (opts.damagingEntity && (opts.cause ?? 'entityAttack') === 'entityAttack') {
      signals.worldAfter.entityHitEntity.emit({ damagingEntity: opts.damagingEntity, hitEntity: target });
    }
    const before = { hurtEntity: target, damage: amount, damageSource: { cause: opts.cause ?? 'entityAttack', damagingEntity: opts.damagingEntity }, cancel: false };
    signals.worldBefore.entityHurt.emit(before);
    if (before.cancel) { record('damageCancelled', { entityId: target.id, damage: amount, by: opts.damagingEntity?.typeId }); rethrowNewErrors(); return false; }
    const r = before.damage > 0 ? target.applyDamage(before.damage, opts as any) : true;
    rethrowNewErrors();
    return r;
  },

  /** 起動時のイベント（system.beforeEvents.startup）を出す。カスタムコマンドはここで登録される */
  startup() {
    const reg = new MockCustomCommandRegistry();
    commandRegistry = reg;
    signals.systemBefore.startup.emit({ customCommandRegistry: reg, blockComponentRegistry: {}, itemComponentRegistry: {} });
    rethrowNewErrors();
    return reg;
  },

  /**
   * 登録されたカスタムコマンドを実行する（先に sim.startup() が必要）。
   * 例: sim.command('/hakomc:run pounce', { player }) / sim.command('/hakomc:info @e[type=demo:frog]')
   * @returns コマンドの結果（{ status, message }）
   */
  command(line: string, opts: { player?: Player } = {}): { status: number, message?: string } {
    if (!commandRegistry) throw new Error('[hakomc/testing] 先に sim.startup() を呼ぶ（カスタムコマンドは起動時に登録される）');
    const [name, ...args] = tokenize(line.replace(/^\//, ''));
    const cmd = commandRegistry.commands.get(name);
    if (!cmd) throw new Error(`[hakomc/testing] コマンド ${name} は登録されていない`);
    const params = [...(cmd.def.mandatoryParameters ?? []), ...(cmd.def.optionalParameters ?? [])];
    if (args.length < (cmd.def.mandatoryParameters?.length ?? 0)) throw new Error(`[hakomc/testing] ${name}: 引数が足りない`);
    if (args.length > params.length) throw new Error(`[hakomc/testing] ${name}: 引数が多すぎる`);
    const source = opts.player as unknown as MockEntity | undefined;
    const values = args.map((a, i) => {
      const p = params[i];
      switch (p.type) {
        case 'Enum': {
          const vs = commandRegistry!.enums.get(p.name)!;
          if (!vs.includes(a)) throw new Error(`[hakomc/testing] ${name}: ${a} は ${p.name}（${vs.join(' / ')}）に無い`);
          return a;
        }
        case 'Integer': return parseInt(a, 10);
        case 'Float': return parseFloat(a);
        case 'Boolean': return a === 'true';
        case 'EntitySelector':
        case 'PlayerSelector': return selectEntities(a, source);
        default: return a;
      }
    });
    const origin = { sourceType: source ? 'Entity' : 'Server', sourceEntity: source, initiator: source };
    const result = cmd.callback(origin, ...values) ?? { status: 0 };
    record('command', { name, args, status: result.status, message: result.message });
    rethrowNewErrors();
    return result;
  },

  /** /scriptevent の再現。sourceEntity を渡すと /execute as ... run scriptevent 相当 */
  scriptEvent(id: string, message = '', opts: { sourceEntity?: Entity } = {}) {
    signals.systemAfter.scriptEventReceive.emit({ id, message, sourceEntity: opts.sourceEntity, sourceType: opts.sourceEntity ? 'Entity' : 'Server' });
    rethrowNewErrors();
  },

  /** /event entity ... の再現 */
  entityEvent(entity: Entity, eventName: string) {
    entity.triggerEvent(eventName);
    rethrowNewErrors();
  },

  /** 任意のイベントを発火する。例: sim.emit('world.afterEvents.playerLeave', {...}) */
  emit(path: string, payload: any) {
    const [root, kind, name] = path.split('.');
    const group = root === 'system'
      ? (kind === 'beforeEvents' ? signals.systemBefore : signals.systemAfter)
      : (kind === 'beforeEvents' ? signals.worldBefore : signals.worldAfter);
    group[name].emit(payload);
    rethrowNewErrors();
    return payload;
  },

  /** y 未満を地面（固体）にする */
  setGround(y: number) { state.groundY = y; },
  setBlock(location: Vector3, typeId: string) { getDimension('overworld').setBlockType(location, typeId); },
  setDifficulty(d: 'Peaceful' | 'Easy' | 'Normal' | 'Hard') { state.difficulty = d; },

  /** 記録の絞り込み。例: sim.logs('camera', { entityId: player.id }) */
  logs: logOf,
};
