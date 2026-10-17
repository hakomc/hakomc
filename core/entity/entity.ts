import type { Entity, Player, Vector3, EntityDieAfterEvent, EntityHitEntityAfterEvent, EntityHurtAfterEvent, EntitySpawnAfterEvent, PlayerInteractWithEntityAfterEvent } from '@minecraft/server';
import { system } from '@minecraft/server';
import { instanceOf, instancesOf, register, registry, type LastKnown, type LoadReason, type RegisteredClass } from './runtime';
import { Timeline, type Clock, type Steps, type TimelineOptions, type WaitRequest } from './timeline';
import type { Component, EventRef } from './component';
import { EntityEvent, type GroupClass } from './event';
import type { PropertyClass, ValueOf } from './property';
import { bodyRideable, hiddenBones, partBrokenProperty, partEntityJson, partOverlapWarnings, partResourceFiles, type PartClass } from './part';
import { partHandle, type PartHandle } from './parts-runtime';
import { grab, type GrabOptions, type Hold } from './grab';
import { hit, leap, type HitOptions, type LeapOptions, type LeapResult } from './motion';
import { holdStill, toFacingTarget, type FaceTarget, type Still } from './still';

/** 言語ごとの文字列（en_US / ja_JP など） */
export type Localized = Partial<Record<'en_US' | 'ja_JP' | (string & {}), string>>;

/** リソースパック側（見た目）の定義。client_entity の description に入る */
export interface ClientDefinition {
  /** ジオメトリの識別子。文字列なら default。例: 'geometry.morgrave' */
  geometry: string | Record<string, string>;
  /** テクスチャのパス（拡張子なし）。文字列なら default。例: 'textures/entity/morgrave' */
  textures: string | Record<string, string>;
  /** 既定 { default: 'entity_alphatest' } */
  materials?: string | Record<string, string>;
  /** 既定 ['controller.render.default'] */
  renderControllers?: Array<string | Record<string, string>>;
  /** 短い名前 → アニメーション（コントローラー）の識別子 */
  animations?: Record<string, string>;
  /** scripts.animate など。そのまま入る */
  scripts?: Record<string, unknown>;
  /** スポーンエッグ。色（#rrggbb）かテクスチャ */
  spawnEgg?: { baseColor: string, overlayColor: string } | { texture: string, textureIndex?: number };
  /** そのまま description に足す内容 */
  extra?: Record<string, unknown>;
}

export interface EntityDefinition<P extends PropertyClass, E extends EventRef, PT extends PartClass = PartClass> {
  /** 表示名（entity.<id>.name） */
  name?: Localized;
  properties?: readonly P[];
  /** 常に付いているコンポーネント */
  components?: Component[];
  /**
   * スクリプトや /event から起こすイベント。
   * グループや、グループ・コンポーネントの中から参照されたイベントは自動で集めるので、ここに全部書かなくてよい。
   */
  events?: readonly E[];
  /** 部位（当たり判定）。座席の順番はこの並び順 */
  parts?: readonly PT[];
  /** どのイベントからも参照されないが、JSON に入れておきたいグループ */
  groups?: readonly GroupClass[];
  /** 既定 true */
  spawnable?: boolean;
  /** 既定 true */
  summonable?: boolean;
  /** リソースパック側（見た目）。無ければ client_entity は作らない */
  client?: ClientDefinition;
  /**
   * このエンティティのバニラの攻撃（minecraft:behavior.melee_attack など）のダメージを取り消す。
   * 追いかける・向く、といった AI はそのまま使い、ダメージは this.dealDamage() で与えるとき用。
   * 取り消すので、ノックバック・赤い点滅・音も出ない
   */
  cancelVanillaHits?: boolean;
  /** 既定 '1.21.0' */
  formatVersion?: string;
  /** そのまま description に足す内容（runtime_identifier など） */
  description?: Record<string, unknown>;
}

/** ビルド時に作るファイル（パック内のパス → 中身） */
export interface PackFiles {
  behavior: Record<string, unknown>;
  resource: Record<string, unknown>;
  /** 言語 → 「キー=値」の行 */
  lang: Record<string, string[]>;
  /** ビルドは止めないが、知らせたいこと（部位が本体に埋まっている、など） */
  warnings?: string[];
}

