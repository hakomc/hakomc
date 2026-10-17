/**
 * 登録した（register した）エンティティのクラスに、ゲームのイベントを届ける。
 *
 * - エンティティ 1 体につき、クラスのオブジェクトを 1 つ作って持っておく
 * - 出現・読み込み・ダメージ・攻撃・右クリック・死亡・削除・毎 tick を、該当する個体のメソッドに届ける
 * - 登録の一覧は globalThis に置く（ビルド時にプラグインが、ここから JSON を作るエンティティを集めるため）
 */
import { system, world, type Entity } from '@minecraft/server';
import { registry, type Entry, type HookTarget, type LastKnown, type LoadReason, type RegisteredClass } from './registry';
import { installGrab } from './grab';
import { isScriptedHit } from './motion';
import { releaseLeftoverStill } from './still';
import { handlePartGone, handlePartHurt, removeParts, sweepOrphanParts, syncParts } from './parts-runtime';

export { registry, resetRegistry, type LastKnown, type LoadReason, type RegisteredClass } from './registry';

const DIMENSIONS = ['overworld', 'nether', 'the_end'];
let installed = false;

/** クラスを登録し、まだならイベントの購読を始める */
export function register(cls: RegisteredClass): void {
  const map = registry();
  const prev = map.get(cls.id);
  if (prev && prev.cls !== cls) {
    throw new Error(`[hakomc/entity] 識別子 ${cls.id} のクラスが 2 つ register() された（${prev.cls.name} と ${cls.name}）。どちらかの識別子を変えるか、register() を片方だけにする`);
  }
  if (prev) return;
  const proto = cls.prototype as HookTarget;
  map.set(cls.id, {
    cls,
    instances: new Map(),
    last: new Map(),
    hasTick: typeof proto.onTick === 'function',
    hasDie: typeof proto.onDie === 'function',
  });
  install();
}

/** 登録済みなら、そのエンティティのオブジェクト（無ければ作る）。登録していなければ undefined */
export function instanceOf(e: Entity): HookTarget | undefined {
  let entry: Entry | undefined;
  try {
    entry = registry().get(e.typeId);
  } catch {
    return undefined;
  }
  return entry ? ensure(entry, e, 'late') : undefined;
}

/** その種類の、今いる個体のオブジェクト */
export function instancesOf(cls: RegisteredClass): HookTarget[] {
  return [...(registry().get(cls.id)?.instances.values() ?? [])];
}

/**
 * オブジェクトを返す。まだ無ければ作り、onLoad を呼ぶ
 * （出現イベントの前に別のイベントが届いた・起動時の探索で漏れた、などのとき用）
 */
function ensure(entry: Entry, e: Entity, how: LoadReason | { spawn: unknown }): HookTarget {
  const existing = entry.instances.get(e.id);
  // 読み込まれ直したエンティティは、別のオブジェクトとして渡されることがある。古いものが無効なら作り直す
  if (existing && (existing.entity === e || isValid(existing.entity))) return existing;
  const obj = new entry.cls(e);
  entry.instances.set(e.id, obj);
  // 止まっている途中でサーバーが止まった・読み込まれなくなった個体は、移動の速さが 0 のまま保存されているので戻す
  releaseLeftoverStill(e);
  // 部位は、フックより先に座席に乗せておく（onSpawn などで this.part(…).entity を使えるように）
  try {
    syncParts(entry, obj);
  } catch {
    // before イベントの中など、エンティティを出せない場面では次の tick に回す
    system.run(() => {
      if (isValid(obj.entity)) syncParts(entry, obj);
    });
  }
  if (typeof how === 'object') obj.onSpawn?.(how.spawn);
  else obj.onLoad?.(how);
  return obj;
}

const isValid = (e: Entity) => {
  try {
    return e.isValid;
  } catch {
    return false;
  }
};

const entryOf = (e: Entity | undefined): Entry | undefined => {
  if (!e) return undefined;
  try {
    return registry().get(e.typeId);
  } catch {
    return undefined;
  }
};

