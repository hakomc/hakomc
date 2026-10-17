import { beforeEach, describe, expect, it } from 'vitest';
import { EntityDamageCause, GameMode, type Player, type Vector3 } from '@minecraft/server';
import { sim } from '../../../core/testing';
import {
  EnumProperty, airTicks, behaviorMeleeAttack, movement, behaviorNearestAttackableTarget, entity, health, horizontalSpeedFor, physics,
  type LeapResult, type Steps,
} from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

const results: LeapResult[] = [];

/** 跳ぶだけの確認用 */
class Jumper extends entity('motion:jumper', { components: [health({ value: 20 }), physics()] }) {
  go = this.timeline(this.goSteps);
  *goSteps(t: Steps, goal: Vector3, follow?: () => Vector3) {
    results.push(yield* this.leapTo(t, goal, { follow }));
  }
}
Jumper.register();

beforeEach(() => {
  sim.reset();
  sim.setGround(0);
  results.length = 0;
  for (const r of registry().values()) r.instances.clear();
  sim.loadEntityClass(Jumper);
  sim.loadEntityClass(Frog);
});

const dist = (a: Vector3, b: Vector3) => Math.hypot(a.x - b.x, a.z - b.z);

describe('leapTo', () => {
  it.each([3, 6, 10, 15])('%d ブロック先に、放物線で跳んで降りる', (d) => {
    const j = Jumper.of(sim.spawn('motion:jumper', { x: 0, y: 0, z: 0 }));
    const goal = { x: d * 0.6, y: 0, z: d * 0.8 };
    j.go.start(goal);
    sim.tick(120);
    expect(results).toHaveLength(1);
    expect(results[0].landed).toBe(true);
    expect(dist(results[0].location, goal)).toBeLessThan(0.5);
    expect(results[0].ticks).toBeGreaterThan(10);
    // 跳ぶ向きを向く
    expect(sim.logs('impulse').length).toBeGreaterThan(1);
  });
  it('遠すぎる目標には maxDistance（既定 16）だけ跳ぶ', () => {
    const j = Jumper.of(sim.spawn('motion:jumper', { x: 0, y: 0, z: 0 }));
    j.go.start({ x: 0, y: 0, z: 40 });
    sim.tick(150);
    expect(results[0].location.z).toBeGreaterThan(14);
    expect(results[0].location.z).toBeLessThan(18);
  });
  it('follow を渡すと、空中で目標を取り直して追いかける', () => {
    const j = Jumper.of(sim.spawn('motion:jumper', { x: 0, y: 0, z: 0 }));
    const target = { x: 0, y: 0, z: 8 };
    j.go.start({ ...target }, () => target);
    sim.tick(5);
    target.x = 3;   // 跳んだあとで目標が横へずれる
    sim.tick(100);
    expect(dist(results[0].location, target)).toBeLessThan(1);
  });
  it('計算の部品', () => {
    expect(airTicks(0, 0.7)).toBeGreaterThan(15);
    expect(horizontalSpeedFor(0, 10)).toBe(0);
    // n tick で d 進む速さで、実際に d 進む
    const v0 = horizontalSpeedFor(5, 12);
    let x = 0, v = v0;
    for (let i = 0; i < 12; i++) { x += v; v *= 0.91; }
    expect(x).toBeCloseTo(5);
  });
});

// ---- サンプル: 跳びかかるカエル ----
class FrogPhase extends EnumProperty('phase', ['idle', 'crouch', 'air', 'land'], 'idle', { client: true }) {}

class Frog extends entity('demo:frog', {
  properties: [FrogPhase],
  components: [
    health({ value: 20, max: 20 }),
    physics(),
    movement({ value: 0.25 }),
    // 追いかけて向くためにバニラの近接攻撃を使う。ダメージは取り消し、跳びかかりで与える
    behaviorNearestAttackableTarget({ priority: 2, entity_types: [{ filters: { test: 'is_family', subject: 'other', value: 'player' }, max_dist: 16 }] }),
    behaviorMeleeAttack({ priority: 3 }),
  ],
  cancelVanillaHits: true,
}) {
  /** 跳びかかっている間は AI に動かされない（構えと跳ぶ向きがずれないように） */
  pounce = this.timeline(this.pounceSteps, { lane: 'attack', holdStill: true });

  /** 跳ぶと決めた瞬間の位置へ跳ぶ（横に避けられる）。着地の周りにダメージとノックバック */
  *pounceSteps(t: Steps, target: Player) {
    try {
      this.set(FrogPhase, 'crouch');
      const goal = target.location;
      this.face(goal);
      yield* t.wait(10);
      this.set(FrogPhase, 'air');
      const r = yield* this.leapTo(t, goal, { short: 0.5 });
      this.set(FrogPhase, 'land');
      if (r.landed) {
        for (const p of this.entity.dimension.getPlayers({ location: r.location, maxDistance: 2 })) {
          this.dealDamage(p, 5, { knockback: { horizontal: 1.2, vertical: 0.4 } });
        }
      }
      yield* t.wait(40);
    } finally {
      if (this.entity.isValid) this.set(FrogPhase, 'idle');
    }
  }

  onTick() {
    if (this.busy('attack')) return;
    const p = this.entity.dimension.getPlayers({
      location: this.entity.location, minDistance: 4, maxDistance: 12, excludeGameModes: [GameMode.Creative, GameMode.Spectator],
    })[0];
    if (p) this.pounce.start(p);
  }
}
Frog.register();

