/**
 * 模擬 Entity / Player / Dimension / Block と、1 tick 分の世界の更新。
 *
 * 実機で踏みやすい挙動を、わざと再現している:
 * - setProperty の値は tick の終わりまで getProperty に反映されない
 * - remove / 死亡したエンティティは isValid が false になり、ほとんどのメンバーが例外を投げる
 *   （プレイヤーは死んでも有効なまま）
 * - モブからプレイヤーへの攻撃ダメージは難易度で増減し、ピースフルでは 0
 * - クリエイティブ / スペクテイターのプレイヤーはダメージを受けない
 */
import { state, signals, record, isSolidAt, notImplemented, strict, type Vector3, type Vector2, type EntityTypeDef } from './runtime';

const DEG = Math.PI / 180;
const PLAYER = 'minecraft:player';

function stripNs(id: string) {
  return id.startsWith('minecraft:') ? id : `minecraft:${id}`;
}

export class MockEffect {
  constructor(readonly typeId: string, public duration: number, readonly amplifier: number) {}
  get displayName() { return this.typeId; }
  get isValid() { return true; }
}

export class HealthComponent {
  static readonly componentId = 'minecraft:health';
  readonly typeId = 'minecraft:health';
  /** @internal */
  constructor(readonly e: MockEntity) {}
  get entity() { return this.e; }
  get isValid() { return this.e.isValid; }
  get currentValue() { this.e._chk(); return this.e._hp; }
  get defaultValue() { return this.e._maxHp; }
  get effectiveMax() { return this.e._maxHp; }
  get effectiveMin() { return 0; }
  setCurrentValue(v: number) { this.e._chk(); this.e._hp = Math.max(0, Math.min(this.e._maxHp, v)); return true; }
  resetToMaxValue() { this.e._chk(); this.e._hp = this.e._maxHp; }
  resetToDefaultValue() { this.resetToMaxValue(); }
  resetToMinValue() { this.e._chk(); this.e._hp = 0; }
}

/** minecraft:movement（属性）。現在の値を変えられる。default は entity JSON の値 */
export class MovementComponent {
  static readonly componentId = 'minecraft:movement';
  readonly typeId = 'minecraft:movement';
  /** @internal */
  constructor(readonly e: MockEntity) {}
  get entity() { return this.e; }
  get isValid() { return this.e.isValid; }
  get currentValue() { this.e._chk(); return this.e._move ?? this.defaultValue; }
  get defaultValue() { return this.e._def.movement ?? 0; }
  get effectiveMax() { return Number.MAX_VALUE; }
  get effectiveMin() { return 0; }
  setCurrentValue(v: number) { this.e._chk(); this.e._move = v; record('movement', { entityId: this.e.id, value: v }); return true; }
  resetToDefaultValue() { this.e._chk(); this.e._move = undefined; record('movement', { entityId: this.e.id, value: this.defaultValue }); }
  resetToMaxValue() { this.resetToDefaultValue(); }
  resetToMinValue() { this.setCurrentValue(0); }
}

export class RideableComponent {
  static readonly componentId = 'minecraft:rideable';
  readonly typeId = 'minecraft:rideable';
  /** @internal */
  constructor(readonly e: MockEntity) {}
  get entity() { return this.e; }
  get isValid() { return this.e.isValid; }
  get seatCount() { return this.e._def.seats?.length ?? 0; }
  getSeats() { return (this.e._def.seats ?? []).map((position) => ({ position: { ...position } })); }
  getRiders() { this.e._chk(); return this.e._riders.filter((r) => r.isValid); }
  addRider(rider: MockEntity) {
    this.e._chk(); rider._chk();
    this.e._riders = this.e._riders.filter((r) => r.isValid);
    if (this.e._riders.includes(rider)) return true;
    if (this.e._riders.length >= this.seatCount) return false;
    rider._vehicle?._riders.splice(rider._vehicle._riders.indexOf(rider), 1);
    this.e._riders.push(rider);
    rider._vehicle = this.e;
    return true;
  }
  ejectRider(rider: MockEntity) {
    const i = this.e._riders.indexOf(rider);
    if (i >= 0) { this.e._riders.splice(i, 1); rider._vehicle = undefined; }
  }
  ejectRiders() {
    for (const r of this.e._riders) r._vehicle = undefined;
    this.e._riders = [];
  }
}

