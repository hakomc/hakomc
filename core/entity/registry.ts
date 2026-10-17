/**
 * register() したエンティティのクラスの一覧。
 * globalThis に置くのは、ビルド時にプラグイン（別のモジュールとして読み込まれる）からも同じ一覧を見るため。
 * このファイルは @minecraft/server を実行時には import しない（プラグインが Node で読み込むため）。
 */
import type { Entity, EntityDieAfterEvent } from '@minecraft/server';
import type { CancelReason } from './timeline';

const REGISTRY_KEY = '__hakomc_entity_registry__';

/** 死亡時に渡す、最後に読めた値 */
export interface LastKnown {
  location: { x: number, y: number, z: number };
  dimensionId: string;
  /** 定義したプロパティの値（名前空間付きの名前 → 値） */
  properties: Record<string, boolean | number | string | undefined>;
}

/**
 * onLoad が呼ばれた理由
 * - `chunk`: 読み込まれた（チャンクの読み込みなど。entityLoad / entitySpawn の Loaded）
 * - `startup`: ワールドの起動時・/reload 時に、すでにいた個体を探して見つけた
 * - `late`: 出現・読み込みの通知より先に、別のイベントや of() で初めて見つかった
 */
export type LoadReason = 'chunk' | 'startup' | 'late';

/** フックを持つインスタンス（メソッドは全て省略可能） */
export interface HookTarget {
  readonly entity: Entity;
  /** this.timeline(...) で作った段取り */
  readonly timelines?: ReadonlyArray<{ readonly running: boolean, advance(): void, cancel(reason: CancelReason): void }>;
  onSpawn?(ev: unknown): void;
  onLoad?(reason: LoadReason): void;
  onHurt?(ev: unknown): void;
  onHit?(ev: unknown): void;
  onInteract?(ev: unknown): void;
  onTick?(): void;
  onDie?(ev: EntityDieAfterEvent, last: LastKnown): void;
  onRemove?(): void;
}

/** 登録できるクラス */
export interface RegisteredClass {
  readonly id: string;
  readonly name: string;
  readonly definition: { properties?: readonly unknown[] };
  propertyName(p: unknown): string;
  new (entity: Entity): HookTarget;
}

export interface Entry {
  cls: RegisteredClass;
  /** エンティティの id → オブジェクト */
  instances: Map<string, HookTarget>;
  /** 死亡時に渡すため、毎 tick 覚えておく値（onDie があるクラスだけ） */
  last: Map<string, LastKnown>;
  hasTick: boolean;
  hasDie: boolean;
}

/** 登録の一覧（typeId → 登録）。ビルド時のプラグインもここを見る */
export const registry = (): Map<string, Entry> => {
  const g = globalThis as Record<string, unknown>;
  return (g[REGISTRY_KEY] ??= new Map()) as Map<string, Entry>;
};

/** 登録の一覧を空にする（ビルド時に、読み込みのたびに作り直すため） */
export const resetRegistry = () => {
  (globalThis as Record<string, unknown>)[REGISTRY_KEY] = new Map();
};

