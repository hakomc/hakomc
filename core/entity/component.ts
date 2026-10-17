import type { EntityEvent } from './event';

/** イベントのクラス（static id を持つ）。コンポーネントの中でイベントを指す所には、名前の代わりにこれを渡せる */
export type EventRef = (abstract new () => EntityEvent) & { readonly id: string };

/** イベントの指定（`{ event, target }` 形式）。中身が書かれていない公式スキーマの所で使う */
export type EventTrigger = {
  event?: string | EventRef;
  target?: 'self' | 'other' | 'player' | 'target' | 'parent' | 'baby' | 'block' | 'damager' | (string & {});
  filters?: unknown;
};

/** 1 つのコンポーネント（`minecraft:health` などの名前と中身） */
export interface Component {
  readonly key: string;
  readonly value: unknown;
}

/**
 * コンポーネントを作る。生成した関数（health() など）もこれを使う。
 * 型がまだ無い新しいコンポーネントは、これで直接書ける: `component('minecraft:new_thing', { ... })`
 */
export const component = (key: string, value: unknown = {}): Component => ({ key, value });