const hp = (p: Player) => p.getComponent('minecraft:health')!.currentValue;

describe('その場で止まる・向く', () => {
  const setup = () => {
    const e = sim.spawn('demo:frog', { x: 0, y: 0, z: 0 });
    return { e, f: Frog.of(e), speed: () => e.getComponent('minecraft:movement')!.currentValue };
  };
  it('holdStill の間は移動の速さが 0。入れ子にでき、全部 release したら戻る', () => {
    const { e, f, speed } = setup();
    expect(speed()).toBe(0.25);
    const a = f.holdStill();
    const b = f.holdStill();
    expect(speed()).toBe(0);
    expect(e.getDynamicProperty('hakomc:still')).toBe(true);
    a.release();
    a.release();
    expect(speed()).toBe(0);
    b.release();
    expect(speed()).toBe(0.25);
    expect(e.getDynamicProperty('hakomc:still')).toBeUndefined();
  });
  it('timeline の holdStill: 動いている間だけ止まる。止められても戻る', () => {
    const { f, speed } = setup();
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 30 });
    f.pounce.start(p);
    expect(speed()).toBe(0);
    f.pounce.cancel();
    expect(speed()).toBe(0.25);
  });
  it('face: 毎 tick turnSpeed 度まで回って向く。エンティティを渡すと追い続ける', () => {
    // カエルは近くのプレイヤーに自分で跳びかかって向きを決めてしまうので、跳ばない Jumper で確かめる
    const e = sim.spawn('motion:jumper', { x: 0, y: 0, z: 0 });
    const f = Jumper.of(e);
    const p = sim.spawnPlayer('Steve', { x: 10, y: 0, z: 0 });   // 真横（-90°）
    f.face(p, 30);
    sim.tick();
    expect(e.getRotation().y).toBeCloseTo(-30);
    sim.tick(3);
    expect(e.getRotation().y).toBeCloseTo(-90);
    p.teleport({ x: 0, y: 0, z: -10 });   // 真後ろ（180°）へ回り込む
    sim.tick(3);
    expect(Math.abs(e.getRotation().y)).toBeCloseTo(180);
    f.face(undefined);
    p.teleport({ x: 0, y: 0, z: 10 });
    sim.tick(3);
    expect(Math.abs(e.getRotation().y)).toBeCloseTo(180);
  });
  it('止まっている途中で保存された個体は、読み込まれたら速さを戻す', () => {
    const { e } = setup();
    e.getComponent('minecraft:movement')!.setCurrentValue(0);
    e.setDynamicProperty('hakomc:still', true);
    for (const r of registry().values()) r.instances.clear();
    sim.emit('world.afterEvents.entityLoad', { entity: e });
    expect(e.getComponent('minecraft:movement')!.currentValue).toBe(0.25);
    expect(e.getDynamicProperty('hakomc:still')).toBeUndefined();
  });
});

describe('サンプル: 跳びかかるカエル', () => {
  it('しゃがんでから跳び、着地の周りのプレイヤーにダメージとノックバック', () => {
    const frog = sim.spawn('demo:frog', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 7 });
    sim.tick();
    expect(frog.getProperty('demo:phase')).toBe('crouch');
    // 構えている間は止まり、跳ぶ先（プレイヤーのいた位置 = +z）を向く
    expect(frog.getComponent('minecraft:movement')!.currentValue).toBe(0);
    expect(frog.getRotation().y).toBeCloseTo(0);
    sim.tick(10);
    expect(frog.getProperty('demo:phase')).toBe('air');
    sim.tick(40);
    expect(frog.getProperty('demo:phase')).toBe('land');
    expect(hp(p)).toBe(15);
    expect(sim.logs('knockback').filter((l) => l.entityId === p.id)).toHaveLength(1);
    expect(dist(frog.location, { x: 0, y: 0, z: 7 })).toBeLessThan(1.2);
    sim.tick(41);
    expect(frog.getComponent('minecraft:movement')!.currentValue).toBe(0.25);
  });
  it('跳ぶと決めたあとで横に避ければ、当たらない', () => {
    sim.spawn('demo:frog', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 7 });
    sim.tick(2);
    p.teleport({ x: 4, y: 0, z: 7 });
    sim.tick(60);
    expect(hp(p)).toBe(20);
  });
  it('バニラの近接攻撃のダメージは取り消す（ノックバックも出ない）。dealDamage は通る', () => {
    const frog = sim.spawn('demo:frog', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 1 });
    sim.hurt(p, 3, { damagingEntity: frog });
    expect(hp(p)).toBe(20);
    expect(sim.logs('damageCancelled')).toHaveLength(1);
    expect(Frog.of(frog).dealDamage(p, 2, { cause: EntityDamageCause.entityAttack })).toBe(true);
    expect(hp(p)).toBe(18);
    expect(sim.logs('knockback')).toHaveLength(0);
  });
});
