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
 * - 本体のクラスの partDamage(part, damage) で、部位へのダメージを変えられる（0 で無効）
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
  /**
   * 壊れている間に隠す、本体のモデルのボーン。
   * client_sync のプロパティと、それを見て隠すレンダーコントローラーを自動で作る
   */
  hideBone?: string | readonly string[];
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

/** 部位の見た目: 何も描かない（ボーンだけのモデル） */
export const partGeometryId = (bodyId: string) => `geometry.${bodyId.replace(':', '_')}_part`;

/**
 * 部位のクライアント側の定義と、空のモデル。
 * 見た目の定義が無いエンティティの扱いは環境によって違うことがあるので、
 * 「何も描かない」ことをはっきりさせるために作る。
 */
export function partResourceFiles(bodyId: string, fileName: string, parts: readonly PartClass[]): Record<string, unknown> {
  if (!parts.length) return {};
  const geometry = partGeometryId(bodyId);
  const files: Record<string, unknown> = {
    [`models/entity/${fileName}_part.geo.json`]: {
      format_version: '1.16.0',
      'minecraft:geometry': [{
        description: { identifier: geometry, texture_width: 16, texture_height: 16, visible_bounds_width: 1, visible_bounds_height: 1, visible_bounds_offset: [0, 0.5, 0] },
        bones: [{ name: 'root', pivot: [0, 0, 0] }],
      }],
    },
  };
  for (const part of parts) {
    files[`entity/${fileName}_${part.id}.entity.json`] = {
      format_version: '1.10.0',
      'minecraft:client_entity': {
        description: {
          identifier: partTypeId(bodyId, part),
          materials: { default: 'entity_alphatest' },
          // モデルが空なので描かれない。参照先が無いと警告が出るので、バニラにあるテクスチャを指す
          textures: { default: 'textures/blocks/glass' },
          geometry: { default: geometry },
          render_controllers: ['controller.render.default'],
        },
      },
    };
  }
  return files;
}

/** hideBone を使う部位の「壊れているか」のプロパティ（本体に付く。RP から q.property で読める） */
export const partBrokenProperty = (bodyId: string, part: PartClass) => `${bodyId.split(':')[0]}:part_${part.id}_broken`;

export const hiddenBones = (part: PartClass): readonly string[] => {
  const b = part.options.hideBone;
  return b === undefined ? [] : typeof b === 'string' ? [b] : b;
};

/**
 * 部位の当たり判定が、本体の当たり判定にどれだけ埋まるかを調べる。
 * 当たり判定はどちらも向きを変えない箱で、部位の位置だけが本体の向きに合わせて回るので、15° ごとに確かめる。
 * 攻撃は視線上でいちばん手前の当たり判定に当たるため、埋まった所を狙っても本体に当たってしまう。
 */
export function partOverlapWarnings(bodyId: string, parts: readonly PartClass[], body: { width: number, height: number } | undefined): string[] {
  if (!body) return [];
  const hw = body.width / 2;
  const out: string[] = [];
  for (const part of parts) {
    const [sx, sy, sz] = part.options.seat;
    const [w, h] = part.options.size;
    let worst = 0, worstAngle = 0;
    for (let deg = 0; deg < 360; deg += 15) {
      const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
      const cx = sx * c - sz * s, cz = sx * s + sz * c;
      const ox = Math.max(0, Math.min(cx + w / 2, hw) - Math.max(cx - w / 2, -hw));
      const oz = Math.max(0, Math.min(cz + w / 2, hw) - Math.max(cz - w / 2, -hw));
      const oy = Math.max(0, Math.min(sy + h, body.height) - Math.max(sy, 0));
      const buried = (ox * oz * oy) / (w * w * h);
      if (buried > worst + 1e-9) {
        worst = buried;
        worstAngle = deg;
      }
    }
    if (worst >= 0.5) {
      out.push(`${bodyId}: 部位 ${part.id} の当たり判定が、本体の当たり判定に最大 ${Math.round(worst * 100)}% 埋まる（本体の向き ${worstAngle}°）。埋まった所を狙うと本体に当たるので、座席を外へ出すか、本体の当たり判定を小さくする`);
    }
  }
  return out;
}