const forget = (entry: Entry, id: string) => {
  entry.instances.delete(id);
  entry.last.delete(id);
};

/** 起動時・/reload 時に、すでにいる個体を探す */
function scan() {
  for (const entry of registry().values()) {
    for (const dim of DIMENSIONS) {
      let found: Entity[] = [];
      try {
        found = world.getDimension(dim).getEntities({ type: entry.cls.id });
      } catch {
        continue;
      }
      for (const e of found) ensure(entry, e, 'startup');
    }
  }
}

/**
 * その個体の段取りを全て止める。
 * 1 つの後片付け（finally / onCancel）が例外を投げても、ログに出して残りを止め続ける
 * （死亡・削除の処理の途中なので、ここで投げ直すと残りの段取りが止まらないまま残ってしまうため）
 */
/** 向く先へ、1 tick に turnSpeed 度まで回る */
function turnTowards(obj: HookTarget) {
  const f = obj.facing!;
  const to = f.target();
  if (!to) return;
  const e = obj.entity;
  const p = e.location;
  const want = (Math.atan2(-(to.x - p.x), to.z - p.z) * 180) / Math.PI;
  const cur = e.getRotation().y;
  const diff = ((((want - cur) % 360) + 540) % 360) - 180;
  e.setRotation({ x: 0, y: cur + Math.max(-f.turnSpeed, Math.min(f.turnSpeed, diff)) });
}

function cancelTimelines(obj: HookTarget, reason: 'died' | 'removed') {
  for (const t of obj.timelines ?? []) {
    try {
      t.cancel(reason);
    } catch (e) {
      console.error('[hakomc/entity] timeline の後片付けで例外:', e);
    }
  }
}

function snapshot(entry: Entry, obj: HookTarget) {
  const e = obj.entity;
  const properties: LastKnown['properties'] = {};
  for (const p of entry.cls.definition.properties ?? []) {
    const name = entry.cls.propertyName(p);
    properties[name] = e.getProperty(name);
  }
  entry.last.set(e.id, { location: e.location, dimensionId: e.dimension.id, properties });
}

