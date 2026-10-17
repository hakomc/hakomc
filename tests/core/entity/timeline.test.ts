import { beforeEach, describe, expect, it } from 'vitest';
import { EntityDamageCause, system, type Player } from '@minecraft/server';
import { sim } from '../../../core/testing';
import { EnumProperty, entity, health, type CancelReason, type Steps, type Timeline } from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

class Step extends EnumProperty('step', ['idle', 'a', 'b', 'c'], 'idle') {}

const log: string[] = [];

class Dummy extends entity('tl:dummy', { properties: [Step], components: [health({ value: 20 })] }) {
  flag = false;

  /** a → 10 tick → b → 条件か 5 tick → c（フィールドに型を書く書き方） */
  seq: Timeline = this.timeline(function* (t) {
    try {
      this.set(Step, 'a');
      log.push(`a@${system.currentTick}`);
      yield* t.wait(10);
      this.set(Step, 'b');
      log.push(`b@${system.currentTick}`);
      const ok = yield* t.until(() => this.flag, 5);
      log.push(`until=${ok}@${system.currentTick} elapsed=${t.elapsed}`);
      this.set(Step, 'c');
    } finally {
      log.push('finally');
    }
  }, { lane: 'action', onCancel: (r) => log.push(`cancel:${r}`) });

  /** 引数を取る段取り（ジェネレーターのメソッドを渡す書き方）。同じ lane なので seq とは同時に動かない */
  other = this.timeline(this.otherSteps, { lane: 'action' });
  *otherSteps(t: Steps, label: string, ticks: number) {
    log.push(`other:${label}`);
    yield* t.wait(ticks);
    log.push(`other-done:${label}`);
  }

  /** lane なし: 何とでも同時に動く */
  free: Timeline = this.timeline(function* (t) {
    yield* t.wait(3);
    log.push('free-done');
  });

  broken: Timeline = this.timeline(function* (t) {
    yield* t.wait(1);
    throw new Error('broken timeline');
  });

  onDie() { log.push('onDie'); }
}
Dummy.register();

class Unregistered extends entity('tl:unregistered') {
  go: Timeline = this.timeline(function* () {});
}

beforeEach(() => {
  sim.reset();
  log.length = 0;
  for (const r of registry().values()) r.instances.clear();
  sim.loadEntityJson(Dummy.toFiles().behavior['entities/dummy.json']);
});
const spawn = (x = 0) => Dummy.of(sim.spawn('tl:dummy', { x, y: 0, z: 0 }));

describe('timeline: 進み方', () => {
  it('start した tick のうちに最初の yield* まで進み、wait(10) のちょうど 10 tick 後に続きが動く', () => {
    const d = spawn();
    const t0 = system.currentTick;
    expect(d.seq.start()).toBe(true);
    expect(log).toEqual([`a@${t0}`]);
    sim.tick(9);
    expect(log).toEqual([`a@${t0}`]);
    sim.tick();
    expect(log).toEqual([`a@${t0}`, `b@${t0 + 10}`]);
  });
  it('until は条件が成り立った tick に true で進む', () => {
    const d = spawn();
    const t0 = system.currentTick;
    d.seq.start();
    sim.tick(12);
    d.flag = true;
    sim.tick();
    expect(log).toContain(`until=true@${t0 + 13} elapsed=13`);
    expect(log[log.length - 1]).toBe('finally');
    expect(d.seq.running).toBe(false);
    expect(d.seq.lastCancelReason).toBeUndefined();
    sim.tick();
    expect(d.get(Step)).toBe('c');
  });
  it('until は max を過ぎると false で進む', () => {
    const d = spawn();
    const t0 = system.currentTick;
    d.seq.start();
    sim.tick(15);
    expect(log).toContain(`until=false@${t0 + 15} elapsed=15`);
  });
  it('引数を渡せる', () => {
    const d = spawn();
    d.other.start('x', 2);
    sim.tick(2);
    expect(log).toEqual(['other:x', 'other-done:x']);
  });
  it('1 体ずつ別々に進む', () => {
    const a = spawn(0);
    const b = spawn(10);
    a.free.start();
    sim.tick();
    b.free.start();
    sim.tick(2);
    expect(log).toEqual(['free-done']);
    sim.tick();
    expect(log).toEqual(['free-done', 'free-done']);
  });
});

describe('timeline: lane と止め方', () => {
  it('同じ lane が動いていれば start は false。lane なしは同時に動ける', () => {
    const d = spawn();
    d.seq.start();
    expect(d.other.start('x', 1)).toBe(false);
    expect(d.seq.start()).toBe(false);
    expect(d.free.start()).toBe(true);
    expect(d.busy('action')).toBe(true);
    expect(d.busy()).toBe(true);
  });
  it('interrupt は同じ lane のものを止め（finally と onCancel が動く）、すぐ始める', () => {
    const d = spawn();
    d.seq.start();
    log.length = 0;
    d.other.interrupt('y', 1);
    expect(log).toEqual(['finally', 'cancel:interrupted', 'other:y']);
    expect(d.seq.lastCancelReason).toBe<CancelReason>('interrupted');
  });
  it('cancel で止まる。止めたあとは進まない', () => {
    const d = spawn();
    d.seq.start();
    d.seq.cancel();
    expect(log.slice(1)).toEqual(['finally', 'cancel:cancel']);
    sim.tick(20);
    expect(log.slice(1)).toEqual(['finally', 'cancel:cancel']);
    expect(d.busy()).toBe(false);
  });
  it('死んだら onDie の前に止まる（理由 died）', () => {
    const d = spawn();
    d.seq.start();
    d.entity.kill();
    expect(log.slice(1)).toEqual(['finally', 'cancel:died', 'onDie']);
  });
  it('消えたら、次の tick に止まる（finally で世界を変更できるように before イベントの外で）', () => {
    const d = spawn();
    d.seq.start();
    d.entity.remove();
    expect(log.slice(1)).toEqual([]);
    sim.tick();
    expect(log.slice(1)).toEqual(['finally', 'cancel:removed']);
  });
  it('段取りの中の例外はその段取りだけを止め（理由 error）、sim.tick から投げ直される。ほかの個体は進む', () => {
    const a = spawn(0);
    const b = spawn(10);
    a.broken.start();
    b.free.start();
    expect(() => sim.tick()).toThrow('broken timeline');
    expect(a.broken.lastCancelReason).toBe('error');
    sim.tick(2);
    expect(log).toEqual(['free-done']);
  });
  it('register していないクラスでは start できない（誰も進めないため）', () => {
    const u = Unregistered.of(sim.spawn('tl:unregistered', { x: 0, y: 0, z: 0 }));
    expect(() => u.go.start()).toThrow('register()');
  });
});

