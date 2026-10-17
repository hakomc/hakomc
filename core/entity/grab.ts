/**
 * 掴み: プレイヤーをエンティティの前などに固定し、カメラと操作を制限する。
 *
 * ```ts
 * *biteSteps(t: Steps, target: Player) {
 *   const hold = this.grab(target, { offset: [0, 1.2, 1.4], camera: 'minecraft:third_person', lock: ['movement', 'jump'] });
 *   try {
 *     yield* t.wait(40);
 *     target.applyDamage(8, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
 *   } finally {
 *     hold.release();      // 段取りが止められても必ず放す
 *   }
 * }
 * ```
 *
 * 次のときは自動で放す（カメラと操作も元に戻す）:
 * 掴んでいる側が死んだ・消えた、掴まれた側が死んだ・抜けた、max を過ぎた、同じプレイヤーを別の掴みで掴んだ。
 * 抜けたり、サーバーが止まったりして戻せなかった場合も、次に出現したときに戻す（プレイヤーに印を残しておく）。
 */
import { InputPermissionCategory, system, world, type Entity, type Player, type Vector3 } from '@minecraft/server';

export type ReleaseReason = 'released' | 'timeout' | 'holderDied' | 'holderGone' | 'targetDied' | 'targetLeft' | 'replaced';

export type LockKind = 'movement' | 'lateral' | 'jump' | 'sneak' | 'camera';

const LOCKS: Record<LockKind, InputPermissionCategory> = {
  movement: InputPermissionCategory.Movement,
  lateral: InputPermissionCategory.LateralMovement,
  jump: InputPermissionCategory.Jump,
  sneak: InputPermissionCategory.Sneak,
  camera: InputPermissionCategory.Camera,
};

export interface GrabOptions {
  /** 掴んでいる側から見た位置 [x, y, z]（ブロック単位。向きに合わせて回る。既定 [0, 0, 1.5] = 正面） */
  offset?: readonly [number, number, number];
  /** 掴んでいる間のカメラ（例 'minecraft:third_person'）。省略すると変えない */
  camera?: string | { preset: string, options?: Record<string, unknown> };
  /** 止める操作（既定 ['movement', 'jump']） */
  lock?: readonly LockKind[];
  /** 掴まれた側を、掴んでいる側の頭に向かせるか（既定 true） */
  face?: boolean;
  /** 最大で掴んでいる tick 数。過ぎたら放す（理由 'timeout'） */
  max?: number;
  /** 放したとき（理由付き） */
  onRelease?: (reason: ReleaseReason) => void;
}

/** 掴みの状態と操作 */
export interface Hold {
  readonly holder: Entity;
  readonly target: Player;
  /** まだ掴んでいるか */
  readonly active: boolean;
  /** 放した理由（掴んでいる間は undefined） */
  readonly reason: ReleaseReason | undefined;
  /** 掴んでからの tick 数 */
  readonly elapsed: number;
  /** 放す（カメラと操作を戻す）。もう放していれば何もしない */
  release(): void;
}

/** プレイヤーに残す印（戻し損ねたとき、次の出現で戻すため） */
const MARK = 'hakomc:grab';

const holds = new Map<string, HoldImpl>();

const isValid = (e: Entity | undefined) => {
  try {
    return !!e?.isValid;
  } catch {
    return false;
  }
};

/** 掴まれた側を元に戻す（カメラと操作）。印に書いた内容だけ戻す */
function restore(player: Player) {
  if (!isValid(player)) return;
  let mark: { camera?: boolean, lock?: LockKind[] } = {};
  try {
    const raw = player.getDynamicProperty(MARK);
    if (typeof raw !== 'string') return;
    mark = JSON.parse(raw);
  } catch {
    return;
  }
  for (const k of mark.lock ?? []) player.inputPermissions.setPermissionCategory(LOCKS[k], true);
  if (mark.camera) player.camera.clear();
  player.setDynamicProperty(MARK, undefined);
}

class HoldImpl implements Hold {
  reason: ReleaseReason | undefined;
  private readonly startedAt = system.currentTick;