export class RidingComponent {
  static readonly componentId = 'minecraft:riding';
  readonly typeId = 'minecraft:riding';
  /** @internal */
  constructor(readonly e: MockEntity) {}
  get entityRidingOn() { this.e._chk(); return this.e._vehicle; }
  get isValid() { return this.e.isValid; }
}


export class MockEntity {
  readonly id: string;
  readonly typeId: string;
  nameTag = '';
  isSneaking = false;
  _valid = true;
  _loc: Vector3;
  _rot: Vector2 = { x: 0, y: 0 };
  /** getViewDirection は体の向き + この値（実機の「頭だけ先に向く」状態を再現したいとき用） */
  _headYawOffset = 0;
  _vel: Vector3 = { x: 0, y: 0, z: 0 };
  _ground = true;
  _hp: number;
  _maxHp: number;
  _props: Record<string, any>;
  _dyn = new Map<string, any>();
  _tags = new Set<string>();
  _effects = new Map<string, MockEffect>();
  _riders: MockEntity[] = [];
  /** minecraft:movement の現在の値（undefined なら既定の値） */
  _move: number | undefined;
  _vehicle?: MockEntity;
  _dim: MockDimension;
  readonly _def: EntityTypeDef;

  constructor(typeId: string, dim: MockDimension, loc: Vector3) {
    this.id = String(state.nextId++);
    this.typeId = typeId;
    this._dim = dim;
    this._loc = { ...loc };
    this._def = state.types.get(typeId) ?? {};
    this._maxHp = this._def.health ?? 20;
    this._hp = this._maxHp;
    this._props = { ...(this._def.properties ?? {}) };
  }

  /** 無効なエンティティへのアクセスは実機と同じく例外にする */
  _chk() {
    if (!this._valid) throw new Error(`[hakomc/testing] InvalidEntityError: ${this.typeId} (id ${this.id}) はもう存在しない`);
  }

  get isValid() { return this._valid; }
  get location(): Vector3 { this._chk(); return { ...this._loc }; }
  get dimension() { this._chk(); return this._dim; }
  get isOnGround() { this._chk(); return this._def.physics ? this._ground : true; }
  get isInWater() { return false; }
  get isSwimming() { return false; }
  get isFalling() { this._chk(); return !!this._def.physics && !this._ground && this._vel.y < 0; }
  get scoreboardIdentity() { return undefined; }

  getRotation(): Vector2 { this._chk(); return { ...this._rot }; }
  setRotation(r: Vector2) { this._chk(); this._rot = { x: r.x, y: r.y }; }
  getViewDirection(): Vector3 {
    this._chk();
    const yaw = (this._rot.y + this._headYawOffset) * DEG, pitch = this._rot.x * DEG;
    return { x: -Math.sin(yaw) * Math.cos(pitch), y: -Math.sin(pitch), z: Math.cos(yaw) * Math.cos(pitch) };
  }
  getHeadLocation(): Vector3 {
    this._chk();
    const h = this.typeId === PLAYER ? 1.62 : (this._def.collision?.height ?? 1) * 0.85;
    return { x: this._loc.x, y: this._loc.y + h, z: this._loc.z };
  }

  teleport(location: Vector3, opts: { dimension?: MockDimension, rotation?: Vector2, facingLocation?: Vector3, keepVelocity?: boolean } = {}) {
    this._chk();
    if (opts.dimension) this._dim = opts.dimension;
    this._loc = { ...location };
    if (opts.rotation) this._rot = { ...opts.rotation };
    if (opts.facingLocation) {
      const dx = opts.facingLocation.x - location.x, dz = opts.facingLocation.z - location.z;
      this._rot = { x: this._rot.x, y: Math.atan2(-dx, dz) / DEG };
    }
    if (!opts.keepVelocity) this._vel = { x: 0, y: 0, z: 0 };
    record('teleport', { entityId: this.id, location: { ...location } });
  }
  tryTeleport(location: Vector3, opts: any = {}) { this.teleport(location, opts); return true; }

