/**
 * 移動とダメージの部品。
 *
 * - leapTo: 決めた地点へ跳ぶ（放物線の初速を計算し、空中で毎 tick 向きを直して、決めた地点に降りる）
 * - dealDamage: スクリプトからダメージを与える（cancelVanillaHits でも取り消されない。ノックバックも付けられる）
 *
 * 跳躍の計算は、モルグレイヴで実機に合わせた値（重力 0.08、縦の空気抵抗 0.98、横の空気抵抗 0.91）。
 */
import { EntityDamageCause, type Entity, type Vector3 } from '@minecraft/server';
import type { Steps, WaitRequest } from './timeline';

const GRAVITY = 0.08;
const DRAG_Y = 0.98;
const DRAG_XZ = 0.91;

export interface LeapOptions {
  /** 目標の手前で止まる距離（既定 0）。プレイヤーの目の前に降りたいときなど */
  short?: number;
  /** 跳べる最大の距離（既定 16）。遠すぎる目標には、この距離だけ跳ぶ */
  maxDistance?: number;
  /** 最初の縦の速さ。省略すると距離から決める（遠いほど高く） */
  upward?: number;
  /** 空中で毎 tick、目標に降りるよう横の速さを直す（既定 true）。実機の空気抵抗との差も吸収する */
  steer?: boolean;
  /** 目標を毎 tick 取り直す（既定 undefined = 跳んだ時の目標のまま）。プレイヤーを追いかけるなら () => p.location */
  follow?: () => Vector3 | undefined;
  /** 着地を待つ最大の tick 数（既定 100） */
  maxTicks?: number;
}

export interface LeapResult {
  /** 着地したか（maxTicks を過ぎたら false） */
  landed: boolean;
  /** 跳んでから着地までの tick 数 */
  ticks: number;
  /** 着地した位置 */
  location: Vector3;
}

/**
 * 縦の速さ vy で動き始めて、目標の高さに着くまでの tick 数。
 * @param h 今の高さ − 目標の高さ（ブロック）。目標が上なら負
 * @param vy 今の縦の速さ（ブロック / tick、上が正）
 * @returns 上がっている間と、目標より上にいる間は数え続ける。目標の高さまで上がれないときは、頂点までの tick 数
 */
export function airTicks(h: number, vy: number): number {
  let y = h, v = vy, n = 0;
  while ((y > 0 || v > 0) && n < 200) {
    y += v;
    v = (v - GRAVITY) * DRAG_Y;
    n++;
  }
  return n;
}

/**
 * n tick で横に d 進むための、最初の横の速さ（横の空気抵抗 0.91 を考える）
 * @param d 進む距離（ブロック）
 * @param n tick 数
 */
export const horizontalSpeedFor = (d: number, n: number) => (d * (1 - DRAG_XZ)) / (1 - Math.pow(DRAG_XZ, Math.max(1, n)));

/** 縦の速さ vy で、どこまで上がるか（頂点の高さ） */
function apex(vy: number) {
  let y = 0, v = vy;
  while (v > 0) {
    y += v;
    v = (v - GRAVITY) * DRAG_Y;
  }
  return y;
}

const yawTo = (from: Vector3, to: Vector3) => (Math.atan2(-(to.x - from.x), to.z - from.z) * 180) / Math.PI;