import { EntityDefinitionError } from './errors';
export { EntityDefinitionError };

const snake = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();
const isEventClass = (v: unknown): v is EventRef => typeof v === 'function' && v.prototype instanceof EntityEvent;
const one = (v: string | Record<string, string>) => (typeof v === 'string' ? { default: v } : v);

export interface EntityClass {
  readonly id: string;
  readonly definition: EntityDefinition<PropertyClass, EventRef, PartClass>;
  /** JSON での名前（名前空間付き）。スクリプトからも使える */
  propertyName(p: PropertyClass): string;
  eventName(e: EventRef | string): string;
  /** ビルド時: BP / RP / ローカライズのファイルを作る */
  toFiles(): PackFiles;
}

/**
 * エンティティを定義する。戻り値はクラスなので、継承して振る舞いを書ける。
 *
 * ```ts
 * export class Morgrave extends entity('hako:morgrave', {
 *   properties: [IsAngry, Phase],
 *   components: [health({ value: 600, max: 600 })],
 *   events: [Enrage, Calm],
 * }) {
 *   roar() { if (!this.get(IsAngry)) this.trigger(Enrage); }
 * }
 *
 * Morgrave.of(entity).roar();
 * ```
 */
/** timeline の holdStill: 段取りを、止まる → 段取り → 動き出す、で包む */
function stillWrapped<A extends unknown[]>(body: (this: { holdStill(): Still }, t: Steps, ...args: A) => Generator<WaitRequest, unknown, unknown>) {
  return function* (this: { holdStill(): Still }, t: Steps, ...args: A) {
    const still = this.holdStill();
    try {
      return yield* body.call(this, t, ...args);
    } finally {
      still.release();
    }
  };
}