  getVelocity(): Vector3 { this._chk(); return { ...this._vel }; }
  clearVelocity() { this._chk(); this._vel = { x: 0, y: 0, z: 0 }; }
  applyImpulse(v: Vector3) {
    this._chk();
    if (this.typeId === PLAYER) throw new Error('[hakomc/testing] applyImpulse はプレイヤーには使えない（実機と同じ）');
    this._vel = { x: this._vel.x + v.x, y: this._vel.y + v.y, z: this._vel.z + v.z };
    if (v.y > 0) this._ground = false;
    record('impulse', { entityId: this.id, vector: { ...v } });
  }
  applyKnockback(horizontal: { x: number, z: number }, vertical: number) {
    this._chk();
    record('knockback', { entityId: this.id, horizontal: { ...horizontal }, vertical });
  }

  getProperty(name: string) {
    this._chk();
    if (!(name in this._props)) throw new Error(`[hakomc/testing] プロパティ ${name} は ${this.typeId} に定義されていない`);
    return this._props[name];
  }
  /** 実機と同じく、値は tick の終わりに反映される */
  setProperty(name: string, value: boolean | number | string) {
    this._chk();
    if (!(name in this._props)) throw new Error(`[hakomc/testing] プロパティ ${name} は ${this.typeId} に定義されていない`);
    state.pendingProperties.push([this, name, value]);
  }
  resetProperty(name: string) {
    const v = this._def.properties?.[name];
    if (v === undefined) throw new Error(`[hakomc/testing] プロパティ ${name} は ${this.typeId} に定義されていない`);
    this.setProperty(name, v);
    return v;
  }

  getDynamicProperty(key: string) { this._chk(); return this._dyn.get(key); }
  setDynamicProperty(key: string, value?: any) { this._chk(); if (value === undefined) this._dyn.delete(key); else this._dyn.set(key, value); }
  getDynamicPropertyIds() { this._chk(); return [...this._dyn.keys()]; }
  clearDynamicProperties() { this._chk(); this._dyn.clear(); }

  addTag(tag: string) { this._chk(); const had = this._tags.has(tag); this._tags.add(tag); return !had; }
  removeTag(tag: string) { this._chk(); return this._tags.delete(tag); }
  hasTag(tag: string) { this._chk(); return this._tags.has(tag); }
  getTags() { this._chk(); return [...this._tags]; }

  triggerEvent(eventName: string) {
    this._chk();
    record('triggerEvent', { entityId: this.id, eventName });
    const ev = this._def.events?.[eventName];
    if (ev?.setProperty) for (const [k, v] of Object.entries(ev.setProperty)) this.setProperty(k, v);
    signals.worldAfter.dataDrivenEntityTrigger.emit({ entity: this, eventId: eventName, getModifiers: () => [] });
  }

  getComponent(id: string): any {
    this._chk();
    const full = stripNs(id);
    if (full === 'minecraft:health') return new HealthComponent(this);
    if (full === 'minecraft:rideable') return this._def.seats ? new RideableComponent(this) : undefined;
    if (full === 'minecraft:movement') return this._def.movement !== undefined ? new MovementComponent(this) : undefined;
    if (full === 'minecraft:riding') return this._vehicle ? new RidingComponent(this) : undefined;
    return undefined;
  }
  hasComponent(id: string) { return this.getComponent(id) !== undefined; }
  getComponents() { return ['minecraft:health', 'minecraft:rideable', 'minecraft:riding'].map((c) => this.getComponent(c)).filter(Boolean); }

  addEffect(effectType: string | { getName(): string }, duration: number, opts: { amplifier?: number, showParticles?: boolean } = {}) {
    this._chk();
    const id = typeof effectType === 'string' ? effectType : effectType.getName();
    const eff = new MockEffect(stripNs(id), duration, opts.amplifier ?? 0);
    this._effects.set(eff.typeId, eff);
    record('effect', { entityId: this.id, effect: eff.typeId, duration, amplifier: eff.amplifier });
    return eff;
  }
  getEffect(t: string) { this._chk(); return this._effects.get(stripNs(t)); }
  getEffects() { this._chk(); return [...this._effects.values()]; }
  removeEffect(t: string) { this._chk(); return this._effects.delete(stripNs(t)); }