/** 跳ぶ（timeline の中で yield* で使う） */
export function* leap(entity: Entity, t: Steps, goal0: Vector3, options: LeapOptions = {}): Generator<WaitRequest, LeapResult, unknown> {
  const short = options.short ?? 0;
  const maxD = options.maxDistance ?? 16;
  const start = entity.location;
  /** 目標（follow があれば取り直す）。跳んだ地点から maxDistance より遠ければ、その距離に縮める */
  const goalNow = () => {
    const g = options.follow?.() ?? goal0;
    const gx = g.x - start.x, gz = g.z - start.z, gd = Math.hypot(gx, gz);
    if (gd <= maxD + short) return g;
    const k = (maxD + short) / gd;
    return { x: start.x + gx * k, y: g.y, z: start.z + gz * k };
  };
  let goal = goalNow();
  const dx = goal.x - start.x, dz = goal.z - start.z, d = Math.hypot(dx, dz) || 1;
  const D = Math.max(0, d - short);
  // 目標が高いときは、目標より少し上まで上がれる速さにする
  const rise = goal.y - start.y;
  let vy = options.upward ?? Math.min(1.15, 0.62 + D * 0.018);
  if (options.upward === undefined) while (apex(vy) < rise + 0.6 && vy < 3) vy += 0.05;
  const T = airTicks(start.y - goal.y, vy);
  const vh = horizontalSpeedFor(D, T);
  entity.setRotation({ x: 0, y: yawTo(start, goal) });
  entity.applyImpulse({ x: (dx / d) * vh, y: vy, z: (dz / d) * vh });

  let ticks = 0;
  const max = options.maxTicks ?? 100;
  while (ticks < max) {
    yield* t.wait(1);
    ticks++;
    if (!entity.isValid) return { landed: false, ticks, location: start };
    // 跳んですぐは、まだ地面に触れていることがあるので 2 tick 目から見る
    if (ticks >= 2 && entity.isOnGround) return { landed: true, ticks, location: entity.location };
    if (options.steer === false) continue;
    goal = goalNow();
    const b = entity.location;
    const vel = entity.getVelocity();
    const gx = goal.x - b.x, gz = goal.z - b.z, gd = Math.hypot(gx, gz) || 1;
    const n = airTicks(b.y - goal.y, vel.y);
    if (n < 2) continue;
    // 残りの tick で目標の手前 short に降りる横の速さへ、少しずつ寄せる
    const want = Math.min(3, horizontalSpeedFor(Math.max(0, gd - short), n));
    entity.applyImpulse({ x: ((gx / gd) * want - vel.x) * 0.6, y: 0, z: ((gz / gd) * want - vel.z) * 0.6 });
    entity.setRotation({ x: 0, y: yawTo(b, goal) });
  }
  return { landed: false, ticks, location: entity.location };
}

export interface HitOptions {
  /** 既定 entityAttack */
  cause?: EntityDamageCause;
  /**
   * ノックバック（攻撃した側から外向き）。数値なら横の強さ（縦は 0.3）
   * 例: 1.2 / { horizontal: 1.4, vertical: 0.5 }
   */
  knockback?: number | { horizontal: number, vertical: number };
}

/**
 * 今スクリプトで与えている途中のダメージの数（cancelVanillaHits で取り消さないため）。
 * applyDamage の中で beforeEvents.entityHurt が同期的に呼ばれるので、その間だけ 1 以上になる。
 * ダメージの中でさらにダメージを与えても（入れ子）、数で数えるので正しく戻る
 */
let scripted = 0;
export const isScriptedHit = () => scripted > 0;

/**
 * ダメージを与える。cancelVanillaHits を付けたエンティティからでも取り消されない。
 * @returns ダメージが入ったか
 */
export function hit(attacker: Entity, target: Entity, amount: number, options: HitOptions = {}): boolean {
  scripted++;
  let ok = false;
  try {
    ok = target.applyDamage(amount, { cause: options.cause ?? EntityDamageCause.entityAttack, damagingEntity: attacker });
  } finally {
    scripted--;
  }
  const kb = options.knockback;
  if (ok && kb !== undefined && target.isValid) {
    const h = typeof kb === 'number' ? kb : kb.horizontal;
    const v = typeof kb === 'number' ? 0.3 : kb.vertical;
    const a = attacker.location, b = target.location;
    const dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz) || 1;
    target.applyKnockback({ x: (dx / d) * h, z: (dz / d) * h }, v);
  }
  return ok;
}
