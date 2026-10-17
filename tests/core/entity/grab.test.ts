import { beforeEach, describe, expect, it } from 'vitest';
import { EntityDamageCause, InputPermissionCategory, type Player } from '@minecraft/server';
import { sim } from '../../../core/testing';
import { EnumProperty, entity, health, holdOf, type ReleaseReason, type Steps } from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

const released: ReleaseReason[] = [];

class Holder extends entity('grab:holder', { components: [health({ value: 20 })] }) {}
Holder.register();

beforeEach(() => {
  sim.reset();
  released.length = 0;
  for (const r of registry().values()) r.instances.clear();
  sim.loadEntityClass(Holder);
  sim.loadEntityClass(Flytrap);
});

const setup = () => {
  const holder = Holder.of(sim.spawn('grab:holder', { x: 0, y: 0, z: 0 }));
  const player = sim.spawnPlayer('Steve', { x: 5, y: 0, z: 5 });
  return { holder, player };
};
const inputs = (p: Player) => sim.logs('input').filter((l) => l.entityId === p.id).map((l) => `${l.category}:${l.enabled}`);
const cameras = (p: Player) => sim.logs('camera').filter((l) => l.entityId === p.id).map((l) => (l.action === 'set' ? `set:${l.preset}` : l.action));
const marked = (p: Player) => p.getDynamicProperty('hakomc:grab') !== undefined;

describe('掴み: 固定と制限', () => {
  it('掴んだ側の前に固定し、向きに合わせて回る。カメラと操作を制限する', () => {
    const { holder, player } = setup();
    const hold = holder.grab(player, { offset: [0, 1, 2], camera: 'minecraft:third_person', onRelease: (r) => released.push(r) });
    expect(player.location).toEqual({ x: 0, y: 1, z: 2 });
    expect(cameras(player)).toEqual(['set:minecraft:third_person']);
    expect(inputs(player)).toEqual([`${InputPermissionCategory.Movement}:false`, `${InputPermissionCategory.Jump}:false`]);
    expect(marked(player)).toBe(true);
    holder.entity.setRotation({ x: 0, y: 90 });
    sim.tick();
    expect(player.location.x).toBeCloseTo(-2);
    expect(player.location.z).toBeCloseTo(0);
    expect(hold.active).toBe(true);
    expect(holdOf(player)).toBe(hold);
  });
  it('release で放し、制限した分だけ戻す。印も消す', () => {
    const { holder, player } = setup();
    const hold = holder.grab(player, { camera: 'minecraft:third_person', lock: ['movement', 'camera'], onRelease: (r) => released.push(r) });
    hold.release();
    hold.release();
    expect(released).toEqual(['released']);
    expect(cameras(player)).toEqual(['set:minecraft:third_person', 'clear']);
    expect(inputs(player)).toEqual([
      `${InputPermissionCategory.Movement}:false`, `${InputPermissionCategory.Camera}:false`,
      `${InputPermissionCategory.Movement}:true`, `${InputPermissionCategory.Camera}:true`,
    ]);
    expect(marked(player)).toBe(false);
    expect(holdOf(player)).toBeUndefined();
    sim.tick(3);
    expect(player.location).toEqual({ x: 0, y: 0, z: 1.5 });
  });
  it('camera を決めなければカメラは触らない', () => {
    const { holder, player } = setup();
    holder.grab(player).release();
    expect(cameras(player)).toEqual([]);
  });
});