export function entity<const P extends PropertyClass = never, const E extends EventRef = never, const PT extends PartClass = never>(id: string, def: EntityDefinition<P, E, PT> = {}) {
  if (!/^[a-z0-9_.-]+:[a-z0-9_.-]+$/.test(id)) throw new EntityDefinitionError(`エンティティの識別子 "${id}" は「名前空間:名前」の形で、小文字・数字・_ . - だけにする`);
  const ns = id.split(':')[0];
  const qualify = (name: string) => (name.includes(':') ? name : `${ns}:${name}`);

  const propertyName = (p: PropertyClass) => {
    if (typeof p?.id !== 'string' || !p.id) throw new EntityDefinitionError(`${id}: プロパティ ${p?.name ?? p} に id が無い（BoolProperty('is_angry', …) のように作る）`);
    return qualify(p.id);
  };
  const eventName = (e: EventRef | string) => {
    if (typeof e === 'string') return e;
    if (!Object.prototype.hasOwnProperty.call(e, 'id') || typeof e.id !== 'string' || !e.id) {
      throw new EntityDefinitionError(`${id}: イベント ${e.name} に static readonly id が無い（/event で使う名前になるので必須）`);
    }
    return qualify(e.id);
  };
  const groupName = (g: GroupClass) => (Object.prototype.hasOwnProperty.call(g, 'id') && g.id ? g.id : snake(g.name));

  const toFiles = (): PackFiles => {
    const props = new Map<string, PropertyClass>();
    const addProp = (p: PropertyClass) => {
      const name = propertyName(p);
      const prev = props.get(name);
      if (prev && prev !== p) throw new EntityDefinitionError(`${id}: プロパティ名 ${name} が ${prev.name} と ${p.name} で重なっている`);
      props.set(name, p);
    };
    (def.properties ?? []).forEach(addProp);

    const events = new Map<string, EventRef>();
    const groups = new Map<string, GroupClass>();
    const queue: Array<EventRef | GroupClass> = [...(def.events ?? []), ...(def.groups ?? [])];
    const addEvent = (e: EventRef) => {
      const name = eventName(e);
      const prev = events.get(name);
      if (prev && prev !== e) throw new EntityDefinitionError(`${id}: イベント名 ${name} が ${prev.name} と ${e.name} で重なっている`);
      if (!prev) queue.push(e);
    };
    const addGroup = (g: GroupClass) => {
      const name = groupName(g);
      const prev = groups.get(name);
      if (prev && prev !== g) throw new EntityDefinitionError(`${id}: グループ名 ${name} が ${prev.name} と ${g.name} で重なっている`);
      if (!prev) queue.push(g);
    };

    // コンポーネントの中身を JSON にする。イベントのクラスは名前に置き換え、参照されたイベントを集める
    const componentsJson = (list: Component[], where: string) => {
      const out: Record<string, unknown> = {};
      for (const c of list) {
        if (out[c.key] !== undefined) throw new EntityDefinitionError(`${id}: ${where} に ${c.key} が 2 回ある`);
        out[c.key] = JSON.parse(JSON.stringify(c.value ?? {}, (_k, v) => {
          if (isEventClass(v)) {
            addEvent(v);
            return eventName(v);
          }
          if (typeof v === 'function') throw new EntityDefinitionError(`${id}: ${where} の ${c.key} に、イベント以外のクラスや関数が入っている`);
          return v;
        }));
      }
      return out;
    };

    const warnings: string[] = [];
    const base = componentsJson(def.components ?? [], 'components');
    const parts = def.parts ?? [];
    if (parts.length) {
      if (base['minecraft:rideable']) throw new EntityDefinitionError(`${id}: 部位（parts）を使うときは、座席（minecraft:rideable）はフレームワークが作るので components に書かない`);
      const seen = new Set<string>();
      for (const part of parts) {
        if (!/^[a-z0-9_]+$/.test(part.id ?? '')) throw new EntityDefinitionError(`${id}: 部位の id "${part.id}" は小文字・数字・_ だけにする`);
        if (seen.has(part.id)) throw new EntityDefinitionError(`${id}: 部位の id ${part.id} が 2 つある`);
        seen.add(part.id);
      }
      base['minecraft:rideable'] = bodyRideable(id, parts);
      warnings.push(...partOverlapWarnings(id, parts, base['minecraft:collision_box'] as { width: number, height: number } | undefined));
    }
    const groupJson: Record<string, unknown> = {};
    const eventJson: Record<string, unknown> = {};
    // イベント → グループ → （その中のコンポーネントが指す）イベント… と辿る。循環していても、一度見たものは飛ばすので止まる
    while (queue.length) {
      const item = queue.shift()!;
      if (item.prototype instanceof EntityEvent) {
        const E = item as EventRef;
        const name = eventName(E);
        const prevEvent = events.get(name);
        if (prevEvent && prevEvent !== E) throw new EntityDefinitionError(`${id}: イベント名 ${name} が ${prevEvent.name} と ${E.name} で重なっている`);
        if (prevEvent) continue;
        events.set(name, E);
        const e = new (E as unknown as new () => EntityEvent)();
        e.add.forEach(addGroup);
        e.remove.forEach(addGroup);
        const setProps: Record<string, unknown> = {};
        for (const s of e.set) {
          addProp(s.property);
          setProps[propertyName(s.property)] = s.value;
        }
        if (isEventClass(e.trigger)) addEvent(e.trigger);
        eventJson[name] = {
          ...(e.add.length ? { add: { component_groups: e.add.map(groupName) } } : {}),
          ...(e.remove.length ? { remove: { component_groups: e.remove.map(groupName) } } : {}),
          ...(e.set.length ? { set_property: setProps } : {}),
          ...(e.trigger ? { trigger: eventName(e.trigger) } : {}),
          ...e.extra,
        };
      } else {
        const G = item as GroupClass;
        const name = groupName(G);
        const prevGroup = groups.get(name);
        if (prevGroup && prevGroup !== G) throw new EntityDefinitionError(`${id}: グループ名 ${name} が ${prevGroup.name} と ${G.name} で重なっている`);
        if (prevGroup) continue;
        groups.set(name, G);
        groupJson[name] = componentsJson(new (G as unknown as new () => { components: Component[] })().components, `グループ ${name}`);
      }
    }

    const propertiesJson: Record<string, unknown> = {};
    // hideBone を使う部位の「壊れているか」（RP で隠すのに使う）
    const hiding = parts.filter((p) => hiddenBones(p).length);
    for (const part of hiding) {
      const name = partBrokenProperty(id, part);
      if (props.has(name)) throw new EntityDefinitionError(`${id}: プロパティ ${name} は、部位 ${part.id} の hideBone が使う名前と重なっている`);
      propertiesJson[name] = { type: 'bool', default: false, client_sync: true };
    }
    for (const [name, P] of props) {
      const p = new (P as unknown as new () => { toJson(): Record<string, unknown>, default: unknown, range?: [number, number], values?: readonly string[] })();
      if (p.values && !p.values.includes(p.default as string)) throw new EntityDefinitionError(`${id}: ${name} の既定値 "${p.default}" が values に無い`);
      if (p.range && ((p.default as number) < p.range[0] || (p.default as number) > p.range[1])) throw new EntityDefinitionError(`${id}: ${name} の既定値 ${p.default} が range [${p.range}] の外`);
      propertiesJson[name] = p.toJson();
    }

    const fileName = id.split(':')[1];
    const partFiles = Object.fromEntries(parts.map((part) => [
      `entities/${fileName}_${part.id}.json`,
      partEntityJson(id, part, def.formatVersion ?? '1.21.0'),
    ]));
    const behavior = {
      ...partFiles,
      [`entities/${fileName}.json`]: {
        format_version: def.formatVersion ?? '1.21.0',
        'minecraft:entity': {
          description: {
            identifier: id,
            is_spawnable: def.spawnable ?? true,
            is_summonable: def.summonable ?? true,
            ...(Object.keys(propertiesJson).length ? { properties: propertiesJson } : {}),
            ...def.description,
          },
          ...(groups.size ? { component_groups: groupJson } : {}),
          components: base,
          ...(events.size ? { events: eventJson } : {}),
        },
      },
    };

    // 部位の見た目（何も描かない）。本体に client が無くても作る
    const resource: Record<string, unknown> = { ...partResourceFiles(id, fileName, parts) };
    const c = def.client;
    // 壊れた部位のボーンを隠すレンダーコントローラー
    let renderControllers = c?.renderControllers;
    if (hiding.length) {
      const visibility = hiding.flatMap((p) => hiddenBones(p).map((bone) => ({ [bone]: `!q.property('${partBrokenProperty(id, p)}')` })));
      if (!c) {
        warnings.push(`${id}: 部位の hideBone は、client（見た目）を定義したときだけ効く`);
      } else if (renderControllers) {
        warnings.push(`${id}: renderControllers を自分で書いているので、壊れた部位を隠すには、そのレンダーコントローラーの part_visibility に ${JSON.stringify(visibility)} を足す`);
      } else {
        const rc = `controller.render.${id.replace(':', '_')}`;
        renderControllers = [rc];
        resource[`render_controllers/${fileName}.render_controllers.json`] = {
          format_version: '1.8.0',
          render_controllers: {
            [rc]: {
              geometry: 'Geometry.default',
              materials: [{ '*': 'Material.default' }],
              textures: ['Texture.default'],
              part_visibility: [{ '*': true }, ...visibility],
            },
          },
        };
      }
    }
    if (c) {
      const egg = c.spawnEgg && ('texture' in c.spawnEgg
        ? { texture: c.spawnEgg.texture, ...(c.spawnEgg.textureIndex !== undefined ? { texture_index: c.spawnEgg.textureIndex } : {}) }
        : { base_color: c.spawnEgg.baseColor, overlay_color: c.spawnEgg.overlayColor });
      resource[`entity/${fileName}.entity.json`] = {
        format_version: '1.10.0',
        'minecraft:client_entity': {
          description: {
            identifier: id,
            materials: one(c.materials ?? 'entity_alphatest'),
            textures: one(c.textures),
            geometry: one(c.geometry),
            render_controllers: renderControllers ?? ['controller.render.default'],
            ...(c.animations ? { animations: c.animations } : {}),
            ...(c.scripts ? { scripts: c.scripts } : {}),
            ...(egg ? { spawn_egg: egg } : {}),
            ...c.extra,
          },
        },
      };
    }

    const lang: Record<string, string[]> = {};
    for (const [code, text] of Object.entries(def.name ?? {})) {
      if (text === undefined) continue;
      (lang[code] ??= []).push(`entity.${id}.name=${text}`);
      if (c?.spawnEgg) lang[code].push(`item.spawn_egg.entity.${id}.name=${text}`);
    }
    return { behavior, resource, lang, warnings };
  };

  /** 1 体ごとのクラスの土台。get / set / trigger は、この定義にあるプロパティ・イベントしか受け付けない */
  class Definition {
    static readonly id = id;
    static readonly definition = def as EntityDefinition<PropertyClass, EventRef, PartClass>;
    static readonly propertyName = propertyName;
    static readonly eventName = eventName;
    static readonly toFiles = toFiles;

    /** このクラスのエンティティか */
    static is(e: Entity | undefined): boolean {
      return !!e && e.typeId === id;
    }

    /**
     * ゲームのエンティティから、このクラスのオブジェクトを得る。
     * register() 済みなら、フックに渡されるのと同じオブジェクト（フィールドも共有）を返す
     */
    static of<T extends Definition>(this: new (entity: Entity) => T, e: Entity): T {
      const registered = instanceOf(e);
      if (registered instanceof this) return registered as T;
      return new this(e);
    }

    /**
     * フック（onSpawn・onHurt・onTick など）を有効にする。定義のファイルの最後で呼ぶ。
     * ビルド時は、ここで登録したエンティティの JSON が作られる。
     */
    static register(this: abstract new (entity: Entity) => Definition): void {
      register(this as unknown as RegisteredClass);
    }

    /** 今いる、このクラスの個体（register() 済みのとき） */
    static instances<T extends Definition>(this: abstract new (entity: Entity) => T): T[] {
      return instancesOf(this as unknown as RegisteredClass) as unknown as T[];
    }

    readonly entity: Entity;
    /** this.timeline(...) で作った段取り */
    readonly timelines: Timeline<any>[] = [];
    /** @internal this.face(...) の向く先 */
    facing?: { target: () => Vector3 | undefined, turnSpeed: number };
    /** @internal timeline の時計 */
    readonly clock: Clock = { now: () => system.currentTick };
    constructor(e: Entity) {
      this.entity = e;
    }

    /**
     * tick 単位の段取りを作る。フィールドの初期値として作り、start() で始める。
     * 毎 tick 進めるのはフレームワーク（register() が必要）。
     *
     * ```ts
     * charge = this.timeline(function* (t) {
     *   this.set(Phase, 'windup');
     *   yield* t.wait(20);
     *   this.set(Phase, 'dash');
     * }, { lane: 'action' });
     * ```
     */
    timeline<A extends unknown[] = []>(
      body: (this: this, t: Steps, ...args: A) => Generator<WaitRequest, unknown, unknown>,
      options?: TimelineOptions,
    ): Timeline<A> {
      const t = new Timeline<A>({
        timelines: this.timelines,
        clock: this.clock,
        ensureDriven: () => {
          if (!registry().has(id)) throw new Error(`[hakomc/entity] ${this.constructor.name}（${id}）が register() されていないので、timeline を start できない。毎 tick 進めるのはフレームワークなので、定義のファイルで ${this.constructor.name}.register() を呼ぶ`);
        },
      }, (options?.holdStill ? stillWrapped(body as never) : body) as never, options, this);
      this.timelines.push(t);
      return t;
    }

    /**
     * その場で止まる（AI に動かされない）。release() で動き出す。入れ子にしてよい。
     * 全部 release したら、this.face の向く先も消す
     */
    holdStill(): Still {
      return holdStill(this, this.entity, () => { this.facing = undefined; });
    }

    /**
     * 向く先を決める。毎 tick、turnSpeed 度（既定 30）まで回って向く。undefined で向くのをやめる。
     * エンティティを渡すと、その位置を追って向き続ける
     */
    face(target: FaceTarget | undefined, turnSpeed = 30): void {
      this.facing = target === undefined ? undefined : { target: toFacingTarget(target), turnSpeed };
    }

    /** 動いている段取りを全て止める（理由 'cancel'） */
    cancelTimelines(): void {
      for (const t of this.timelines) t.cancel();
    }

    /** 段取りのどれかが動いているか（lane を指定すると、その lane だけ） */
    busy(lane?: string): boolean {
      return this.timelines.some((t) => t.running && (lane === undefined || t.options.lane === lane));
    }

    /** プロパティを読む */
    /**
     * プレイヤーを掴む（自分の前などに固定し、カメラと操作を制限する）。
     * 放すのは hold.release()。死亡・削除・退出・max のときは自動で放す
     */
    grab(player: Player, options?: GrabOptions): Hold {
      return grab(this.entity, player, options);
    }

        /**
     * 決めた地点へ跳ぶ。timeline の中で `const r = yield* this.leapTo(t, goal)` と使う。
     * 着地するまで待ち、着地したか・何 tick かかったかを返す
     */
    leapTo(t: Steps, goal: Vector3, options?: LeapOptions): Generator<WaitRequest, LeapResult, unknown> {
      return leap(this.entity, t, goal, options);
    }

    /** ダメージを与える（cancelVanillaHits でも取り消されない）。ノックバックも付けられる */
    dealDamage(target: Entity, amount: number, options?: HitOptions): boolean {
      return hit(this.entity, target, amount, options);
    }

    /** 部位の状態（体力・壊れているか）と操作 */
    part(part: PT): PartHandle {
      return partHandle(this as never, part);
    }

    get<T extends P>(property: T): ValueOf<T> {
      return this.entity.getProperty(propertyName(property)) as ValueOf<T>;
    }

    /** プロパティに書く（実際に読めるようになるのは tick の終わり） */
    set<T extends P>(property: T, value: ValueOf<T>): void {
      this.entity.setProperty(propertyName(property), value as boolean | number | string);
    }

    /** イベントを起こす */
    trigger(event: E): void {
      this.entity.triggerEvent(eventName(event));
    }

    // ---- フック（register() したクラスで、書いたものだけが呼ばれる） ----
    /** 新しく出現した（スポーンエッグ・召喚・繁殖など） */
    onSpawn?(ev: EntitySpawnAfterEvent): void;
    /** 読み込まれた（チャンクの読み込み、ワールドの起動、/reload）。出現でない最初の 1 回。reason で、どこで見つかったかが分かる */
    onLoad?(reason: LoadReason): void;
    /** ダメージを受けた */
    onHurt?(ev: EntityHurtAfterEvent): void;
    /** 攻撃を当てた */
    onHit?(ev: EntityHitEntityAfterEvent): void;
    /** プレイヤーに右クリックされた */
    onInteract?(ev: PlayerInteractWithEntityAfterEvent): void;
    /** 毎 tick */
    onTick?(): void;
    /**
     * 死んだ。this.entity はもう読めない（getProperty などは例外になる）ので、
     * 直前の tick に読んだ値（位置・ディメンション・プロパティ）を last で渡す。
     * ドロップや演出は、last.location と world.getDimension(last.dimensionId) を使う
     */
    onDie?(ev: EntityDieAfterEvent, last: LastKnown): void;
    /**
     * 消える・読み込まれなくなる直前（死亡後に消えるときも呼ばれる）。this.entity はまだ読める。
     * before イベントの中なので、世界を変更する操作（スポーン・setProperty・triggerEvent・コマンドなど）は例外になる。
     * 変更したいときは system.run(() => …) で次の tick に回す（その時点でエンティティはもう無い）
     */
    onRemove?(): void;
    /** 部位にダメージが入った。damage は本体に伝えた量（倍率を掛けたあと）。壊れた部位には呼ばれない */
    onPartHurt?(part: PT, damage: number, ev: EntityHurtAfterEvent): void;
    /** 部位が壊れた（health を決めた部位だけ） */
    onPartBreak?(part: PT): void;
    /** 壊れた部位が restore() で戻った */
    onPartRestore?(part: PT): void;
  }
  return Definition;
}