describe('timeline: 型', () => {
  it('this と引数に型が付く', () => {
    const d = spawn();
    // @ts-expect-error 引数の型が違う
    expect(() => d.other.start(1, 'x')).toBeDefined();
    // @ts-expect-error 引数が足りない
    expect(() => d.other.interrupt('x')).toBeDefined();
    class T extends entity('tl:types') {
      // フィールドの型の引数から、t と target の型が決まる
      b: Timeline<[string]> = this.timeline(function* (t, target) {
        const s: string = target;
        yield* t.wait(s.length);
      });
      x = 1;
      a: Timeline = this.timeline(function* (t) {
        const n: number = this.x;
        const ok: boolean = yield* t.until(() => n > 0, 1);
        // @ts-expect-error until の戻り値は boolean
        const s: string = yield* t.until(() => true);
        void ok; void s;
      });
    }
    expect(T).toBeDefined();
  });
});

// ---- サンプル: 構えてから突進する猪 ----
class BoarPhase extends EnumProperty('phase', ['idle', 'windup', 'dash', 'recover'], 'idle', { client: true }) {}

class Boar extends entity('demo:boar', {
  properties: [BoarPhase],
  components: [health({ value: 30, max: 30 })],
}) {
  /** 構えたときのプレイヤーの位置へ突進する */
  charge = this.timeline(this.chargeSteps, { lane: 'attack' });

  *chargeSteps(t: Steps, target: Player) {
    try {
      this.set(BoarPhase, 'windup');
      const goal = target.location;              // 構えた瞬間の位置を覚える
      yield* t.wait(20);
      this.set(BoarPhase, 'dash');
      const hit = yield* t.until(() => {
        const p = this.entity.location;
        const dx = goal.x - p.x, dz = goal.z - p.z, d = Math.hypot(dx, dz);
        if (d > 0.6) this.entity.teleport({ x: p.x + (dx / d) * 0.6, y: p.y, z: p.z + (dz / d) * 0.6 });
        return Math.hypot(target.location.x - p.x, target.location.z - p.z) < 1.5;
      }, 40);
      if (hit) target.applyDamage(6, { cause: EntityDamageCause.entityAttack, damagingEntity: this.entity });
      this.set(BoarPhase, 'recover');
      yield* t.wait(30);
    } finally {
      // 死亡・削除で止まったときは、エンティティはもう読み書きできない
      if (this.entity.isValid) this.set(BoarPhase, 'idle');
    }
  }

  onTick() {
    if (this.busy('attack')) return;
    const near = this.entity.dimension.getPlayers({ location: this.entity.location, maxDistance: 10 })[0];
    if (near) this.charge.start(near);
  }
}
Boar.register();

describe('サンプル: 突進する猪', () => {
  beforeEach(() => {
    sim.loadEntityJson(Boar.toFiles().behavior['entities/boar.json']);
  });
  it('近くのプレイヤーに、構えてから突進して当たる。硬直のあと、また構える', () => {
    const boar = sim.spawn('demo:boar', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 6 });
    sim.tick();
    expect(boar.getProperty('demo:phase')).toBe('windup');
    sim.tick(20);
    expect(boar.getProperty('demo:phase')).toBe('dash');
    sim.tick(10);
    expect(p.getComponent('minecraft:health')!.currentValue).toBe(14);
    expect(boar.getProperty('demo:phase')).toBe('recover');
    sim.tick(31);
    expect(boar.getProperty('demo:phase')).toBe('windup');
  });
  it('構えている間にプレイヤーが離れたら、覚えた位置まで走って外れる', () => {
    const boar = sim.spawn('demo:boar', { x: 0, y: 0, z: 0 });
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 6 });
    sim.tick();
    p.teleport({ x: 12, y: 0, z: 0 });
    sim.tick(60);
    expect(p.getComponent('minecraft:health')!.currentValue).toBe(20);
    const loc = boar.location;
    expect(Math.hypot(loc.x, loc.z - 6)).toBeLessThan(0.7);
  });
  it('死んだら段取りが止まる', () => {
    const boar = sim.spawn('demo:boar', { x: 0, y: 0, z: 0 });
    sim.spawnPlayer('Steve', { x: 0, y: 0, z: 6 });
    sim.tick(5);
    const b = Boar.of(boar);
    boar.kill();
    expect(b.charge.running).toBe(false);
    expect(b.charge.lastCancelReason).toBe('died');
  });
});