  constructor(readonly holder: Entity, readonly target: Player, readonly options: GrabOptions) {}

  get active() {
    return this.reason === undefined;
  }
  get elapsed() {
    return system.currentTick - this.startedAt;
  }

  begin() {
    const p = this.target;
    const lock = this.options.lock ?? ['movement', 'jump'];
    const cam = this.options.camera;
    p.setDynamicProperty(MARK, JSON.stringify({ camera: !!cam, lock }));
    for (const k of lock) p.inputPermissions.setPermissionCategory(LOCKS[k], false);
    if (cam) {
      if (typeof cam === 'string') p.camera.setCamera(cam);
      else p.camera.setCamera(cam.preset, cam.options as never);
    }
    this.follow();
  }

  /** 決めた位置に置く（毎 tick） */
  follow() {
    const h = this.holder;
    const [ox, oy, oz] = this.options.offset ?? [0, 0, 1.5];
    const yaw = (h.getRotation().y * Math.PI) / 180;
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const base = h.location;
    const to: Vector3 = { x: base.x + ox * c - oz * s, y: base.y + oy, z: base.z + ox * s + oz * c };
    this.target.teleport(to, {
      dimension: h.dimension,
      keepVelocity: false,
      ...(this.options.face === false ? {} : { facingLocation: h.getHeadLocation() }),
    });
  }

  release(reason: ReleaseReason = 'released') {
    if (this.reason !== undefined) return;
    this.reason = reason;
    if (holds.get(this.target.id) === this) holds.delete(this.target.id);
    // 抜けた（before イベントの中）ときは、世界を変更できないので戻さない。次に出現したときに印から戻す
    if (reason !== 'targetLeft') {
      try {
        restore(this.target);
      } catch {
        // 戻せなかった場合も印が残るので、次の出現で戻る
      }
    }
    this.options.onRelease?.(reason);
  }
}

/** プレイヤーを掴む。同じプレイヤーを掴んでいる別の掴みは放す（理由 'replaced'） */
export function grab(holder: Entity, target: Player, options: GrabOptions = {}): Hold {
  install();
  holds.get(target.id)?.release('replaced');
  const h = new HoldImpl(holder, target, options);
  holds.set(target.id, h);
  h.begin();
  return h;
}

/** 掴んでいる側が死んだ・消えたとき */
function releaseHeldBy(holder: Entity | string, reason: 'holderDied' | 'holderGone') {
  const id = typeof holder === 'string' ? holder : holder.id;
  for (const h of [...holds.values()]) if (h.holder.id === id) h.release(reason);
}

/** 今の掴み（テストや、ほかの部品から使う） */
export function holdOf(player: Player): Hold | undefined {
  return holds.get(player.id);
}

let installed = false;
function install() {
  if (installed) return;
  installed = true;
  system.runInterval(() => {
    for (const h of [...holds.values()]) {
      if (!isValid(h.target)) {
        h.release('targetLeft');
        continue;
      }
      if (!isValid(h.holder)) {
        h.release('holderGone');
        continue;
      }
      const max = h.options.max;
      if (max !== undefined && h.elapsed >= max) {
        h.release('timeout');
        continue;
      }
      h.follow();
    }
  }, 1);
  world.afterEvents.entityDie.subscribe((ev) => {
    let id: string;
    try {
      id = ev.deadEntity.id;
    } catch {
      return;
    }
    // 掴まれた側が死んだ / 掴んでいる側が死んだ
    holds.get(id)?.release('targetDied');
    releaseHeldBy(id, 'holderDied');
  });
  world.beforeEvents.playerLeave.subscribe((ev) => {
    holds.get(ev.player.id)?.release('targetLeft');
  });
  // 戻し損ねた印が残っていれば戻す（抜けた・サーバーが止まった・/reload のあとなど）
  world.afterEvents.playerSpawn.subscribe((ev) => {
    if (!holds.has(ev.player.id)) restore(ev.player);
  });
}

/** 起動時に、印の残ったプレイヤーを戻せるようにする（runtime.ts の install から呼ぶ） */
export function installGrab() {
  install();
}
