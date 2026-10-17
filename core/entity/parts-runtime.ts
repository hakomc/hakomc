/**
 * 部位（part.ts）の実行時の処理。runtime.ts から呼ばれる。
 *
 * - 本体が出現・読み込まれたら、部位を決まった順番で座席に乗せる（足りなければ出し、余れば消す）
 * - 部位へのダメージを本体に伝え、部位の体力を減らし、壊す
 * - 本体が死んだら部位を消す。本体のいない部位は消す
 */
import { system, world, type Entity, type EntityHurtAfterEvent } from '@minecraft/server';
import { registry, type Entry, type HookTarget } from './registry';
import { PART_BREAK_EVENT, PART_FAMILY, PART_RESTORE_EVENT, partTypeId, type PartClass } from './part';

/** 部位の状態と操作 */
export interface PartHandle {
  /** 部位のエンティティ（まだ出ていない・読み込まれていないときは undefined） */
  readonly entity: Entity | undefined;
  /** 残りの体力（health を決めていない部位は undefined） */
  readonly health: number | undefined;
  readonly maxHealth: number | undefined;
  /** 壊れているか */
  readonly broken: boolean;
  /** 壊す（onPartBreak が呼ばれる） */
  break(): void;
  /** 壊れた部位を戻し、体力を満タンにする（onPartRestore が呼ばれる） */
  restore(): void;
}

/** 部位の体力は本体のダイナミックプロパティに保存する（読み込み直しても残るように） */
const HP_KEY = 'hakomc:parts';

const partEntities = new WeakMap<HookTarget, Map<string, Entity>>();

interface Owner extends HookTarget {
  onPartHurt?(part: PartClass, damage: number, ev: EntityHurtAfterEvent): void;
  onPartBreak?(part: PartClass): void;
  onPartRestore?(part: PartClass): void;
}

const partsOf = (entry: Entry) => (entry.cls.definition as { parts?: readonly PartClass[] }).parts ?? [];

