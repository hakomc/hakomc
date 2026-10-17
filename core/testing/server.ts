/**
 * テスト時に `@minecraft/server` の代わりに読み込まれるモジュール。
 *
 * - enum / 定数 / クラス名は型定義から生成したもの（generated/serverStubs.ts）を全て公開する。
 *   未実装のクラスも名前だけは存在するので、import の時点では落ちない。
 * - world / system / Entity / Player / Dimension などは、runtime.ts の共有状態の上で動く。
 */
import { state, signals, strict, type Timer } from './runtime';
import { MockEntity, MockPlayer, MockDimension, MockBlock, MockEffect, HealthComponent, RideableComponent, RidingComponent } from './entity';

export * from './generated/serverStubs';

const dimensions: Record<string, MockDimension> = {
  'minecraft:overworld': new MockDimension('minecraft:overworld'),
  'minecraft:nether': new MockDimension('minecraft:nether'),
  'minecraft:the_end': new MockDimension('minecraft:the_end'),
};

export function getDimension(id: string): MockDimension {
  const key = id.includes(':') ? id : `minecraft:${id}`;
  const d = dimensions[key];
  if (!d) throw new Error(`[hakomc/testing] 不明なディメンション: ${id}`);
  return d;
}

function schedule(fn: () => void, delay: number, every?: number): number {
  const id = state.nextTimerId++;
  state.timers.set(id, { id, at: state.tick + Math.max(1, Math.floor(delay)), every, fn } as Timer);
  return id;
}

export const system = strict({
  get currentTick() { return state.tick; },
  run(fn: () => void) { return schedule(fn, 1); },
  runTimeout(fn: () => void, tickDelay = 1) { return schedule(fn, tickDelay); },
  runInterval(fn: () => void, tickInterval = 1) { return schedule(fn, tickInterval, Math.max(1, Math.floor(tickInterval))); },
  runJob(job: Generator<unknown, unknown, unknown>) {
    const id = state.nextTimerId++;
    state.timers.set(id, { id, at: state.tick + 1, every: 1, fn: () => {}, job });
    return id;
  },
  clearRun(id: number) { state.timers.delete(id); },
  clearJob(id: number) { state.timers.delete(id); },
  waitTicks(ticks: number) { return new Promise<void>((resolve) => { schedule(() => resolve(), ticks); }); },
  afterEvents: signals.systemAfter,
  beforeEvents: signals.systemBefore,
  isEditorWorld: false,
  serverSystemInfo: { memoryTier: 'High' },
}, 'system');

export const world = strict({
  afterEvents: signals.worldAfter,
  beforeEvents: signals.worldBefore,
  getDimension,
  getAllPlayers(): MockPlayer[] {
    return [...state.entities.values()].filter((e) => e instanceof MockPlayer && e._valid) as MockPlayer[];
  },
  getPlayers(q: Record<string, any> = {}): MockPlayer[] {
    return Object.values(dimensions).flatMap((d) => d.getPlayers(q));
  },
  getEntity(id: string): MockEntity | undefined {
    const e = state.entities.get(id);
    return e && e._valid ? e : undefined;
  },
  getDynamicProperty(key: string) { return state.worldDynamic.get(key); },
  setDynamicProperty(key: string, value?: any) { if (value === undefined) state.worldDynamic.delete(key); else state.worldDynamic.set(key, value); },
  getDynamicPropertyIds() { return [...state.worldDynamic.keys()]; },
  clearDynamicProperties() { state.worldDynamic.clear(); },
  getDifficulty() { return state.difficulty; },
  setDifficulty(d: string) { state.difficulty = d; },
  getDefaultSpawnLocation() { return { x: 0, y: 64, z: 0 }; },
  getAbsoluteTime() { return state.tick; },
  getDay() { return Math.floor(state.tick / 24000); },
  getTimeOfDay() { return state.tick % 24000; },
  sendMessage(message: any) {
    for (const p of world.getAllPlayers()) p.sendMessage(message);
  },
}, 'world');

export {
  MockEntity as Entity,
  MockPlayer as Player,
  MockDimension as Dimension,
  MockBlock as Block,
  MockEffect as Effect,
};
export {
  HealthComponent as EntityHealthComponent,
  RideableComponent as EntityRideableComponent,
  RidingComponent as EntityRidingComponent,
};
