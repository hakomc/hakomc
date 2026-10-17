import { beforeEach, describe, expect, it } from 'vitest';
import { EntityDamageCause, type Entity } from '@minecraft/server';
import { sim } from '../../../core/testing';
import { EntityDefinitionError, EntityEvent, Part, entity, health, rideable, type PartClass } from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

// ---- サンプル: 背中に弱点がある岩のゴーレム ----
/** 背中の弱点: 2.5 倍。40 ダメージで壊れる */
class Back extends Part('back', { seat: [0, 2.2, -0.6], size: [1, 1], damageMultiplier: 2.5, health: 40 }) {}
/** 腕: 硬い（0.5 倍）。壊れない */
class LeftArm extends Part('left_arm', { seat: [1.2, 1.2, 0], size: [0.8, 1.4], damageMultiplier: 0.5 }) {}
class RightArm extends Part('right_arm', { seat: [-1.2, 1.2, 0], size: [0.8, 1.4], damageMultiplier: 0.5 }) {}

class Stagger extends EntityEvent { static readonly id = 'stagger'; }

const log: string[] = [];

class Golem extends entity('demo:golem', {
  components: [health({ value: 200, max: 200 })],
  parts: [Back, LeftArm, RightArm],
  events: [Stagger],
}) {
  onPartHurt(part: PartClass, damage: number) { log.push(`hurt:${part.id}:${damage}`); }
  onPartBreak(part: PartClass) {
    log.push(`break:${part.id}`);
    if (part === Back) this.trigger(Stagger);
  }
  onPartRestore(part: PartClass) { log.push(`restore:${part.id}`); }
}
Golem.register();

const hpOf = (e: Entity) => e.getComponent('minecraft:health')!.currentValue;
const riders = (e: Entity) => e.getComponent('minecraft:rideable')!.getRiders();

beforeEach(() => {
  sim.reset();
  log.length = 0;
  for (const r of registry().values()) r.instances.clear();
  sim.loadEntityClass(Golem);
});

const spawnGolem = () => {
  const e = sim.spawn('demo:golem', { x: 0, y: 0, z: 0 });
  return { e, g: Golem.of(e) };
};

describe('部位: JSON', () => {
  const files = Golem.toFiles().behavior as Record<string, any>;
  it('本体に座席を作り、部位のエンティティを作る', () => {
    expect(files['entities/golem.json']['minecraft:entity'].components['minecraft:rideable']).toEqual({
      seat_count: 3,
      family_types: ['golem_part'],
      seats: [{ position: [0, 2.2, -0.6] }, { position: [1.2, 1.2, 0] }, { position: [-1.2, 1.2, 0] }],
      interact_text: '',
      pull_in_entities: false,
      crouching_skip_interact: true,
    });
    const back = files['entities/golem_back.json']['minecraft:entity'];
    expect(back.description.identifier).toBe('demo:golem_back');
    expect(back.components['minecraft:collision_box']).toEqual({ width: 1, height: 1 });
    expect(back.components['minecraft:type_family'].family).toEqual(['hakomc_part', 'golem_part']);
    expect(Object.keys(files)).toEqual(['entities/golem_back.json', 'entities/golem_left_arm.json', 'entities/golem_right_arm.json', 'entities/golem.json']);
  });
  it('部位の見た目は、空のモデルで何も描かない（本体に client が無くても作る）', () => {
    const rp = Golem.toFiles().resource as Record<string, any>;
    expect(Object.keys(rp).sort()).toEqual([
      'entity/golem_back.entity.json', 'entity/golem_left_arm.entity.json', 'entity/golem_right_arm.entity.json',
      'models/entity/golem_part.geo.json',
    ]);
    expect(rp['entity/golem_back.entity.json']['minecraft:client_entity'].description).toMatchObject({
      identifier: 'demo:golem_back', geometry: { default: 'geometry.demo_golem_part' },
    });
    expect(rp['models/entity/golem_part.geo.json']['minecraft:geometry'][0].bones).toEqual([{ name: 'root', pivot: [0, 0, 0] }]);
  });
  it('部位を使うときに座席を自分で書く・id が重なる・id の形が違う、はエラー', () => {
    expect(() => entity('demo:x', { parts: [Back], components: [rideable({ seat_count: 1 })] }).toFiles()).toThrow(EntityDefinitionError);
    class Back2 extends Part('back', { seat: [0, 0, 0], size: [1, 1] }) {}
    expect(() => entity('demo:x', { parts: [Back, Back2] }).toFiles()).toThrow('部位の id back が 2 つある');
    class Bad extends Part('Bad-Name', { seat: [0, 0, 0], size: [1, 1] }) {}
    expect(() => entity('demo:x', { parts: [Bad] }).toFiles()).toThrow(EntityDefinitionError);
  });
});

