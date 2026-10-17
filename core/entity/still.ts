/**
 * その場で止まる（AI に動かされない）・向く。
 *
 * 構えの最中に AI（うろつき・近接攻撃の追いかけ）が動かすと、構えと攻撃の向きがずれて
 * 「別々の意思があるように」見える。止まっている間は移動の速さ（minecraft:movement の値）を 0 にし、
 * 向きはスクリプトが決める（this.face）。
 */
import type { Entity, Vector3 } from '@minecraft/server';

/** 止まっている印（サーバーが止まったときなどに、次に読み込まれたら戻すため） */
const MARK = 'hakomc:still';

const counts = new WeakMap<object, number>();

export interface Still {
  /** 止まるのをやめる。何度呼んでもよい */
  release(): void;
}

const movementOf = (e: Entity) => e.getComponent('minecraft:movement');

/**
 * 止まる。入れ子にしてよい（全部 release したら動き出す）
 * @param owner 数を数える単位（エンティティのクラスのオブジェクト）
 * @param onAllReleased 全部 release されたとき（向く先を消すなど）
 */
export function holdStill(owner: object, e: Entity, onAllReleased?: () => void): Still {
  const n = counts.get(owner) ?? 0;
  counts.set(owner, n + 1);
  if (n === 0) {
    const m = movementOf(e);
    if (m) {
      m.setCurrentValue(0);
      e.setDynamicProperty(MARK, true);
    }
  }
  let done = false;
  return {
    release() {
      if (done) return;
      done = true;
      const left = (counts.get(owner) ?? 1) - 1;
      counts.set(owner, left);
      if (left > 0) return;
      try {
        if (e.isValid) {
          movementOf(e)?.resetToDefaultValue();
          e.setDynamicProperty(MARK, undefined);
        }
      } finally {
        onAllReleased?.();
      }
    },
  };
}

export const isStill = (owner: object) => (counts.get(owner) ?? 0) > 0;

/** 止まっている途中で保存された個体を戻す（読み込まれたとき） */
export function releaseLeftoverStill(e: Entity) {
  try {
    if (e.getDynamicProperty(MARK) === undefined) return;
    movementOf(e)?.resetToDefaultValue();
    e.setDynamicProperty(MARK, undefined);
  } catch {
    // before イベントの中など、変更できない場面では次の読み込みに任せる
  }
}

/** face に渡せるもの: 位置、エンティティ（そのときの位置を追う）、位置を返す関数 */
export type FaceTarget = Vector3 | Entity | (() => Vector3 | undefined);

export function toFacingTarget(target: FaceTarget): () => Vector3 | undefined {
  if (typeof target === 'function') return target;
  if ('location' in target && typeof (target as Entity).isValid !== 'undefined') {
    const ent = target as Entity;
    return () => (ent.isValid ? ent.location : undefined);
  }
  const v = target as Vector3;
  return () => v;
}
