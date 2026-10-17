import { beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sim } from '../../../core/testing';
import {
  BoolProperty, ComponentGroup, EntityDefinitionError, EntityEvent, EnumProperty, IntProperty,
  buildPack, component, definePack, entity, health, movement, set, timer, typeFamily,
  COMPONENT_SOURCE_VERSION, type Component,
} from '../../../core/entity';

// ---- 定義（モルグレイヴの怒りを小さくしたもの） ----
class IsAngry extends BoolProperty('is_angry', false, { client: true }) {}
class Phase extends EnumProperty('phase', ['idle', 'bite', 'roar'], 'idle', { client: true }) {}
class PodsLeft extends IntProperty('pods_left', 5, { range: [0, 5] }) {}

// Angry の timer → Calm、Calm → Angry を外す（循環）
class Angry extends ComponentGroup {
  components: Component[] = [movement({ value: 0.35 }), timer({ time: 30, looping: false, time_down_event: { event: Calm, target: 'self' } })];
}
class Enrage extends EntityEvent {
  static readonly id = 'enrage';
  add = [Angry];
  set = [set(IsAngry, true), set(Phase, 'roar')];
}
class Calm extends EntityEvent {
  static readonly id = 'calm';
  remove = [Angry];
  set = [set(IsAngry, false), set(Phase, 'idle')];
}

class Morgrave extends entity('hako:morgrave', {
  name: { en_US: 'Morgrave', ja_JP: 'モルグレイヴ' },
  properties: [IsAngry, Phase, PodsLeft],
  components: [health({ value: 600, max: 600 }), movement({ value: 0.25 }), typeFamily({ family: ['monster', 'boss'] })],
  events: [Enrage],
  client: {
    geometry: 'geometry.morgrave',
    textures: 'textures/entity/morgrave',
    spawnEgg: { baseColor: '#2b1d1d', overlayColor: '#b3261e' },
  },
}) {
  hit() {
    if (!this.get(IsAngry)) this.trigger(Enrage);
    this.set(PodsLeft, this.get(PodsLeft) - 1);
  }
}

const bp = (cls: { toFiles(): ReturnType<typeof Morgrave.toFiles> }, file: string) => cls.toFiles().behavior[file] as any;

describe('entity: BP の JSON', () => {
  const json = bp(Morgrave, 'entities/morgrave.json')['minecraft:entity'];

  it('description にプロパティが名前空間付きで入る', () => {
    expect(json.description).toEqual({
      identifier: 'hako:morgrave',
      is_spawnable: true,
      is_summonable: true,
      properties: {
        'hako:is_angry': { type: 'bool', default: false, client_sync: true },
        'hako:phase': { type: 'enum', values: ['idle', 'bite', 'roar'], default: 'idle', client_sync: true },
        'hako:pods_left': { type: 'int', range: [0, 5], default: 5, client_sync: false },
      },
    });
  });
  it('コンポーネントは公式と同じ名前・形で入る', () => {
    expect(json.components).toEqual({
      'minecraft:health': { value: 600, max: 600 },
      'minecraft:movement': { value: 0.25 },
      'minecraft:type_family': { family: ['monster', 'boss'] },
    });
  });
  it('events に書いていないグループ・イベントも、参照を辿って集める（循環していても止まる）', () => {
    expect(json.component_groups).toEqual({
      angry: {
        'minecraft:movement': { value: 0.35 },
        'minecraft:timer': { time: 30, looping: false, time_down_event: { event: 'hako:calm', target: 'self' } },
      },
    });
    expect(json.events).toEqual({
      'hako:enrage': { add: { component_groups: ['angry'] }, set_property: { 'hako:is_angry': true, 'hako:phase': 'roar' } },
      'hako:calm': { remove: { component_groups: ['angry'] }, set_property: { 'hako:is_angry': false, 'hako:phase': 'idle' } },
    });
  });
  it('イベントの続きと、そのまま足す JSON', () => {
    class Second extends EntityEvent { static readonly id = 'second'; }
    class First extends EntityEvent {
      static readonly id = 'first';
      trigger = Second;
      extra = { queue_command: { command: 'say hi' } };
    }
    const E = entity('hako:chain', { events: [First] });
    expect(bp(E, 'entities/chain.json')['minecraft:entity'].events).toEqual({
      'hako:first': { trigger: 'hako:second', queue_command: { command: 'say hi' } },
      'hako:second': {},
    });
  });
  it('型がまだ無いコンポーネントは component() で書ける。グループの名前は static id で決められる', () => {
    class Big extends ComponentGroup {
      static readonly id = 'size_big';
      components = [component('minecraft:future_thing', { power: 9 })];
    }
    class Grow extends EntityEvent { static readonly id = 'grow'; add = [Big]; }
    const E = entity('hako:x', { events: [Grow] });
    expect(bp(E, 'entities/x.json')['minecraft:entity'].component_groups).toEqual({ size_big: { 'minecraft:future_thing': { power: 9 } } });
  });
});

