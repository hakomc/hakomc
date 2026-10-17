import { beforeEach, describe, expect, it } from 'vitest';
import { EntityInitializationCause, type EntityDieAfterEvent, type EntityHitEntityAfterEvent, type EntityHurtAfterEvent, type EntitySpawnAfterEvent, type PlayerInteractWithEntityAfterEvent } from '@minecraft/server';
import { sim } from '../../../core/testing';
import { BoolProperty, IntProperty, entity, health, type LastKnown, type LoadReason } from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

const calls: string[] = [];
const log = (s: string) => calls.push(s);

class Hits extends IntProperty('hits', 0, { range: [0, 99] }) {}
class Marked extends BoolProperty('marked', false) {}

class Boss extends entity('hook:boss', { properties: [Hits, Marked], components: [health({ value: 20 })] }) {
  /** 1 体ごとの一時的な状態 */
  ticks = 0;
  lastDie?: LastKnown;

  onSpawn(ev: EntitySpawnAfterEvent) { log(`spawn:${ev.cause}`); }
  onLoad(reason: LoadReason) { log(`load:${reason}`); }
  onHurt(ev: EntityHurtAfterEvent) {
    log(`hurt:${ev.damage}`);
    this.set(Hits, this.get(Hits) + 1);
  }
  onHit(ev: EntityHitEntityAfterEvent) { log(`hit:${ev.hitEntity.typeId}`); }
  onInteract(ev: PlayerInteractWithEntityAfterEvent) { log(`interact:${ev.player.name}`); }
  onTick() {
    this.ticks++;
    if (this.get(Marked)) throw new Error('marked boss');
  }
  onDie(_ev: EntityDieAfterEvent, last: LastKnown) {
    log('die');
    this.lastDie = last;
  }
  onRemove() { log(`remove:valid=${this.entity.isValid}`); }
}
Boss.register();

/** フックを持たないクラス（登録しても何も呼ばれない） */
class Plain extends entity('hook:plain') {}
Plain.register();

beforeEach(() => {
  sim.reset();
  calls.length = 0;
  for (const r of registry().values()) {
    r.instances.clear();
    r.last.clear();
  }
  sim.loadEntityJson(Boss.toFiles().behavior['entities/boss.json']);
  sim.loadEntityJson(Plain.toFiles().behavior['entities/plain.json']);
});

const spawnBoss = (x = 0) => sim.spawn('hook:boss', { x, y: 0, z: 0 });

describe('フック: 出現・読み込み', () => {
  it('新しく出現したら onSpawn。同じ個体には同じオブジェクトを使う', () => {
    const e = spawnBoss();
    expect(calls).toEqual(['spawn:Spawned']);
    const a = Boss.of(e);
    a.ticks = 100;
    expect(Boss.of(e)).toBe(a);
    expect(Boss.of(e).ticks).toBe(100);
    expect(Boss.instances()).toEqual([a]);
  });
  it('読み込みは onLoad。entitySpawn(Loaded) と entityLoad の両方が来ても 1 回', () => {
    const e = spawnBoss();
    calls.length = 0;
    for (const r of registry().values()) r.instances.clear();
    sim.emit('world.afterEvents.entitySpawn', { entity: e, cause: EntityInitializationCause.Loaded });
    sim.emit('world.afterEvents.entityLoad', { entity: e });
    expect(calls).toEqual(['load:chunk']);
  });
  it('起動時（worldLoad と最初の tick）に、すでにいる個体を探して onLoad', () => {
    const e = spawnBoss();
    calls.length = 0;
    for (const r of registry().values()) r.instances.clear();
    sim.emit('world.afterEvents.worldLoad', {});
    expect(calls).toEqual(['load:startup']);
    expect(Boss.instances().map((b) => b.entity)).toEqual([e]);
  });
  it('出現イベントより先に別のイベントが来ても、その場で作って onLoad してから届ける', () => {
    const e = spawnBoss();
    calls.length = 0;
    for (const r of registry().values()) r.instances.clear();
    sim.hurt(e, 3);
    expect(calls).toEqual(['load:late', 'hurt:3']);
  });
});