describe('掴み: 自動で放す', () => {
  const grabbed = () => {
    const s = setup();
    s.holder.grab(s.player, { camera: 'minecraft:third_person', onRelease: (r) => released.push(r) });
    return s;
  };
  it('掴んでいる側が死んだら（holderDied）', () => {
    const { holder, player } = grabbed();
    holder.entity.kill();
    expect(released).toEqual(['holderDied']);
    expect(cameras(player)).toEqual(['set:minecraft:third_person', 'clear']);
  });
  it('掴んでいる側が消えたら、次の tick に（holderGone）', () => {
    const { holder, player } = grabbed();
    holder.entity.remove();
    sim.tick();
    expect(released).toEqual(['holderGone']);
    expect(marked(player)).toBe(false);
  });
  it('掴まれた側が死んだら（targetDied）。カメラはその場で戻す', () => {
    const { player } = grabbed();
    player.kill();
    expect(released).toEqual(['targetDied']);
    expect(cameras(player)).toEqual(['set:minecraft:third_person', 'clear']);
    sim.respawn(player);
    expect(cameras(player)).toEqual(['set:minecraft:third_person', 'clear']);
  });
  it('max を過ぎたら（timeout）', () => {
    const { holder, player } = setup();
    holder.grab(player, { max: 10, onRelease: (r) => released.push(r) });
    sim.tick(9);
    expect(released).toEqual([]);
    sim.tick();
    expect(released).toEqual(['timeout']);
  });
  it('同じプレイヤーを別の掴みで掴んだら、前のものは放す（replaced）', () => {
    const { holder, player } = grabbed();
    const other = Holder.of(sim.spawn('grab:holder', { x: 9, y: 0, z: 9 }));
    const second = other.grab(player);
    expect(released).toEqual(['replaced']);
    expect(holdOf(player)).toBe(second);
    void holder;
  });
  it('抜けたら（targetLeft）。その場では戻せないので、次に出現したときに印から戻す', () => {
    const { player } = grabbed();
    sim.emit('world.beforeEvents.playerLeave', { player });
    expect(released).toEqual(['targetLeft']);
    expect(marked(player)).toBe(true);
    sim.emit('world.afterEvents.playerSpawn', { player, initialSpawn: true });
    expect(marked(player)).toBe(false);
    expect(cameras(player)).toEqual(['set:minecraft:third_person', 'clear']);
  });
  it('サーバーが止まるなどで印だけ残っていても、出現したときに戻す', () => {
    const player = sim.spawnPlayer('Alex', { x: 0, y: 0, z: 0 });
    player.setDynamicProperty('hakomc:grab', JSON.stringify({ camera: true, lock: ['movement'] }));
    sim.emit('world.afterEvents.playerSpawn', { player, initialSpawn: true });
    expect(cameras(player)).toEqual(['clear']);
    expect(inputs(player)).toEqual([`${InputPermissionCategory.Movement}:true`]);
    expect(marked(player)).toBe(false);
  });
});

// ---- サンプル: プレイヤーを捕まえる食虫植物 ----
class TrapPhase extends EnumProperty('phase', ['open', 'closed', 'rest'], 'open', { client: true }) {}

class Flytrap extends entity('demo:flytrap', {
  properties: [TrapPhase],
  components: [health({ value: 40, max: 40 })],
}) {
  bite = this.timeline(this.biteSteps, { lane: 'attack' });

  /** 捕まえて 1 秒ごとに 3 回かじり、吐き出して 3 秒休む */
  *biteSteps(t: Steps, target: Player) {
    const hold = this.grab(target, { offset: [0, 0.8, 0.9], camera: 'minecraft:third_person' });
    try {
      this.set(TrapPhase, 'closed');
      for (let i = 0; i < 3 && hold.active; i++) {
        yield* t.wait(20);
        if (hold.active) target.applyDamage(3, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
      }
    } finally {
      hold.release();
    }
    if (this.entity.isValid) {
      this.set(TrapPhase, 'rest');
      yield* t.wait(60);
      this.set(TrapPhase, 'open');
    }
  }

  onTick() {
    if (this.busy('attack')) return;
    const p = this.entity.dimension.getPlayers({ location: this.entity.location, maxDistance: 3 })[0];
    if (p) this.bite.start(p);
  }
}
Flytrap.register();

describe('サンプル: 食虫植物', () => {
  it('近づいたプレイヤーを捕まえ、3 回かじって吐き出し、休んでからまた開く', () => {
    const trap = sim.spawn('demo:flytrap', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 2 });
    sim.tick();
    expect(holdOf(p)?.active).toBe(true);
    expect(trap.getProperty('demo:phase')).toBe('closed');
    sim.tick(60);
    expect(p.getComponent('minecraft:health')!.currentValue).toBe(11);
    expect(holdOf(p)).toBeUndefined();
    expect(trap.getProperty('demo:phase')).toBe('rest');
    // 吐き出したあとは操作もカメラも戻っている
    expect(cameras(p)).toEqual(['set:minecraft:third_person', 'clear']);
    p.teleport({ x: 20, y: 0, z: 20 });
    sim.tick(61);
    expect(trap.getProperty('demo:phase')).toBe('open');
  });
  it('かじっている途中で植物が倒されたら、その場で放す', () => {
    const trap = sim.spawn('demo:flytrap', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 2 });
    sim.tick(25);
    trap.kill();
    expect(holdOf(p)).toBeUndefined();
    expect(cameras(p)).toEqual(['set:minecraft:third_person', 'clear']);
    expect(p.getDynamicProperty('hakomc:grab')).toBeUndefined();
  });
});