function readHp(body: Entity): Record<string, number> {
  try {
    const raw = body.getDynamicProperty(HP_KEY);
    return typeof raw === 'string' ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeHp(body: Entity, hp: Record<string, number>) {
  body.setDynamicProperty(HP_KEY, JSON.stringify(hp));
}

export function partHandle(owner: Owner, part: PartClass): PartHandle {
  const max = part.options.health;
  const body = owner.entity;
  const hpOf = () => (max === undefined ? undefined : readHp(body)[part.id] ?? max);
  return {
    get entity() {
      const e = partEntities.get(owner)?.get(part.id);
      return e && isValid(e) ? e : undefined;
    },
    get health() { return hpOf(); },
    get maxHealth() { return max; },
    get broken() { return max !== undefined && (hpOf() ?? 1) <= 0; },
    break() {
      if (max === undefined) throw new Error(`[hakomc/entity] 部位 ${part.id} には health が無いので壊せない`);
      if ((hpOf() ?? 1) <= 0) return;
      writeHp(body, { ...readHp(body), [part.id]: 0 });
      applyBroken(owner, part, true);
      owner.onPartBreak?.(part);
    },
    restore() {
      if (max === undefined) return;
      const wasBroken = (hpOf() ?? 1) <= 0;
      const hp = readHp(body);
      delete hp[part.id];
      writeHp(body, hp);
      if (wasBroken) {
        applyBroken(owner, part, false);
        owner.onPartRestore?.(part);
      }
    },
  };
}

function applyBroken(owner: HookTarget, part: PartClass, broken: boolean) {
  const e = partEntities.get(owner)?.get(part.id);
  if (e && isValid(e)) e.triggerEvent(broken ? PART_BREAK_EVENT : PART_RESTORE_EVENT);
}

const isValid = (e: Entity | undefined) => {
  try {
    return !!e?.isValid;
  } catch {
    return false;
  }
};

/** 部位のエンティティの種類から、本体の登録と部位を探す */
function findPart(typeId: string): { entry: Entry, part: PartClass } | undefined {
  for (const entry of registry().values()) {
    for (const part of partsOf(entry)) if (partTypeId(entry.cls.id, part) === typeId) return { entry, part };
  }
  return undefined;
}

/**
 * 部位を決まった順番で座席に乗せる。
 * 座席は「乗っている順番」で決まるので、順番が違えば全員降ろして乗せ直す。
 */
export function syncParts(entry: Entry, owner: HookTarget): void {
  const parts = partsOf(entry);
  if (!parts.length) return;
  const body = owner.entity;
  const rideable = body.getComponent('minecraft:rideable');
  if (!rideable) return;
  const wanted = parts.map((p) => partTypeId(entry.cls.id, p));
  const riders = rideable.getRiders();
  const inOrder = riders.length === wanted.length && riders.every((r, i) => r.typeId === wanted[i]);
  const map = new Map<string, Entity>();
  if (inOrder) {
    parts.forEach((p, i) => map.set(p.id, riders[i]));
  } else {
    // 今乗っている部位は、降ろして使い回す
    const pool = new Map<string, Entity[]>();
    for (const r of riders) {
      rideable.ejectRider(r);
      if (wanted.includes(r.typeId)) pool.set(r.typeId, [...(pool.get(r.typeId) ?? []), r]);
    }
    parts.forEach((p, i) => {
      const e = pool.get(wanted[i])?.shift() ?? body.dimension.spawnEntity(wanted[i], body.location);
      rideable.addRider(e);
      map.set(p.id, e);
    });
    for (const extra of [...pool.values()].flat()) extra.remove();
  }
  partEntities.set(owner, map);
  // 壊れた部位は、当たり判定を小さくしておく（新しく出した部位は、出した時点では壊れていない見た目のため）
  const hp = readHp(body);
  for (const p of parts) if (p.options.health !== undefined && (hp[p.id] ?? p.options.health) <= 0) applyBroken(owner, p, true);
}

/** 本体が死んだら、部位を消す */
export function removeParts(owner: HookTarget): void {
  for (const e of partEntities.get(owner)?.values() ?? []) {
    if (isValid(e)) e.remove();
  }
  partEntities.delete(owner);
}

/**
 * 部位へのダメージを本体に伝える。部位のダメージでなければ false
 * @param ensureOwner 本体のオブジェクトを得る（runtime.ts の ensure）
 */
export function handlePartHurt(ev: EntityHurtAfterEvent, ensureOwner: (entry: Entry, body: Entity) => HookTarget): boolean {
  let typeId: string;
  try {
    typeId = ev.hurtEntity.typeId;
  } catch {
    return false;
  }
  const found = findPart(typeId);
  if (!found) return false;
  const { entry, part } = found;
  const partEntity = ev.hurtEntity;
  // 部位自体は減らさない
  partEntity.getComponent('minecraft:health')?.resetToMaxValue();
  const body = partEntity.getComponent('minecraft:riding')?.entityRidingOn;
  if (!body || body.typeId !== entry.cls.id) return true;
  const src = ev.damageSource;
  const attacker = src.damagingEntity;
  // 本体自身や、同じ本体の部位からのダメージは伝えない
  if (attacker && (attacker.id === body.id || attacker.getComponent('minecraft:riding')?.entityRidingOn?.id === body.id)) return true;
  const causes = part.options.causes ?? ['entityAttack', 'projectile'];
  if (!causes.includes(src.cause)) return true;
  const owner = ensureOwner(entry, body) as Owner;
  const handle = partHandle(owner, part);
  if (handle.broken) return true;
  const dealt = ev.damage * (part.options.damageMultiplier ?? 1);
  body.applyDamage(dealt, { cause: src.cause, ...(attacker ? { damagingEntity: attacker } : {}) });
  owner.onPartHurt?.(part, dealt, ev);
  const max = part.options.health;
  if (max !== undefined && isValid(body)) {
    const hp = readHp(body);
    const left = (hp[part.id] ?? max) - ev.damage;
    if (left <= 0) handle.break();
    else writeHp(body, { ...hp, [part.id]: left });
  }
  return true;
}

/** 部位が死んだ・消えたら、次の tick に本体の座席を直す（新しい部位を出す） */
export function handlePartGone(typeId: string, ensureOwner: (entry: Entry, body: Entity) => HookTarget): boolean {
  const found = findPart(typeId);
  if (!found) return false;
  system.run(() => {
    for (const obj of found.entry.instances.values()) {
      const e = partEntities.get(obj)?.get(found.part.id);
      if (!e || !isValid(e)) {
        if (isValid(obj.entity)) syncParts(found.entry, ensureOwner(found.entry, obj.entity));
      }
    }
  });
  return true;
}

const DIMENSIONS = ['overworld', 'nether', 'the_end'];
/** 前回の見回りで、本体がいなかった部位 */
let orphans = new Set<string>();

/** 本体のいない部位を消す。読み込みの途中で一瞬ひとりになることがあるので、2 回続けて見つかったものだけ消す */
export function sweepOrphanParts(): void {
  const next = new Set<string>();
  for (const dim of DIMENSIONS) {
    let found: Entity[] = [];
    try {
      found = world.getDimension(dim).getEntities({ families: [PART_FAMILY] });
    } catch {
      continue;
    }
    for (const e of found) {
      const info = findPart(e.typeId);
      // ここで register() されていない本体の部位（別のパックのものなど）には触らない
      if (!info) continue;
      const vehicle = e.getComponent('minecraft:riding')?.entityRidingOn;
      if (vehicle && vehicle.typeId === info.entry.cls.id) continue;
      if (orphans.has(e.id)) e.remove();
      else next.add(e.id);
    }
  }
  orphans = next;
}