describe('entity: RP とローカライズ', () => {
  it('client_entity を作る（material と render controller は既定値）', () => {
    expect((Morgrave.toFiles().resource['entity/morgrave.entity.json'] as any)['minecraft:client_entity'].description).toEqual({
      identifier: 'hako:morgrave',
      materials: { default: 'entity_alphatest' },
      textures: { default: 'textures/entity/morgrave' },
      geometry: { default: 'geometry.morgrave' },
      render_controllers: ['controller.render.default'],
      spawn_egg: { base_color: '#2b1d1d', overlay_color: '#b3261e' },
    });
  });
  it('名前を言語ごとに作る（スポーンエッグがあればその名前も）', () => {
    expect(Morgrave.toFiles().lang).toEqual({
      en_US: ['entity.hako:morgrave.name=Morgrave', 'item.spawn_egg.entity.hako:morgrave.name=Morgrave'],
      ja_JP: ['entity.hako:morgrave.name=モルグレイヴ', 'item.spawn_egg.entity.hako:morgrave.name=モルグレイヴ'],
    });
  });
  it('client が無ければ RP は作らない', () => {
    expect(entity('hako:plain').toFiles().resource).toEqual({});
  });
});

describe('entity: ビルド時の検査', () => {
  const err = (f: () => unknown) => expect(f).toThrow(EntityDefinitionError);
  it('識別子の形', () => {
    err(() => entity('Morgrave'));
    err(() => entity('hako:Morgrave'));
  });
  it('イベントに id が無い', () => {
    class NoId extends EntityEvent {}
    // @ts-expect-error id が無いイベントは型でも弾く
    err(() => entity('hako:a', { events: [NoId] }).toFiles());
  });
  it('名前が重なる', () => {
    class A extends EntityEvent { static readonly id = 'same'; }
    class B extends EntityEvent { static readonly id = 'same'; }
    err(() => entity('hako:a', { events: [A, B] }).toFiles());
    class P1 extends BoolProperty('p', true) {}
    class P2 extends BoolProperty('p', false) {}
    err(() => entity('hako:a', { properties: [P1, P2] }).toFiles());
    class G1 extends ComponentGroup { components = []; }
    class G2 extends ComponentGroup { static readonly id = 'g1'; components = []; }
    err(() => entity('hako:a', { groups: [G1, G2] }).toFiles());
  });
  it('既定値が範囲・選択肢の外', () => {
    class Bad extends IntProperty('n', 9, { range: [0, 5] }) {}
    err(() => entity('hako:a', { properties: [Bad] }).toFiles());
  });
  it('同じコンポーネントが 2 回', () => {
    err(() => entity('hako:a', { components: [health({ value: 1 }), health({ value: 2 })] }).toFiles());
  });
  it('エンティティが重なる', () => {
    err(() => buildPack(definePack({ entities: [entity('hako:dup'), entity('hako:dup')] })));
  });
});

describe('entity: スクリプト側', () => {
  beforeEach(() => {
    sim.reset();
    sim.loadEntityJson(bp(Morgrave, 'entities/morgrave.json'));
  });
  it('定義と同じ名前で getProperty / setProperty / triggerEvent する', () => {
    const e = sim.spawn('hako:morgrave', { x: 0, y: 0, z: 0 });
    expect(Morgrave.is(e)).toBe(true);
    const m = Morgrave.of(e);
    expect(m).toBeInstanceOf(Morgrave);
    m.hit();
    sim.tick();
    expect(e.getProperty('hako:is_angry')).toBe(true);
    expect(m.get(Phase)).toBe('roar');
    expect(m.get(PodsLeft)).toBe(4);
    expect(Morgrave.propertyName(IsAngry)).toBe('hako:is_angry');
    expect(Morgrave.eventName(Calm)).toBe('hako:calm');
  });
});

describe('entity: 型で弾く間違い（tsc で確かめる）', () => {
  it('コンパイルが通れば OK', () => {
    class Other extends BoolProperty('other', true) {}
    const m = Morgrave.of(sim.spawn('hako:morgrave', { x: 0, y: 0, z: 0 }));
    const fns = [
      // @ts-expect-error 定義に無いプロパティ
      () => m.get(Other),
      // @ts-expect-error bool に文字列
      () => m.set(IsAngry, 'yes'),
      // @ts-expect-error enum に無い値
      () => set(Phase, 'raor'),
      // @ts-expect-error int に文字列
      () => set(PodsLeft, 'many'),
      // @ts-expect-error enum の既定値が values に無い
      () => EnumProperty('x', ['a', 'b'], 'c'),
      // @ts-expect-error コンポーネントの項目名の打ち間違い
      () => health({ valu: 600 }),
      // @ts-expect-error コンポーネントの値の型が違う
      () => movement({ value: 'fast' }),
      // @ts-expect-error イベントのところにグループ
      () => timer({ time_down_event: Angry }),
    ];
    expect(fns.length).toBe(8);
    // 定義に無いイベント
    class Unlisted extends EntityEvent { static readonly id = 'unlisted'; }
    // @ts-expect-error events に無いイベントは trigger できない
    expect(() => m.trigger(Unlisted)).toBeTypeOf('function');
    // 正しく書いたもの: 型が付く
    const phase: 'idle' | 'bite' | 'roar' = m.get(Phase);
    const angry: boolean = m.get(IsAngry);
    expect([phase, angry]).toBeDefined();
  });
});

describe('生成したコンポーネント', () => {
  it('インストール済みの @minecraft/bedrock-schemas から生成されている（古ければ npm run gen:entity）', () => {
    const pkg = JSON.parse(readFileSync(resolve(__dirname, '../../../node_modules/@minecraft/bedrock-schemas/package.json'), 'utf8'));
    expect(COMPONENT_SOURCE_VERSION).toBe(pkg.version);
  });
});
