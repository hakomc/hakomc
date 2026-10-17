import { beforeEach, describe, expect, it } from 'vitest';
import { EntityDamageCause, type Entity } from '@minecraft/server';
import { sim } from '../../../core/testing';
import { EntityDefinitionError, EntityEvent, Part, collisionBox, entity, health, rideable, type PartClass } from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

// ---- サンプル: 背中に弱点がある岩のゴーレム ----
/** 背中の弱点: 2.5 倍。40 ダメージで壊れる */
class Back extends Part('back', { seat: [0, 2.2, -0.6], size: [1, 1], damageMultiplier: 2.5, health: 40 }) {}
/** 腕: 硬い（0.5 倍）。壊れない */
class LeftArm extends Part('left_arm', { seat: [1.2, 1.2, 0], size: [0.8, 1.4], damageMultiplier: 0.5 }) {}
class RightArm extends Part('right_arm', { seat: [-1.2, 1.2, 0], size: [0.8, 1.4], damageMultiplier: 0.5 }) {}
/** 胸の核: 最初は無効（叩けない）。3 倍、30 で壊れる */
class Core extends Part('core', { seat: [0, 1.4, 1.2], size: [0.6, 0.6], damageMultiplier: 3, health: 30, disabled: true }) {}

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

describe('部位: ビルド時の警告と、壊れた部位を隠す設定', () => {
  it('部位の当たり判定が本体の当たり判定に半分以上埋まる向きがあれば警告する（ビルドは止めない）', () => {
    // 実機で起きた例: 本体の幅 1.6（±0.8）に対し、背中の部位が 0.25 しかはみ出していない
    class Hump extends Part('hump', { seat: [0, 1.85, -0.65], size: [0.8, 0.7] }) {}
    class Arm extends Part('arm', { seat: [1.05, 0.5, 0], size: [0.5, 1.6] }) {}
    const E = entity('demo:buried', { components: [collisionBox({ width: 1.6, height: 2.4 })], parts: [Hump, Arm] });
    const w = E.toFiles().warnings!;
    expect(w).toHaveLength(1);
    expect(w[0]).toMatch(/部位 hump の当たり判定が、本体の当たり判定に最大 \d+% 埋まる/);
    // 外に出せば警告は出ない
    class Hump2 extends Part('hump', { seat: [0, 1.75, -1.05], size: [0.7, 0.75] }) {}
    expect(entity('demo:ok', { components: [collisionBox({ width: 1.2, height: 2.4 })], parts: [Hump2, Arm] }).toFiles().warnings).toEqual([]);
  });
  it('hideBone: client_sync のプロパティと、ボーンを隠すレンダーコントローラーを作り、壊れたら本体のプロパティを立てる', () => {
    class Hump extends Part('hump', { seat: [0, 1.75, -1.05], size: [0.7, 0.75], health: 10, hideBone: 'back_core' }) {}
    class Beast extends entity('demo:beast', {
      components: [health({ value: 50 })],
      parts: [Hump],
      client: { geometry: 'geometry.beast', textures: 'textures/entity/beast' },
    }) {}
    Beast.register();
    const files = Beast.toFiles() as any;
    expect(files.behavior['entities/beast.json']['minecraft:entity'].description.properties['demo:part_hump_broken'])
      .toEqual({ type: 'bool', default: false, client_sync: true });
    expect(files.resource['entity/beast.entity.json']['minecraft:client_entity'].description.render_controllers).toEqual(['controller.render.demo_beast']);
    expect(files.resource['render_controllers/beast.render_controllers.json'].render_controllers['controller.render.demo_beast'].part_visibility)
      .toEqual([{ '*': true }, { back_core: '!q.property(\'demo:part_hump_broken\')' }]);
    sim.loadEntityClass(Beast);
    const e = sim.spawn('demo:beast', { x: 0, y: 0, z: 0 });
    const b = Beast.of(e);
    b.part(Hump).break();
    sim.tick();
    expect(e.getProperty('demo:part_hump_broken')).toBe(true);
    b.part(Hump).restore();
    sim.tick();
    expect(e.getProperty('demo:part_hump_broken')).toBe(false);
  });
  it('hideBone: renderControllers を自分で書いていれば、足す式を警告で知らせる', () => {
    class Hump extends Part('hump', { seat: [0, 2, -2], size: [1, 1], health: 10, hideBone: ['a', 'b'] }) {}
    const E = entity('demo:own_rc', {
      parts: [Hump],
      client: { geometry: 'g', textures: 't', renderControllers: ['controller.render.mine'] },
    });
    const f = E.toFiles();
    expect(Object.keys(f.resource).some((k) => k.startsWith('render_controllers/'))).toBe(false);
    expect(f.warnings!.join('\n')).toContain(`{"a":"!q.property('demo:part_hump_broken')"},{"b":"!q.property('demo:part_hump_broken')"}`);
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

/** 胸の核が弱点の番人。核は最初は叩けない */
class Warden extends entity('demo:warden', {
  components: [health({ value: 200, max: 200 })],
  parts: [Back, LeftArm, Core],
}) {
  onPartHurt(part: PartClass, damage: number) { log.push(`hurt:${part.id}:${damage}`); }
  onPartBlocked(part: PartClass) { log.push(`blocked:${part.id}`); }
}
Warden.register();

describe('部位: 無効にする', () => {
  beforeEach(() => sim.loadEntityClass(Warden));
  const spawnWarden = () => {
    const e = sim.spawn('demo:warden', { x: 0, y: 0, z: 0 });
    return { e, g: Warden.of(e) };
  };
  const partEvents = (from = 0) => sim.logs('triggerEvent').slice(from).map((l) => l.eventName).filter((n) => n.startsWith('hakomc:part_'));
  it('disabled: true の部位は、最初から攻撃を受け付けない（本体も部位の体力も減らず、onPartBlocked が呼ばれる）', () => {
    const { e, g } = spawnWarden();
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 3 });
    expect(g.part(Core).disabled).toBe(true);
    sim.hurt(g.part(Core).entity!, 5, { damagingEntity: p });
    expect(hpOf(e)).toBe(200);
    expect(g.part(Core).health).toBe(30);
    expect(log).toEqual(['blocked:core']);
    // 炎などの原因は、防いだことにもしない
    sim.hurt(g.part(Core).entity!, 5, { cause: EntityDamageCause.fire });
    expect(log).toEqual(['blocked:core']);
  });
  it('enable() で受け付けるようになり、disable() でまた防ぐ。既定では当たり判定は残す', () => {
    const { e, g } = spawnWarden();
    const p = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 3 });
    const before = sim.logs('triggerEvent').length;
    g.part(Core).enable();
    sim.hurt(g.part(Core).entity!, 5, { damagingEntity: p });
    expect(hpOf(e)).toBe(185);
    expect(g.part(Core).health).toBe(25);
    g.part(Back).disable();
    expect(g.part(Back).disabled).toBe(true);
    sim.hurt(g.part(Back).entity!, 4, { damagingEntity: p });
    expect(hpOf(e)).toBe(185);
    expect(log).toEqual(['hurt:core:15', 'blocked:back']);
    expect(partEvents(before)).toEqual(['hakomc:part_restore', 'hakomc:part_restore']);
  });
  it('passThrough: true なら当たり判定を小さくし、有効に戻すと元の大きさに戻す', () => {
    const { g } = spawnWarden();
    const before = sim.logs('triggerEvent').length;
    g.part(LeftArm).disable({ passThrough: true });
    expect(partEvents(before)).toEqual(['hakomc:part_break']);
    g.part(LeftArm).enable();
    expect(partEvents(before)).toEqual(['hakomc:part_break', 'hakomc:part_restore']);
  });
  it('壊れているかとは別: 無効のまま壊す・戻すことができ、戻しても無効のまま', () => {
    const { g } = spawnWarden();
    g.part(Core).break();
    expect(g.part(Core).broken).toBe(true);
    g.part(Core).restore();
    expect(g.part(Core).broken).toBe(false);
    expect(g.part(Core).disabled).toBe(true);
    // 壊れた部位を有効にしても、壊れたまま（当たり判定は小さいまま）
    g.part(Back).break();
    const before = sim.logs('triggerEvent').length;
    g.part(Back).disable();
    g.part(Back).enable();
    expect(g.part(Back).broken).toBe(true);
    expect(partEvents(before)).toEqual(['hakomc:part_break', 'hakomc:part_break']);
  });
  it('有効 / 無効は本体に保存され、読み込み直しても残る（すり抜ける部位は当たり判定を小さくし直す）', () => {
    const { e, g } = spawnWarden();
    g.part(Core).enable();
    g.part(LeftArm).disable({ passThrough: true });
    for (const r of registry().values()) r.instances.clear();
    const before = sim.logs('triggerEvent').length;
    sim.emit('world.afterEvents.entityLoad', { entity: e });
    const again = Warden.of(e);
    expect(again.part(Core).disabled).toBe(false);
    expect(again.part(LeftArm).disabled).toBe(true);
    expect(partEvents(before)).toEqual(['hakomc:part_break']);
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
