import type { Component, EventRef } from './component';
import type { PropertyClass, ValueOf } from './property';

/**
 * コンポーネントグループ。イベントで付け外しする、コンポーネントのまとまり。
 *
 * ```ts
 * class Angry extends ComponentGroup {
 *   components: Component[] = [movement({ value: 0.35 }), timer({ time: 30, time_down_event: Calm })];
 * }
 * ```
 *
 * JSON での名前は `static id` があればそれ、無ければクラス名を snake_case にしたもの（Angry → angry）。
 * グループの名前はスクリプトからは使わないので、省略してよい。
 *
 * イベントとお互いを参照する（循環する）ときは、TypeScript が型を推論できないので
 * `components: Component[]` のように型を書く。
 */
export abstract class ComponentGroup {
  abstract readonly components: Component[];
}

export type GroupClass = (abstract new () => ComponentGroup) & { readonly id?: string };

/** プロパティに値を入れる指定。値の型はプロパティと合っていないとエラーになる */
export interface SetProperty {
  readonly property: PropertyClass;
  readonly value: unknown;
}
export const set = <P extends PropertyClass>(property: P, value: ValueOf<P>): SetProperty => ({ property, value });

/**
 * エンティティのイベント。スクリプトの trigger や /event entity、コンポーネント（timer など）から起こす。
 *
 * ```ts
 * class Enrage extends EntityEvent {
 *   static readonly id = 'enrage';                 // → hako:enrage（必須）
 *   add = [Angry];
 *   set = [set(IsAngry, true)];
 * }
 * ```
 *
 * `static readonly id` は必須。`/event entity @e hako:enrage` のようにコマンドで使う名前になる。
 */
export abstract class EntityEvent {
  /** 付けるグループ */
  readonly add: GroupClass[] = [];
  /** 外すグループ */
  readonly remove: GroupClass[] = [];
  /** プロパティに入れる値 */
  readonly set: SetProperty[] = [];
  /** 続けて起こすイベント */
  readonly trigger?: EventRef | string;
  /** そのまま JSON に足す内容（sequence / randomize / queue_command など、まだ専用の書き方が無いもの） */
  readonly extra?: Record<string, unknown>;
}