describe('部位: 座席', () => {
  it('出現したら、部位を決まった順番で座席に乗せる。本体の向きに合わせて回る', () => {
    const { e, g } = spawnGolem();
    expect(riders(e).map((r) => r.typeId)).toEqual(['demo:golem_back', 'demo:golem_left_arm', 'demo:golem_right_arm']);
    expect(g.part(Back).entity).toBe(riders(e)[0]);
    e.setRotation({ x: 0, y: 90 });
    sim.tick();
    const loc = g.part(LeftArm).entity!.location;
    expect(loc.x).toBeCloseTo(0);
    expect(loc.z).toBeCloseTo(1.2);
    expect(loc.y).toBeCloseTo(1.2);
  });
  it('読み込み直したとき、乗っている順番が違えば乗せ直す（部位は増やさない）', () => {
    const { e } = spawnGolem();
    const before = riders(e).map((r) => r.id);
    const rid = e.getComponent('minecraft:rideable')!;
    const [a, b, c] = riders(e);
    rid.ejectRiders();
    rid.addRider(c);
    rid.addRider(a);
    rid.addRider(b);
    for (const r of registry().values()) r.instances.clear();
    sim.emit('world.afterEvents.entityLoad', { entity: e });
    expect(riders(e).map((r) => r.typeId)).toEqual(['demo:golem_back', 'demo:golem_left_arm', 'demo:golem_right_arm']);
    expect(riders(e).map((r) => r.id).sort()).toEqual(before.sort());
    expect(sim.dimension().getEntities({ families: ['hakomc_part'] }).length).toBe(3);
  });
  it('部位が消されたら、次の tick に新しく出して同じ座席に乗せる', () => {
    const { e, g } = spawnGolem();
    const old = g.part(LeftArm).entity!;
    old.kill();
    sim.tick();
    expect(riders(e).map((r) => r.typeId)).toEqual(['demo:golem_back', 'demo:golem_left_arm', 'demo:golem_right_arm']);
    expect(g.part(LeftArm).entity!.id).not.toBe(old.id);
  });
  it('本体が死んだら部位も消える', () => {
    const { e } = spawnGolem();
    e.kill();
    expect(sim.dimension().getEntities({ families: ['hakomc_part'] })).toEqual([]);
  });
  it('本体のいない部位は、2 回続けて見回りで見つかったら消える', () => {
    const lone = sim.spawn('demo:golem_back', { x: 5, y: 0, z: 5 });
    sim.tick(40);
    expect(lone.isValid).toBe(true);
    sim.tick(40);
    expect(lone.isValid).toBe(false);
  });
});

describe('部位: ダメージ', () => {
  it('部位へのダメージは倍率を掛けて本体に伝わり、部位自体は減らない', () => {
    const { e, g } = spawnGolem();
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 3 });
    sim.hurt(g.part(Back).entity!, 4, { damagingEntity: p });
    expect(hpOf(e)).toBe(190);
    expect(hpOf(g.part(Back).entity!)).toBe(1000);
    expect(g.part(Back).health).toBe(36);
    expect(log).toEqual(['hurt:back:10']);
    sim.hurt(g.part(LeftArm).entity!, 4, { damagingEntity: p });
    expect(hpOf(e)).toBe(188);
    expect(g.part(LeftArm).health).toBeUndefined();
  });
  it('本体自身・同じ本体の部位からのダメージと、炎などの原因は伝えない', () => {
    const { e, g } = spawnGolem();
    sim.hurt(g.part(Back).entity!, 4, { damagingEntity: e });
    sim.hurt(g.part(Back).entity!, 4, { damagingEntity: g.part(LeftArm).entity! });
    sim.hurt(g.part(Back).entity!, 4, { cause: EntityDamageCause.fire });
    expect(hpOf(e)).toBe(200);
    expect(log).toEqual([]);
  });
  it('部位の体力が 0 で壊れ、そのあとのダメージは無視する。座席の並びは変わらない', () => {
    const { e, g } = spawnGolem();
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 3 });
    const order = riders(e).map((r) => r.id);
    sim.hurt(g.part(Back).entity!, 25, { damagingEntity: p });
    sim.hurt(g.part(Back).entity!, 25, { damagingEntity: p });
    expect(g.part(Back).broken).toBe(true);
    expect(log).toEqual(['hurt:back:62.5', 'hurt:back:62.5', 'break:back']);
    expect(sim.logs('triggerEvent').map((l) => l.eventName)).toEqual(expect.arrayContaining(['hakomc:part_break', 'demo:stagger']));
    const hp = hpOf(e);
    sim.hurt(g.part(Back).entity!, 25, { damagingEntity: p });
    expect(hpOf(e)).toBe(hp);
    expect(riders(e).map((r) => r.id)).toEqual(order);
  });
  it('restore で戻り、体力も満タンになる', () => {
    const { g } = spawnGolem();
    g.part(Back).break();
    g.part(Back).restore();
    expect(log).toEqual(['break:back', 'restore:back']);
    expect(g.part(Back).broken).toBe(false);
    expect(g.part(Back).health).toBe(40);
    expect(sim.logs('triggerEvent').map((l) => l.eventName)).toContain('hakomc:part_restore');
  });
  it('壊れた状態は本体に保存され、読み込み直しても壊れたまま（部位の当たり判定も小さくし直す）', () => {
    const { e, g } = spawnGolem();
    g.part(Back).break();
    for (const r of registry().values()) r.instances.clear();
    const before = sim.logs('triggerEvent').length;
    sim.emit('world.afterEvents.entityLoad', { entity: e });
    expect(Golem.of(e).part(Back).broken).toBe(true);
    expect(sim.logs('triggerEvent').slice(before).map((l) => l.eventName)).toContain('hakomc:part_break');
  });
  it('health の無い部位は壊せない', () => {
    const { g } = spawnGolem();
    expect(() => g.part(LeftArm).break()).toThrow('health が無い');
  });
});

describe('部位: 型', () => {
  it('定義に無い部位は型エラー', () => {
    class Tail extends Part('tail', { seat: [0, 0, 0], size: [1, 1] }) {}
    const { g } = spawnGolem();
    // @ts-expect-error Golem の部位ではない
    expect(() => g.part(Tail)).toBeDefined();
  });
});