describe('フック: イベントの振り分け', () => {
  it('ダメージ・攻撃・右クリックが、その個体だけに届く', () => {
    const a = spawnBoss(0);
    const b = spawnBoss(10);
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 3 });
    calls.length = 0;
    sim.hurt(a, 4, { damagingEntity: p });
    sim.hurt(p, 2, { damagingEntity: b });
    sim.emit('world.afterEvents.playerInteractWithEntity', { player: p, target: a });
    expect(calls).toEqual(['hurt:4', 'hit:minecraft:player', 'interact:Steve']);
    sim.tick();
    expect(Boss.of(a).get(Hits)).toBe(1);
    expect(Boss.of(b).get(Hits)).toBe(0);
  });
  it('登録していない種類・フックの無いクラスには何も起きない', () => {
    const plain = sim.spawn('hook:plain', { x: 0, y: 0, z: 0 });
    sim.hurt(plain, 1);
    sim.tick(3);
    expect(calls).toEqual([]);
  });
});

describe('フック: 毎 tick', () => {
  it('onTick が毎 tick 呼ばれる', () => {
    const e = spawnBoss();
    sim.tick(5);
    expect(Boss.of(e).ticks).toBe(5);
  });
  it('1 体が例外を投げても、ほかの個体の onTick は続く（例外は sim.tick から投げ直される）', () => {
    const bad = spawnBoss(0);
    const good = spawnBoss(10);
    bad.setProperty('hook:marked', true);
    sim.tick(); // プロパティの反映
    expect(() => sim.tick()).toThrow('marked boss');
    expect(Boss.of(good).ticks).toBe(2);
  });
});

describe('フック: 死亡・削除', () => {
  it('onDie には、最後に読めた位置とプロパティを渡す。その後オブジェクトは捨てる', () => {
    const e = spawnBoss();
    const obj = Boss.of(e);
    sim.hurt(e, 5);
    sim.tick(2);
    e.kill();
    expect(calls[calls.length - 1]).toBe('die');
    expect(obj.lastDie).toEqual({ location: { x: 0, y: 0, z: 0 }, dimensionId: 'minecraft:overworld', properties: { 'hook:hits': 1, 'hook:marked': false } });
    expect(Boss.instances()).toEqual([]);
  });
  it('消える直前に onRemove（まだ読める）。その後オブジェクトは捨てる', () => {
    const e = spawnBoss();
    e.remove();
    expect(calls).toEqual(['spawn:Spawned', 'remove:valid=true']);
    expect(Boss.instances()).toEqual([]);
  });
  it('読み込まれ直して別のオブジェクトで渡されたら、古いものが無効なら作り直す', () => {
    const e = spawnBoss();
    const old = Boss.of(e);
    // 実機の「チャンクの読み込み直し」: 古い参照は無効になり、同じ id の別のオブジェクトが来る
    (e as any)._valid = false;
    const reloaded = Object.create(e, { _valid: { value: true, writable: true } });
    calls.length = 0;
    sim.emit('world.afterEvents.entityLoad', { entity: reloaded });
    expect(calls).toEqual(['load:chunk']);
    expect(Boss.of(reloaded)).not.toBe(old);
    expect(Boss.of(reloaded).entity).toBe(reloaded);
  });
});

describe('register', () => {
  it('同じクラスを何度登録してもよいが、同じ識別子の別のクラスはエラー', () => {
    expect(() => Boss.register()).not.toThrow();
    class Other extends entity('hook:boss') {}
    expect(() => Other.register()).toThrow('識別子 hook:boss のクラスが 2 つ register() された（Boss と Other）');
  });
  it('フックの引数の型が違えば型エラー', () => {
    class Wrong extends entity('hook:wrong') {
      // @ts-expect-error onHurt の引数は EntityHurtAfterEvent
      onHurt(ev: number) { void ev; }
    }
    expect(Wrong).toBeDefined();
  });
});
