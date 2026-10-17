import { beforeEach, describe, expect, it, vi } from 'vitest';
import { world, system, Player, EntityDamageCause, GameMode, InputPermissionCategory, ItemStack } from '@minecraft/server';
import { sim } from '@/testing';

beforeEach(() => sim.reset({ all: true }));

describe('import できる名前', () => {
  it('enum・定数・クラス名が全部そろっている', () => {
    expect(EntityDamageCause.entityAttack).toBe('entityAttack');
    expect(GameMode.Creative).toBe('Creative');
    expect(InputPermissionCategory.Movement).toBe(2);
  });
  it('未実装のクラスは生成したときに分かりやすく失敗する', () => {
    expect(() => new (ItemStack as any)('minecraft:stone')).toThrow(/ItemStack は模擬環境に未実装/);
  });
  it('未実装のメンバーは undefined ではなく例外になる', () => {
    expect(() => (world as any).getMoonPhase()).toThrow(/world.getMoonPhase は模擬環境に未実装/);
  });
});

describe('エンティティプロパティ', () => {
  it('setProperty の値は tick の終わりまで読めない（実機と同じ）', () => {
    sim.defineEntityType('t:mob', { properties: { 't:rage': false } });
    const e = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    e.setProperty('t:rage', true);
    expect(e.getProperty('t:rage')).toBe(false);
    sim.tick();
    expect(e.getProperty('t:rage')).toBe(true);
  });
  it('ダイナミックプロパティはすぐ読める', () => {
    const e = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    e.setDynamicProperty('k', 3);
    expect(e.getDynamicProperty('k')).toBe(3);
  });
  it('定義していないプロパティは例外', () => {
    const e = sim.spawn('t:none', { x: 0, y: 0, z: 0 });
    expect(() => e.getProperty('t:x')).toThrow(/定義されていない/);
  });
});

describe('ダメージと死亡', () => {
  it('死亡通知の時点でエンティティは無効になっている', () => {
    sim.defineEntityType('t:mob', { health: 5 });
    const e = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    const seen: any[] = [];
    world.afterEvents.entityDie.subscribe((ev) => {
      seen.push({ valid: ev.deadEntity.isValid, typeId: ev.deadEntity.typeId });
      expect(() => ev.deadEntity.getDynamicProperty('x')).toThrow(/InvalidEntityError/);
    });
    e.applyDamage(10);
    expect(seen).toEqual([{ valid: false, typeId: 't:mob' }]);
  });
  it('プレイヤーは死んでも有効なまま、respawn で戻る', () => {
    const p = sim.spawnPlayer('Steve');
    const spawns = vi.fn();
    world.afterEvents.playerSpawn.subscribe(spawns);
    p.applyDamage(100);
    expect(p.isValid).toBe(true);
    expect(p.getComponent('health')!.currentValue).toBe(0);
    sim.respawn(p);
    expect(spawns).toHaveBeenCalledWith({ player: p, initialSpawn: false });
  });
  it('モブの攻撃は難易度で変わり、ピースフルでは 0', () => {
    const p = sim.spawnPlayer('Steve');
    const mob = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    sim.setDifficulty('Peaceful');
    expect(p.applyDamage(6, { cause: EntityDamageCause.entityAttack, damagingEntity: mob })).toBe(false);
    sim.setDifficulty('Hard');
    p.applyDamage(4, { cause: EntityDamageCause.entityAttack, damagingEntity: mob });
    expect(p.getComponent('health')!.currentValue).toBe(14);
  });
  it('クリエイティブのプレイヤーはダメージを受けない', () => {
    const p = sim.spawnPlayer('Steve', undefined, { gameMode: 'Creative' });
    expect(p.applyDamage(5)).toBe(false);
  });
  it('beforeEvents.entityHurt で取り消し・ダメージ変更ができる', () => {
    const p = sim.spawnPlayer('Steve');
    const mob = sim.spawn('t:boss', { x: 0, y: 0, z: 0 });
    world.beforeEvents.entityHurt.subscribe((ev) => {
      if (ev.damageSource.damagingEntity?.typeId === 't:boss') ev.cancel = true;
    });
    expect(sim.hurt(p, 0, { damagingEntity: mob })).toBe(false);
    expect(sim.logs('damageCancelled')).toHaveLength(1);
  });
});