function install() {
  if (installed) return;
  installed = true;
  const after = world.afterEvents;

  after.entitySpawn.subscribe((ev) => {
    const entry = entryOf(ev.entity);
    if (!entry) return;
    // 読み込みによる出現は onLoad として扱う（entityLoad と二重にならないよう、ensure が 1 回にまとめる）
    ensure(entry, ev.entity, ev.cause === 'Loaded' ? 'chunk' : { spawn: ev });
  });
  after.entityLoad.subscribe((ev) => {
    const entry = entryOf(ev.entity);
    if (entry) ensure(entry, ev.entity, 'chunk');
  });
  // cancelVanillaHits: バニラの近接攻撃を取り消す（this.dealDamage() のダメージは通す）。
  // 原因が entityAttack のものだけ。そのエンティティが撃った飛び道具（projectile）などは取り消さない
  world.beforeEvents.entityHurt.subscribe((ev) => {
    if (isScriptedHit()) return;
    if (ev.damageSource.cause !== 'entityAttack') return;
    const src = ev.damageSource.damagingEntity;
    if (!src) return;
    let typeId: string;
    try {
      typeId = src.typeId;
    } catch {
      return;
    }
    const entry = registry().get(typeId);
    if ((entry?.cls.definition as { cancelVanillaHits?: boolean } | undefined)?.cancelVanillaHits) ev.cancel = true;
  });

  after.entityHurt.subscribe((ev) => {
    // 部位へのダメージは本体に伝える
    if (handlePartHurt(ev, (en, body) => ensure(en, body, 'late'))) return;
    const entry = entryOf(ev.hurtEntity);
    if (entry) ensure(entry, ev.hurtEntity, 'late').onHurt?.(ev);
  });
  after.entityHitEntity.subscribe((ev) => {
    const entry = entryOf(ev.damagingEntity);
    if (entry) ensure(entry, ev.damagingEntity, 'late').onHit?.(ev);
  });
  after.playerInteractWithEntity.subscribe((ev) => {
    const entry = entryOf(ev.target);
    if (entry) ensure(entry, ev.target, 'late').onInteract?.(ev);
  });
  after.entityDie.subscribe((ev) => {
    // 実機では、死亡の通知の時点でエンティティはほぼ読めない。id と typeId だけ使う
    let id: string, typeId: string;
    try {
      id = ev.deadEntity.id;
      typeId = ev.deadEntity.typeId;
    } catch {
      return;
    }
    if (handlePartGone(typeId, (en, body) => ensure(en, body, 'late'))) return;
    const entry = registry().get(typeId);
    const obj = entry?.instances.get(id);
    if (!entry || !obj) return;
    const last = entry.last.get(id) ?? { location: { x: 0, y: 0, z: 0 }, dimensionId: '', properties: {} };
    try {
      // 段取りを先に止める（finally の後片付けが、onDie より前に動く）
      cancelTimelines(obj, 'died');
      obj.onDie?.(ev, last);
    } finally {
      removeParts(obj);
      let valid = false;
      try {
        valid = ev.deadEntity.isValid;
      } catch { /* 読めなければ無効 */ }
      if (!valid) forget(entry, id);
    }
  });
  // 消える直前（読み込まれなくなるときも含む）。この時点ではまだ読めるが、世界は変更できない
  world.beforeEvents.entityRemove.subscribe((ev) => {
    const entry = entryOf(ev.removedEntity);
    if (!entry) return;
    const id = ev.removedEntity.id;
    const obj = entry.instances.get(id);
    forget(entry, id);
    obj?.onRemove?.();
    // 段取りの後片付け（finally）は世界を変更することが多いので、before イベントの外（次の tick）で止める
    if (obj?.timelines?.some((t) => t.running)) system.run(() => cancelTimelines(obj, 'removed'));
  });
  after.entityRemove.subscribe((ev) => {
    if (handlePartGone(ev.typeId, (en, body) => ensure(en, body, 'late'))) return;
    const entry = registry().get(ev.typeId);
    if (entry) forget(entry, ev.removedEntityId);
  });

  // 掴み: 戻し損ねたプレイヤーを、出現したときに戻せるように
  installGrab();

  world.afterEvents.worldLoad.subscribe(() => scan());
  // /reload のときなど worldLoad が来ない場合に備えて、最初の tick でも探す（二重には作らない）
  system.run(() => scan());

  // 本体のいない部位の見回り
  system.runInterval(() => sweepOrphanParts(), 40);

  system.runInterval(() => {
    const errors: unknown[] = [];
    for (const entry of registry().values()) {
      for (const [id, obj] of entry.instances) {
        // 毎 tick・全個体で通る所なので、配列を作らずに確かめる
        const hasRunning = obj.timelines?.some((t) => t.running) ?? false;
        if (!entry.hasTick && !entry.hasDie && !hasRunning && !obj.facing) continue;
        if (!isValid(obj.entity)) {
          forget(entry, id);
          continue;
        }
        // 1 体の例外で、ほかの個体の処理を止めない
        try {
          if (entry.hasDie) snapshot(entry, obj);
          obj.onTick?.();
        } catch (e) {
          console.error(`[hakomc/entity] ${entry.cls.name}.onTick (entity ${id}):`, e);
          errors.push(e);
        }
        // this.face(...) の向く先へ、少しずつ向く
        if (obj.facing) {
          try {
            turnTowards(obj);
          } catch (e) {
            errors.push(e);
          }
        }
        // onTick の中で始めた段取りは、始めた時点で最初の yield まで進んでいる。
        // 同じ tick にもう一度進めないことは Timeline.advance が確かめる
        for (const t of obj.timelines ?? []) {
          if (!t.running) continue;
          try {
            t.advance();
          } catch (e) {
            console.error(`[hakomc/entity] ${entry.cls.name} の timeline (entity ${id}):`, e);
            errors.push(e);
          }
        }
      }
    }
    if (errors.length) throw errors[0];
  }, 1);
}
