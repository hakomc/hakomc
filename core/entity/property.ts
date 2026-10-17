/**
 * エンティティプロパティ（description.properties）。
 *
 * ```ts
 * class IsAngry extends BoolProperty('is_angry', false, { client: true }) {}
 * class Phase extends EnumProperty('phase', ['idle', 'bite', 'roar'], 'idle', { client: true }) {}
 * class PodsLeft extends IntProperty('pods_left', 5, { range: [0, 5] }) {}
 * ```
 *
 * id は JSON での名前（エンティティの名前空間が付いて `hako:is_angry` になる）。
 * 変えるとワールドに保存済みの値と合わなくなるので、クラス名からは作らず必ず書いてもらう。
 */

export interface PropertyOptions {
  /** RP（アニメーション・レンダーコントローラー）から q.property で読めるようにする（client_sync） */
  client?: boolean;
}

export abstract class Property<V = unknown> {
  /** 値の型（型の上だけの印） */
  declare readonly __value: V;
  abstract readonly default: V;
  abstract readonly client: boolean;
  /** description.properties に書く中身 */
  abstract toJson(): Record<string, unknown>;
}

/** プロパティのクラス（static id を持つ） */
export type PropertyClass<V = any> = (abstract new () => Property<V>) & { readonly id: string };
/** プロパティのクラスから、値の型を取り出す */
export type ValueOf<P> = P extends abstract new () => { readonly __value: infer V } ? V : never;

/** true / false */
export function BoolProperty<const Id extends string>(id: Id, defaultValue: boolean, options: PropertyOptions = {}) {
  abstract class Bool extends Property<boolean> {
    static readonly id: Id = id;
    readonly default = defaultValue;
    readonly client = options.client ?? false;
    toJson() { return { type: 'bool', default: this.default, client_sync: this.client }; }
  }
  return Bool;
}

/** 整数。range は [最小, 最大] */
export function IntProperty<const Id extends string>(id: Id, defaultValue: number, options: PropertyOptions & { range: [number, number] }) {
  abstract class Int extends Property<number> {
    static readonly id: Id = id;
    readonly default = defaultValue;
    readonly client = options.client ?? false;
    readonly range = options.range;
    toJson() { return { type: 'int', range: this.range, default: this.default, client_sync: this.client }; }
  }
  return Int;
}

/** 小数。range は [最小, 最大] */
export function FloatProperty<const Id extends string>(id: Id, defaultValue: number, options: PropertyOptions & { range: [number, number] }) {
  abstract class Float extends Property<number> {
    static readonly id: Id = id;
    readonly default = defaultValue;
    readonly client = options.client ?? false;
    readonly range = options.range;
    toJson() { return { type: 'float', range: this.range, default: this.default, client_sync: this.client }; }
  }
  return Float;
}

/** 決まった文字列のどれか */
export function EnumProperty<const Id extends string, const V extends string>(id: Id, values: readonly V[], defaultValue: NoInfer<V>, options: PropertyOptions = {}) {
  abstract class Enum extends Property<V> {
    static readonly id: Id = id;
    readonly default = defaultValue;
    readonly client = options.client ?? false;
    readonly values = values;
    toJson() { return { type: 'enum', values: this.values, default: this.default, client_sync: this.client }; }
  }
  return Enum;
}