  playAnimation(animationName: string, options: Record<string, any> = {}) {
    this._chk();
    record('animation', { entityId: this.id, animation: animationName, options });
  }
  runCommand(command: string) {
    this._chk();
    record('command', { entityId: this.id, command });
    return { successCount: 1 };
  }

  applyDamage(amount: number, opts: { cause?: string, damagingEntity?: MockEntity, damagingProjectile?: MockEntity } = {}) {
    this._chk();
    return dealDamage(this, amount, opts, false);
  }
  kill() {
    this._chk();
    dealDamage(this, this._hp + 1e9, { cause: 'selfDestruct' }, true);
    return true;
  }
  remove() {
    if (!this._valid) return;
    // 実機と同じく、消える直前（まだ読める状態）に beforeEvents.entityRemove が来る
    signals.worldBefore.entityRemove.emit({ removedEntity: this });
    this._valid = false;
    state.entities.delete(this.id);
    for (const r of this._riders) r._vehicle = undefined;
    this._vehicle?._riders.splice(this._vehicle._riders.indexOf(this), 1);
    signals.worldAfter.entityRemove.emit({ removedEntityId: this.id, typeId: this.typeId });
  }
  matches() { return notImplemented('Entity.matches'); }
}

export class MockPlayer extends MockEntity {
  name: string;
  _gameMode = 'Survival';
  _dead = false;
  _input = new Map<number, boolean>();
  constructor(name: string, dim: MockDimension, loc: Vector3) {
    super(PLAYER, dim, loc);
    this.name = name;
    this.nameTag = name;
  }
  getGameMode() { return this._gameMode; }
  setGameMode(mode?: string) { this._gameMode = mode ?? 'Survival'; record('gameMode', { entityId: this.id, mode: this._gameMode }); }
  sendMessage(message: any) { record('message', { entityId: this.id, message }); }
  playSound(soundId: string, options: Record<string, any> = {}) { record('sound', { entityId: this.id, soundId, options }); }
  get camera() {
    return strict({
      setCamera: (preset: string, options?: any) => { record('camera', { entityId: this.id, action: 'set', preset, options }); },
      clear: () => { record('camera', { entityId: this.id, action: 'clear' }); },
      fade: (options?: any) => { record('camera', { entityId: this.id, action: 'fade', options }); },
      setFov: (options?: any) => { record('camera', { entityId: this.id, action: 'fov', options }); },
      isValid: true,
    }, 'Camera');
  }
  get inputPermissions() {
    return strict({
      setPermissionCategory: (category: number, enabled: boolean) => { this._input.set(category, enabled); record('input', { entityId: this.id, category, enabled }); },
      isPermissionCategoryEnabled: (category: number) => this._input.get(category) ?? true,
    }, 'PlayerInputPermissions');
  }
  get onScreenDisplay() {
    return strict({
      setActionBar: (text: any) => { record('actionBar', { entityId: this.id, text }); },
      setTitle: (title: any, options?: any) => { record('title', { entityId: this.id, title, options }); },
      updateSubtitle: (subtitle: any) => { record('subtitle', { entityId: this.id, subtitle }); },
      isValid: true,
    }, 'ScreenDisplay');
  }
}

