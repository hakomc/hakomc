import { beforeEach, describe, expect, it } from 'vitest';
import { CustomCommandStatus, type Player } from '@minecraft/server';
import { sim } from '../../../core/testing';
import { BoolProperty, EnumProperty, Part, entity, health, type Steps } from '../../../core/entity';
import { registry } from '../../../core/entity/registry';

const log: string[] = [];

class Mode extends EnumProperty('mode', ['calm', 'angry'], 'calm') {}
class Flag extends BoolProperty('flag', false) {}
class Horn extends Part('horn', { seat: [0, 2, 1.2], size: [0.5, 0.5], health: 10 }) {}

class Beast extends entity('cmd:beast', { properties: [Mode, Flag], parts: [Horn], components: [health({ value: 50, max: 50 })] }) {
  roar = this.timeline(this.roarSteps, { lane: 'attack' });
  *roarSteps(t: Steps, target?: Player) {
    log.push(`roar:${target?.name ?? '-'}`);
    yield* t.wait(10);
    log.push('roar-done');
  }
}
Beast.register();
Beast.command('enrage', (b, ctx) => {
  b.set(Mode, 'angry');
  log.push(`enrage by ${ctx.player?.name ?? '-'}`);
});

/** timeline も部位もない種類（run / part の対象にならない） */
class Pebble extends entity('cmd:pebble', { components: [health({ value: 5 })] }) {}
Pebble.register();

let player: Player;
beforeEach(() => {
  sim.reset();
  log.length = 0;
  for (const r of registry().values()) r.instances.clear();
  sim.loadEntityClass(Beast);
  sim.loadEntityClass(Pebble);
  sim.startup();
  player = sim.spawnPlayer('Steve', { x: 0, y: 0, z: 0 });
});

const ok = (r: { status: number }) => expect(r.status).toBe(CustomCommandStatus.Success);
const ng = (r: { status: number }) => expect(r.status).toBe(CustomCommandStatus.Failure);

describe('デバッグ用のコマンド', () => {
  it('起動時に、使えるものだけ登録する。timeline の名前も候補に入る', () => {
    const reg = sim.startup();
    expect([...reg.commands.keys()].sort()).toEqual(['hakomc:do', 'hakomc:info', 'hakomc:part', 'hakomc:prop', 'hakomc:run', 'hakomc:stop']);
    expect(reg.enums.get('hakomc:timeline')).toEqual(['roar']);
    expect(reg.enums.get('hakomc:part')).toEqual(['horn']);
    expect(reg.enums.get('hakomc:prop')).toEqual(['cmd:mode', 'cmd:flag']);
    expect(reg.enums.get('hakomc:command')).toEqual(['enrage']);
  });
  it('/hakomc:info: いちばん近くの個体の状態を見る', () => {
    sim.spawn('cmd:beast', { x: 3, y: 0, z: 0 });
    sim.spawn('cmd:pebble', { x: 1, y: 0, z: 0 });
    const r = sim.command('/hakomc:info', { player });
    ok(r);
    expect(r.message).toMatch(/^Pebble \(\d+\) \| HP 5\/5$/);
    const all = sim.command('/hakomc:info @e[type=cmd:beast]', { player });
    expect(all.message).toMatch(/^Beast \(\d+\) \| HP 50\/50 \| mode=calm flag=false \| timeline: roar \| 部位: horn 10\/10$/);
  });
  it('/hakomc:run: timeline を持つ、いちばん近くの個体で始める。打った人を引数に渡す', () => {
    const b = sim.spawn('cmd:beast', { x: 5, y: 0, z: 0 });
    sim.spawn('cmd:pebble', { x: 1, y: 0, z: 0 });
    ok(sim.command('/hakomc:run roar', { player }));
    expect(log).toEqual([]);   // 実行は次の tick（カスタムコマンドの中では世界を変更できないため）
    sim.tick();
    expect(log).toEqual(['roar:Steve']);
    expect(Beast.of(b).roar.running).toBe(true);
    // 動いていれば止めてやり直す
    sim.command('/hakomc:run roar', { player });
    sim.tick();
    expect(log).toEqual(['roar:Steve', 'roar:Steve']);
    ok(sim.command('/hakomc:stop', { player }));
    sim.tick();
    expect(Beast.of(b).roar.running).toBe(false);
  });
  it('/hakomc:part: 部位を壊す・戻す・無効にする・有効に戻す', () => {
    const b = sim.spawn('cmd:beast', { x: 2, y: 0, z: 0 });
    ok(sim.command('/hakomc:part horn break', { player }));
    sim.tick();
    expect(Beast.of(b).part(Horn).broken).toBe(true);
    sim.command('/hakomc:part horn restore', { player });
    sim.tick();
    expect(Beast.of(b).part(Horn).broken).toBe(false);
    ok(sim.command('/hakomc:part horn disable', { player }));
    sim.tick();
    expect(Beast.of(b).part(Horn).disabled).toBe(true);
    expect(sim.command('/hakomc:info', { player }).message).toMatch(/部位: horn 10\/10 無効$/);
    sim.command('/hakomc:part horn enable', { player });
    sim.tick();
    expect(Beast.of(b).part(Horn).disabled).toBe(false);
  });
  it('/hakomc:prop: プロパティに値を入れる（true / false / 数値 / 文字列）', () => {
    const b = sim.spawn('cmd:beast', { x: 2, y: 0, z: 0 });
    sim.command('/hakomc:prop cmd:mode angry', { player });
    sim.command('/hakomc:prop cmd:flag true', { player });
    sim.tick(2);
    expect(b.getProperty('cmd:mode')).toBe('angry');
    expect(b.getProperty('cmd:flag')).toBe(true);
  });
  it('/hakomc:do: クラスで足したコマンド', () => {
    const b = sim.spawn('cmd:beast', { x: 2, y: 0, z: 0 });
    ok(sim.command('/hakomc:do enrage', { player }));
    sim.tick(2);
    expect(log).toEqual(['enrage by Steve']);
    expect(b.getProperty('cmd:mode')).toBe('angry');
  });
  it('実行する前（次の tick まで）に対象が消えていたら、打った人にチャットで知らせる', () => {
    const b = sim.spawn('cmd:beast', { x: 2, y: 0, z: 0 });
    ok(sim.command('/hakomc:run roar', { player }));
    b.remove();
    sim.tick();
    expect(log).toEqual([]);
    expect(sim.logs('message').map((l) => l.message)).toEqual(['§c[hakomc] 対象が、実行する前に消えていた（何もしていない）']);
  });
  it('対象がいなければ失敗を返す（32 ブロックより遠い個体は対象にならない）', () => {
    sim.spawn('cmd:beast', { x: 40, y: 0, z: 0 });
    ng(sim.command('/hakomc:info', { player }));
    ng(sim.command('/hakomc:run roar', { player }));
    sim.spawn('cmd:pebble', { x: 1, y: 0, z: 0 });
    // 近くにいても、その timeline を持っていなければ対象にしない
    ng(sim.command('/hakomc:run roar', { player }));
  });
});