describe('タイマー', () => {
  it('runTimeout / runInterval / clearRun', () => {
    const calls: string[] = [];
    system.runTimeout(() => calls.push(`timeout@${system.currentTick}`), 3);
    const id = system.runInterval(() => calls.push(`interval@${system.currentTick}`), 2);
    sim.tick(4);
    system.clearRun(id);
    sim.tick(4);
    expect(calls).toEqual(['interval@2', 'timeout@3', 'interval@4']);
  });
  it('await を含むコードは tickAsync で進める', async () => {
    let done = false;
    (async () => { await system.waitTicks(5); done = true; })();
    await sim.tickAsync(4);
    expect(done).toBe(false);
    await sim.tickAsync(1);
    expect(done).toBe(true);
  });
  it('タイマー内の例外は tick() から投げ直される', () => {
    system.runTimeout(() => { throw new Error('boom'); }, 1);
    expect(() => sim.tick()).toThrow(/timer#\d+ で例外: boom/);
  });
  it('reset() はスクリプトの runInterval を残す', () => {
    const fn = vi.fn();
    system.runInterval(fn, 1);
    sim.reset();
    sim.tick(3);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe('ディメンション', () => {
  it('getEntities の距離・closest・ゲームモードの絞り込み', () => {
    const a = sim.spawnPlayer('A', { x: 1, y: 0, z: 0 });
    sim.spawnPlayer('B', { x: 5, y: 0, z: 0 }, { gameMode: 'Creative' });
    const c = sim.spawnPlayer('C', { x: 9, y: 0, z: 0 });
    const d = sim.dimension();
    expect(d.getPlayers({ location: { x: 0, y: 0, z: 0 }, maxDistance: 6 }).map((p) => p.name)).toEqual(['A', 'B']);
    expect(d.getPlayers({ location: { x: 10, y: 0, z: 0 }, closest: 1, excludeGameModes: [GameMode.Creative] })[0]).toBe(c);
    expect(d.getPlayers({ location: { x: 0, y: 0, z: 0 }, closest: 1 })[0]).toBe(a);
  });
  it('対応していない絞り込み条件は例外', () => {
    expect(() => sim.dimension().getEntities({ scoreOptions: [] } as any)).toThrow(/EntityQueryOptions.scoreOptions/);
  });
});

describe('乗り物と物理', () => {
  it('座席の乗客は乗り物の向きに合わせて回る', () => {
    sim.defineEntityType('t:vehicle', { seats: [{ x: 0, y: 1, z: 2 }] });
    const v = sim.spawn('t:vehicle', { x: 0, y: 0, z: 0 });
    const r = sim.spawn('t:rider', { x: 0, y: 0, z: 0 });
    expect(v.getComponent('rideable')!.addRider(r)).toBe(true);
    v.setRotation({ x: 0, y: 90 });
    sim.tick();
    expect(r.location.x).toBeCloseTo(-2);
    expect(r.location.z).toBeCloseTo(0);
    expect(r.getComponent('riding')!.entityRidingOn).toBe(v);
  });
  it('跳ばせると放物線を描いて着地する', () => {
    sim.setGround(0);
    sim.defineEntityType('t:jumper', { physics: true });
    const e = sim.spawn('t:jumper', { x: 0, y: 0, z: 0 });
    e.applyImpulse({ x: 0.5, y: 0.6, z: 0 });
    expect(e.isOnGround).toBe(false);
    sim.tickUntil(() => e.isOnGround, 100);
    expect(e.location.y).toBe(0);
    expect(e.location.x).toBeGreaterThan(3);
    expect(sim.logs('landed')).toHaveLength(1);
  });
  it('プレイヤーに applyImpulse はできない（実機と同じ）', () => {
    const p = sim.spawnPlayer();
    expect(() => p.applyImpulse({ x: 0, y: 1, z: 0 })).toThrow();
  });
});

describe('イベント', () => {
  it('triggerEvent は dataDrivenEntityTrigger を発火し、entity JSON の set_property を反映する', () => {
    const id = sim.loadEntityJson({
      'minecraft:entity': {
        description: { identifier: 't:json', properties: { 't:on': { type: 'bool', default: false } } },
        components: { 'minecraft:health': { value: 40, max: 40 } },
        events: { 't:turn_on': { set_property: { 't:on': true } } },
      },
    });
    const e = sim.spawn(id, { x: 0, y: 0, z: 0 });
    const seen = vi.fn();
    world.afterEvents.dataDrivenEntityTrigger.subscribe((ev) => seen(ev.eventId));
    sim.entityEvent(e, 't:turn_on');
    sim.tick();
    expect(seen).toHaveBeenCalledWith('t:turn_on');
    expect(e.getProperty('t:on')).toBe(true);
    expect(e.getComponent('health')!.currentValue).toBe(40);
  });
  it('scriptEvent の sourceEntity（/execute as ... run scriptevent）', () => {
    const e = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    const seen = vi.fn();
    system.afterEvents.scriptEventReceive.subscribe((ev) => seen(ev.id, ev.message, ev.sourceEntity));
    sim.scriptEvent('t:go', 'fast', { sourceEntity: e });
    expect(seen).toHaveBeenCalledWith('t:go', 'fast', e);
  });
  it('イベントハンドラ内の例外は呼び出し元に投げ直される', () => {
    system.afterEvents.scriptEventReceive.subscribe(() => { throw new Error('bad'); });
    expect(() => sim.scriptEvent('x:y')).toThrow(/scriptEventReceive で例外: bad/);
  });
});

describe('プレイヤーの画面まわり', () => {
  it('カメラ・入力制限・アクションバーは記録される', () => {
    const p = sim.spawnPlayer();
    p.camera.setCamera('minecraft:third_person');
    p.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, false);
    p.onScreenDisplay.setActionBar('hello');
    expect(sim.logs('camera', { entityId: p.id })[0]).toMatchObject({ action: 'set', preset: 'minecraft:third_person' });
    expect(p.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Movement)).toBe(false);
    expect(sim.logs('actionBar')[0].text).toBe('hello');
  });
  it('Player は本物と同じくクラスなので、prototype の拡張がそのまま効く', () => {
    (Player.prototype as any).greet = function () { return `hi ${this.name}`; };
    expect((sim.spawnPlayer('Alex') as any).greet()).toBe('hi Alex');
  });
});

describe('hakomc 本体との組み合わせ', () => {
  it('hakomc のタイマー（repeating / delayed / sleep）が模擬環境の上で動く', async () => {
    const { repeating, delayed, sleep } = await import('@/timer/timer');
    const seen: string[] = [];
    repeating({ every: 5, max: 15, run: (t) => seen.push(`r${t}`), final: () => seen.push('final') });
    delayed(7, () => seen.push(`d@${sim.tickCount}`));
    (async () => { await sleep(12); seen.push(`slept@${sim.tickCount}`); })();
    await sim.tickAsync(20);
    expect(seen).toContain('d@7');
    expect(seen).toContain('slept@12');
    expect(seen).toContain('final');
  });
  it('頭の向きだけずらして、体の向き基準のコードを確かめられる', () => {
    const e = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    sim.internals(e).headYawOffset = 90;
    expect(e.getRotation().y).toBe(0);
    expect(e.getViewDirection().x).toBeCloseTo(-1);
  });
});

describe('生成したスタブ', () => {
  it('インストールされている @minecraft/server と同じ版から生成されている（古ければ npm run gen:testing）', async () => {
    const { readFileSync } = await import('node:fs');
    const { resolve } = await import('node:path');
    const { STUB_SOURCE_VERSION } = await import('@/testing/generated/serverStubs');
    const installed = JSON.parse(readFileSync(resolve(__dirname, '../../../node_modules/@minecraft/server/package.json'), 'utf8')).version;
    expect(STUB_SOURCE_VERSION).toBe(installed);
  });
});

describe('reset', () => {
  it('reset({ all: true }) はイベント購読を全部消す', () => {
    const fn = vi.fn();
    world.afterEvents.entitySpawn.subscribe(fn);
    system.afterEvents.scriptEventReceive.subscribe(fn);
    world.beforeEvents.entityHurt.subscribe(fn);
    sim.reset({ all: true });
    const e = sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    sim.scriptEvent('t:x');
    e.applyDamage(1);
    expect(fn).not.toHaveBeenCalled();
  });
  it('reset() は購読を残す', () => {
    const fn = vi.fn();
    world.afterEvents.entitySpawn.subscribe(fn);
    sim.reset();
    sim.spawn('t:mob', { x: 0, y: 0, z: 0 });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