/** 実機のダメージ処理の流れ（割り込みイベント → 体力 → 被弾イベント → 死亡）を再現する */
export function dealDamage(target: MockEntity, amount: number, opts: { cause?: string, damagingEntity?: MockEntity, damagingProjectile?: MockEntity }, force: boolean): boolean {
  const isPlayer = target instanceof MockPlayer;
  if (isPlayer && !force && (target._gameMode === 'Creative' || target._gameMode === 'Spectator')) return false;
  if (isPlayer && target._dead) return false;
  let damage = amount;
  const src = opts.damagingEntity;
  if (isPlayer && src && src.typeId !== PLAYER && (opts.cause ?? 'entityAttack') === 'entityAttack') {
    damage = scaleByDifficulty(damage);
  }
  const damageSource = { cause: opts.cause ?? (src ? 'entityAttack' : 'none'), damagingEntity: src, damagingProjectile: opts.damagingProjectile };
  const before = { hurtEntity: target, damage, damageSource, cancel: false };
  signals.worldBefore.entityHurt.emit(before);
  if (before.cancel) { record('damageCancelled', { entityId: target.id, damage, by: src?.typeId }); return false; }
  damage = before.damage;
  if (damage <= 0 && !force) return false;
  target._hp = Math.max(0, target._hp - damage);
  record('damage', { entityId: target.id, damage, by: src?.typeId, cause: damageSource.cause });
  // 死ぬかどうかは、ダメージの時点で決まる（実機では after イベントは後から届くので、
  // その中で体力を戻しても死亡は取り消せない）
  const dies = target._hp <= 0;
  signals.worldAfter.entityHurt.emit({ hurtEntity: target, damage, damageSource });
  if (dies) {
    target._hp = 0;
    if (isPlayer) {
      target._dead = true;
      signals.worldAfter.entityDie.emit({ deadEntity: target, damageSource });
    } else {
      // 死亡通知の時点でエンティティはもう無効（実機でデータを読めずに困る点を再現）
      target._valid = false;
      state.entities.delete(target.id);
      for (const r of target._riders) r._vehicle = undefined;
      target._vehicle?._riders.splice(target._vehicle._riders.indexOf(target), 1);
      signals.worldAfter.entityDie.emit({ deadEntity: target, damageSource });
    }
  }
  return true;
}

function scaleByDifficulty(d: number) {
  switch (state.difficulty) {
    case 'Peaceful': return 0;
    case 'Easy': return Math.min(d, d / 2 + 1);
    case 'Hard': return d * 1.5;
    default: return d;
  }
}

export class MockBlock {
  constructor(readonly dimension: MockDimension, readonly location: Vector3, readonly typeId: string) {}
  get isAir() { return this.typeId === 'minecraft:air'; }
  get isLiquid() { return this.typeId.includes('water') || this.typeId.includes('lava'); }
  get isSolid() { return !this.isAir && !this.isLiquid; }
  get isValid() { return true; }
  get x() { return this.location.x; }
  get y() { return this.location.y; }
  get z() { return this.location.z; }
}

const QUERY_KEYS = new Set(['type', 'excludeTypes', 'families', 'excludeFamilies', 'tags', 'excludeTags', 'name', 'excludeNames',
  'location', 'maxDistance', 'minDistance', 'closest', 'farthest', 'gameMode', 'excludeGameModes']);

export class MockDimension {
  constructor(readonly id: string) {}
  get heightRange() { return { min: -64, max: 320 }; }

