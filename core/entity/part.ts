/**
 * 部位（当たり判定）。本体の座席に乗せた、見えないエンティティで作る。
 *
 * ```ts
 * class Back extends Part('back', { seat: [0, 2.2, -0.6], size: [1, 1], damageMultiplier: 2.5, health: 40 }) {}
 *
 * class Golem extends entity('demo:golem', { parts: [Back], … }) {
 *   onPartBreak(part: PartClass) { if (part === Back) this.trigger(Stagger); }
 * }
 * ```
 *
 * - 部位へのダメージは、倍率を掛けて本体に伝える（部位自体は減らない）
 * - health を決めた部位は壊れる。壊れた部位は座席に乗ったまま当たり判定を小さくし、ダメージを無視する
 *   （降ろすと、後ろの座席のエンティティが 1 つずつずれて、別の部位の位置に来てしまうため）
 * - 部位は本体と一緒に読み込まれ・保存される。本体が死ぬと消える。本体のいない部位は自動で消える
 */

export interface PartOptions {
  /** 座席の位置（本体から見たブロック単位の [x, y, z]。本体の向きに合わせて回る） */
  seat: readonly [number, number, number];
  /** 当たり判定の大きさ [幅, 高さ] */
  size: readonly [number, number];
  /** 本体に伝えるダメージの倍率（既定 1）。弱点なら 2 など */
  damageMultiplier?: number;
  /** 部位の体力。決めると、この分のダメージで壊れる（倍率を掛ける前の値で減る） */
  health?: number;
  /** 本体に伝えるダメージの原因（既定 entityAttack と projectile。爆発や炎で部位の数だけ本体が減らないように） */
  causes?: readonly string[];
}

/** 部位のクラスの印 */
export abstract class PartBase {
  declare readonly __part: true;
}

export type PartClass = (abstract new () => PartBase) & { readonly id: string, readonly options: PartOptions };

/** 部位を作る。id は JSON での名前（本体の識別子 + _ + id のエンティティになる） */
export function Part<const Id extends string>(id: Id, options: PartOptions) {
  abstract class P extends PartBase {
    static readonly id: Id = id;
    static readonly options = options;
  }
  return P;
}

/** 部位のエンティティに付けるファミリー（本体の座席は、これだけを乗せる） */
export const partFamily = (bodyId: string) => `${bodyId.split(':')[1]}_part`;
/** 部位のエンティティの識別子 */
export const partTypeId = (bodyId: string, part: PartClass) => `${bodyId}_${part.id}`;
export const PART_FAMILY = 'hakomc_part';
export const PART_BREAK_EVENT = 'hakomc:part_break';
export const PART_RESTORE_EVENT = 'hakomc:part_restore';

const IMMUNE = ['fall', 'fire', 'fire_tick', 'lava', 'suffocation', 'drowning', 'fly_into_wall', 'freezing', 'magma', 'contact'];

/** 部位のエンティティの JSON */
export function partEntityJson(bodyId: string, part: PartClass, formatVersion: string) {
  const [w, h] = part.options.size;
  return {
    format_version: formatVersion,
    'minecraft:entity': {
      description: { identifier: partTypeId(bodyId, part), is_spawnable: false, is_summonable: true },
      component_groups: {
        'hakomc:part_active': { 'minecraft:collision_box': { width: w, height: h } },
        // 壊れた部位: 座席はそのまま、当たり判定だけ小さくする
        'hakomc:part_broken': { 'minecraft:collision_box': { width: 0.01, height: 0.01 } },
      },
      components: {
        // 部位自体は減らない（ダメージはスクリプトが本体に伝え、体力を戻す）
        'minecraft:health': { value: 1000, max: 1000 },
        'minecraft:type_family': { family: [PART_FAMILY, partFamily(bodyId)] },
        'minecraft:collision_box': { width: w, height: h },
        'minecraft:physics': { has_gravity: false, has_collision: false },
        'minecraft:pushable': { is_pushable: false, is_pushable_by_piston: false },
        'minecraft:knockback_resistance': { value: 1 },
        'minecraft:fire_immune': {},
        'minecraft:persistent': {},
        'minecraft:damage_sensor': { triggers: IMMUNE.map((cause) => ({ cause, deals_damage: 'no' })) },
      },
      events: {
        'minecraft:entity_spawned': { add: { component_groups: ['hakomc:part_active'] } },
        [PART_BREAK_EVENT]: { add: { component_groups: ['hakomc:part_broken'] }, remove: { component_groups: ['hakomc:part_active'] } },
        [PART_RESTORE_EVENT]: { add: { component_groups: ['hakomc:part_active'] }, remove: { component_groups: ['hakomc:part_broken'] } },
      },
    },
  };
}

/** 本体に足す座席 */
export function bodyRideable(bodyId: string, parts: readonly PartClass[]) {
  return {
    seat_count: parts.length,
    family_types: [partFamily(bodyId)],
    seats: parts.map((p) => ({ position: [...p.options.seat] })),
    interact_text: '',
    pull_in_entities: false,
    crouching_skip_interact: true,
  };
}
