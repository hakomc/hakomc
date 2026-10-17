/**
 * カスタムコマンド（system.beforeEvents.startup の customCommandRegistry）の模擬。
 * sim.startup() で起動時のイベントを出し、sim.command('/name 引数…') で登録されたコマンドを実行する。
 */
import { state, notImplemented } from './runtime';
import type { MockEntity } from './entity';

export interface MockCustomCommand {
  name: string;
  description: string;
  permissionLevel: number;
  cheatsRequired?: boolean;
  mandatoryParameters?: Array<{ name: string, type: string }>;
  optionalParameters?: Array<{ name: string, type: string }>;
}

export class MockCustomCommandRegistry {
  readonly commands = new Map<string, { def: MockCustomCommand, callback: (origin: any, ...args: any[]) => any }>();
  readonly enums = new Map<string, string[]>();
  registerCommand(def: MockCustomCommand, callback: (origin: any, ...args: any[]) => any) {
    if (!def.name.includes(':')) throw new Error(`[hakomc/testing] コマンド名 ${def.name} には名前空間が必要（実機と同じ）`);
    if (this.commands.has(def.name)) throw new Error(`[hakomc/testing] コマンド ${def.name} は登録済み`);
    for (const p of [...(def.mandatoryParameters ?? []), ...(def.optionalParameters ?? [])]) {
      if (p.type === 'Enum' && !this.enums.has(p.name)) throw new Error(`[hakomc/testing] コマンド ${def.name} の引数 ${p.name} の Enum が先に登録されていない`);
    }
    this.commands.set(def.name, { def, callback });
  }
  registerEnum(name: string, values: string[]) {
    if (!values.length) throw new Error(`[hakomc/testing] Enum ${name} が空`);
    this.enums.set(name, [...values]);
  }
}

/** 引数を空白で区切る（"…" と [ … ] の中の空白は区切らない） */
export function tokenize(line: string): string[] {
  const out: string[] = [];
  let cur = '', quote = false, depth = 0;
  for (const ch of line.trim()) {
    if (ch === '"') { quote = !quote; continue; }
    if (!quote && ch === '[') depth++;
    if (!quote && ch === ']') depth--;
    if (ch === ' ' && !quote && depth === 0) {
      if (cur) out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

/** セレクターの簡単な模擬: @s / @e / @e[type=…] / @p */
export function selectEntities(sel: string, source: MockEntity | undefined): MockEntity[] {
  const all = [...state.entities.values()] as MockEntity[];
  if (sel === '@s') return source ? [source] : [];
  const m = /^@([aeprs])(?:\[(.*)\])?$/.exec(sel);
  if (!m) notImplemented(`セレクター ${sel}`);
  const [, kind, args] = m!;
  let list = kind === 'e' ? all : all.filter((e) => e.typeId === 'minecraft:player');
  for (const kv of (args ?? '').split(',').filter(Boolean)) {
    const [k, v] = kv.split('=').map((x) => x.trim());
    if (k === 'type') list = list.filter((e) => e.typeId === (v.includes(':') ? v : `minecraft:${v}`));
    else notImplemented(`セレクターの ${k}=`);
  }
  if (kind === 'p' && source) {
    const l = source._loc;
    list.sort((a, b) => Math.hypot(a._loc.x - l.x, a._loc.z - l.z) - Math.hypot(b._loc.x - l.x, b._loc.z - l.z));
    list = list.slice(0, 1);
  }
  return list;
}