  getEntities(q: Record<string, any> = {}): MockEntity[] {
    for (const k of Object.keys(q)) if (!QUERY_KEYS.has(k) && q[k] !== undefined) notImplemented(`EntityQueryOptions.${k}`);
    const fam = (e: MockEntity) => e._def.families ?? [];
    let list = [...state.entities.values()].filter((e: MockEntity) => {
      if (e._dim !== this || !e._valid) return false;
      if (q.type && stripNs(q.type) !== e.typeId && q.type !== e.typeId) return false;
      if (q.excludeTypes?.some((t: string) => stripNs(t) === e.typeId || t === e.typeId)) return false;
      if (q.families && !q.families.every((f: string) => fam(e).includes(f))) return false;
      if (q.excludeFamilies?.some((f: string) => fam(e).includes(f))) return false;
      if (q.tags && !q.tags.every((t: string) => e._tags.has(t))) return false;
      if (q.excludeTags?.some((t: string) => e._tags.has(t))) return false;
      if (q.name !== undefined && e.nameTag !== q.name) return false;
      if (q.excludeNames?.includes(e.nameTag)) return false;
      const gm = e instanceof MockPlayer ? e._gameMode : undefined;
      if (q.gameMode && gm !== q.gameMode) return false;
      if (q.excludeGameModes && gm && q.excludeGameModes.includes(gm)) return false;
      if (q.location) {
        const d = Math.hypot(e._loc.x - q.location.x, e._loc.y - q.location.y, e._loc.z - q.location.z);
        if (q.maxDistance !== undefined && d > q.maxDistance) return false;
        if (q.minDistance !== undefined && d < q.minDistance) return false;
      }
      return true;
    }) as MockEntity[];
    if (q.location && (q.closest || q.farthest)) {
      const d = (e: MockEntity) => Math.hypot(e._loc.x - q.location.x, e._loc.y - q.location.y, e._loc.z - q.location.z);
      list.sort((a, b) => d(a) - d(b));
      if (q.farthest) list = list.reverse().slice(0, q.farthest);
      else list = list.slice(0, q.closest);
    }
    return list;
  }
  getPlayers(q: Record<string, any> = {}): MockPlayer[] {
    return this.getEntities({ ...q, type: PLAYER }) as MockPlayer[];
  }
  spawnEntity(identifier: string, location: Vector3): MockEntity {
    const typeId = identifier.includes(':') ? identifier : `minecraft:${identifier}`;
    const e = new MockEntity(typeId, this, location);
    state.entities.set(e.id, e);
    record('spawn', { entityId: e.id, typeId, location: { ...location } });
    signals.worldAfter.entitySpawn.emit({ entity: e, cause: 'Spawned' });
    return e;
  }
  getBlock(location: Vector3) {
    const key = `${Math.floor(location.x)},${Math.floor(location.y)},${Math.floor(location.z)}`;
    const t = state.blocks.get(key) ?? (isSolidAt(location) ? 'minecraft:stone' : 'minecraft:air');
    return new MockBlock(this, { x: Math.floor(location.x), y: Math.floor(location.y), z: Math.floor(location.z) }, t);
  }
  setBlockType(location: Vector3, typeId: string) {
    state.blocks.set(`${Math.floor(location.x)},${Math.floor(location.y)},${Math.floor(location.z)}`, stripNs(typeId));
  }
  spawnParticle(effectName: string, location: Vector3) { record('particle', { dimension: this.id, effectName, location: { ...location } }); }
  playSound(soundId: string, location: Vector3, options: Record<string, any> = {}) { record('sound', { dimension: this.id, soundId, location: { ...location }, options }); }
  runCommand(command: string) { record('command', { dimension: this.id, command }); return { successCount: 1 }; }
}

/** 1 tick 分、世界（物理と乗り物）を進める。スクリプトのタイマーより前に呼ぶ */
export function stepPhysics() {
  for (const e of state.entities.values() as Iterable<MockEntity>) {
    if (!e._valid || !e._def.physics || e._vehicle) continue;
    if (e._ground && e._vel.y <= 0) {
      e._loc.x += e._vel.x; e._loc.z += e._vel.z;
      e._vel.x *= 0.546; e._vel.z *= 0.546; e._vel.y = 0;
      if (!isSolidAt({ x: e._loc.x, y: e._loc.y - 0.01, z: e._loc.z }) && e._loc.y > state.groundY) e._ground = false;
      continue;
    }
    e._ground = false;
    e._loc.x += e._vel.x; e._loc.y += e._vel.y; e._loc.z += e._vel.z;
    e._vel.x *= 0.91; e._vel.z *= 0.91; e._vel.y = (e._vel.y - 0.08) * 0.98;
    const floor = Math.max(state.groundY, isSolidAt({ x: e._loc.x, y: e._loc.y - 0.01, z: e._loc.z }) ? Math.floor(e._loc.y) : -Infinity);
    if (e._vel.y <= 0 && e._loc.y <= floor) {
      e._loc.y = floor; e._ground = true; e._vel = { x: 0, y: 0, z: 0 };
      record('landed', { entityId: e.id, location: { ...e._loc } });
    }
  }
  // 座席: 乗り物の体の向きで回した位置に乗客を置く
  for (const v of state.entities.values() as Iterable<MockEntity>) {
    if (!v._valid || !v._def.seats) continue;
    v._riders.forEach((r, i) => {
      const s = v._def.seats![i];
      if (!s || !r._valid) return;
      const a = v._rot.y * DEG, c = Math.cos(a), sn = Math.sin(a);
      r._loc = { x: v._loc.x + s.x * c - s.z * sn, y: v._loc.y + s.y, z: v._loc.z + s.x * sn + s.z * c };
    });
  }
}

/** tick の終わりに setProperty の値を反映する */
export function flushProperties() {
  for (const [e, k, v] of state.pendingProperties.splice(0)) if (e._valid) e._props[k] = v;
}
