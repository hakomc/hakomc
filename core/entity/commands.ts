/**
 * デバッグ用のコマンド（Script API のカスタムコマンド）。register() したクラスがあると、起動時に登録する。
 *
 * | コマンド | |
 * | --- | --- |
 * | `/hakomc:info [対象]` | 状態を見る（体力・プロパティ・動いている timeline・部位） |
 * | `/hakomc:run <timeline> [対象]` | timeline を始める（動いていれば止めてやり直す）。コマンドを打ったプレイヤーを最初の引数に渡す |
 * | `/hakomc:stop [対象]` | timeline を全部止める（対象を省くと、timeline が動いている中でいちばん近くの個体） |
 * | `/hakomc:part <部位> <break / restore> [対象]` | 部位を壊す・戻す |
 * | `/hakomc:prop <プロパティ> <値> [対象]` | プロパティに値を入れる |
 * | `/hakomc:do <コマンド> [対象]` | Cls.command(...) で足したコマンド |
 *
 * 対象を省くと、打った人のいちばん近く（32 ブロック以内）の、そのコマンドが使える個体が対象になる。
 * 実行は、カスタムコマンドの中では世界を変更できないので、次の tick に回す。
 */
import {
  CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, system,
  type CustomCommandOrigin, type CustomCommandRegistry, type CustomCommandResult, type Entity, type Player,
} from '@minecraft/server';
import { registry, type Entry, type HookTarget } from './registry';
import { Timeline } from './timeline';
import { hiddenBones, type PartClass } from './part';

export interface CommandContext {
  /** コマンドを打ったプレイヤー（コマンドブロックやサーバーからなら undefined） */
  readonly player: Player | undefined;
  readonly origin: CustomCommandOrigin;
}

type CustomFn = (self: never, ctx: CommandContext) => void;
const custom = new Map<string, Array<{ cls: Entry['cls'], fn: CustomFn, description?: string }>>();

/** クラスにコマンドを足す（/hakomc:do <name>） */
export function addCommand(cls: Entry['cls'], name: string, fn: CustomFn, description?: string) {
  if (!/^[a-z0-9_]+$/.test(name)) throw new Error(`[hakomc/entity] コマンド名 "${name}" は小文字・数字・_ だけにする`);
  custom.set(name, [...(custom.get(name) ?? []), { cls, fn, description }]);
}

const RANGE = 32;

const isValid = (e: Entity | undefined) => {
  try {
    return !!e?.isValid;
  } catch {
    return false;
  }
};

/** その場で作った、試しのオブジェクトから timeline の名前を集める（起動時、補完の候補にするため） */
function timelineNames(cls: Entry['cls']): string[] {
  const fake = new Proxy({}, { get: (_t, k) => (k === 'typeId' ? cls.id : k === 'id' ? '-' : undefined) }) as unknown as Entity;
  try {
    const obj = new cls(fake) as unknown as Record<string, unknown>;
    return Object.keys(obj).filter((k) => obj[k] instanceof Timeline);
  } catch {
    return [];
  }
}

const partsOf = (cls: Entry['cls']) => ((cls.definition as { parts?: readonly PartClass[] }).parts ?? []);
const propsOf = (cls: Entry['cls']) => (cls.definition.properties ?? []).map((p) => cls.propertyName(p));

function originPlayer(origin: CustomCommandOrigin): Player | undefined {
  const e = origin.initiator ?? origin.sourceEntity;
  return e && e.typeId === 'minecraft:player' ? (e as Player) : undefined;
}

/** 対象を決める。selector があればその中の、無ければ近くの、ok を満たす登録済みの個体 */
function targets(origin: CustomCommandOrigin, selector: Entity[] | undefined, ok: (entry: Entry, obj: HookTarget) => boolean): Array<{ entry: Entry, obj: HookTarget }> {
  const found: Array<{ entry: Entry, obj: HookTarget, d: number }> = [];
  const from = origin.sourceEntity ?? origin.initiator;
  const at = from && isValid(from) ? from.location : undefined;
  const pool = selector ?? (at && from ? from.dimension.getEntities({ location: at, maxDistance: RANGE }) : []);
  for (const e of pool) {
    const entry = registry().get(e.typeId);
    const obj = entry?.instances.get(e.id);
    if (!entry || !obj || !ok(entry, obj)) continue;
    const l = e.location;
    found.push({ entry, obj, d: at ? Math.hypot(l.x - at.x, l.y - at.y, l.z - at.z) : 0 });
  }
  found.sort((a, b) => a.d - b.d);
  // 対象を指定したときは全員、省いたときはいちばん近くの 1 体
  return selector ? found : found.slice(0, 1);
}

const ok = (message: string): CustomCommandResult => ({ status: CustomCommandStatus.Success, message });
const fail = (message: string): CustomCommandResult => ({ status: CustomCommandStatus.Failure, message });

/** 状態を 1 行にする */
export function describe(entry: Entry, obj: HookTarget): string {
  const e = obj.entity;
  const hp = e.getComponent('minecraft:health');
  const props = propsOf(entry.cls).map((n) => `${n.split(':')[1]}=${String(e.getProperty(n))}`);
  const rec = obj as unknown as Record<string, unknown> & { part?(p: PartClass): { health?: number, maxHealth?: number, broken: boolean } };
  const tls = Object.keys(rec).filter((k) => rec[k] instanceof Timeline).map((k) => `${k}${(rec[k] as Timeline).running ? '▶' : ''}`);
  const parts = partsOf(entry.cls).map((p) => {
    const h = rec.part?.(p as never);
    return `${p.id}${h?.health !== undefined ? ` ${h.health}/${h.maxHealth}` : ''}${h?.broken ? ' 壊' : ''}`;
  });
  return [
    `${entry.cls.name} (${e.id})`,
    hp ? `HP ${hp.currentValue}/${hp.effectiveMax}` : undefined,
    props.length ? props.join(' ') : undefined,
    tls.length ? `timeline: ${tls.join(', ')}` : undefined,
    parts.length ? `部位: ${parts.join(', ')}` : undefined,
  ].filter(Boolean).join(' | ');
}

let installed = false;

/** 起動時にコマンドを登録する（register() から呼ばれる） */
export function installCommands() {
  if (installed) return;
  installed = true;
  system.beforeEvents.startup.subscribe((ev) => registerAll(ev.customCommandRegistry));
}

function registerAll(reg: CustomCommandRegistry) {
  const entries = [...registry().values()];
  const timelines = new Map<string, string[]>();
  for (const en of entries) timelines.set(en.cls.id, timelineNames(en.cls));
  const allTimelines = [...new Set([...timelines.values()].flat())];
  const allParts = [...new Set(entries.flatMap((en) => partsOf(en.cls).map((p) => p.id)))];
  const allProps = [...new Set(entries.flatMap((en) => propsOf(en.cls)))];
  const target = { name: 'target', type: CustomCommandParamType.EntitySelector };
  const base = { permissionLevel: CommandPermissionLevel.GameDirectors, cheatsRequired: true };

  reg.registerCommand({ ...base, name: 'hakomc:info', description: 'hakomc: 近くのエンティティの状態を見る', optionalParameters: [target] },
    (origin, sel?: Entity[]) => {
      const list = targets(origin, sel, () => true);
      if (!list.length) return fail(`近く（${RANGE} ブロック）に、register() したエンティティがいない`);
      return ok(list.map(({ entry, obj }) => describe(entry, obj)).join('\n'));
    });

  if (allTimelines.length) {
    reg.registerEnum('hakomc:timeline', allTimelines);
    reg.registerCommand({
      ...base, name: 'hakomc:run', description: 'hakomc: timeline を始める（打った人を最初の引数に渡す）',
      mandatoryParameters: [{ name: 'hakomc:timeline', type: CustomCommandParamType.Enum }], optionalParameters: [target],
    }, (origin, name: string, sel?: Entity[]) => {
      const list = targets(origin, sel, (en) => timelines.get(en.cls.id)?.includes(name) ?? false);
      if (!list.length) return fail(`timeline ${name} を持つエンティティが近くにいない`);
      const player = originPlayer(origin);
      system.run(() => {
        for (const { obj } of list) if (isValid(obj.entity)) ((obj as unknown as Record<string, Timeline<unknown[]>>)[name]).interrupt(...(player ? [player] : []));
      });
      return ok(`${list.map(({ entry }) => entry.cls.name).join(', ')}: ${name} を始める`);
    });
  }

  reg.registerCommand({ ...base, name: 'hakomc:stop', description: 'hakomc: timeline を全部止める', optionalParameters: [target] },
    (origin, sel?: Entity[]) => {
      // 対象を省いたときは、timeline が動いている中でいちばん近くの個体
      const list = targets(origin, sel, (_en, obj) => sel !== undefined || (obj.timelines ?? []).some((t) => t.running));
      if (!list.length) return fail('近くに、timeline が動いているエンティティがいない');
      system.run(() => {
        for (const { obj } of list) for (const t of obj.timelines ?? []) (t as Timeline).cancel();
      });
      return ok(`${list.length} 体の timeline を止める`);
    });

  if (allParts.length) {
    reg.registerEnum('hakomc:part', allParts);
    reg.registerEnum('hakomc:part_action', ['break', 'restore']);
    reg.registerCommand({
      ...base, name: 'hakomc:part', description: 'hakomc: 部位を壊す・戻す',
      mandatoryParameters: [{ name: 'hakomc:part', type: CustomCommandParamType.Enum }, { name: 'hakomc:part_action', type: CustomCommandParamType.Enum }],
      optionalParameters: [target],
    }, (origin, id: string, action: string, sel?: Entity[]) => {
      const list = targets(origin, sel, (en) => partsOf(en.cls).some((p) => p.id === id && p.options.health !== undefined));
      if (!list.length) return fail(`壊せる部位 ${id}（health のある部位）を持つエンティティが近くにいない`);
      system.run(() => {
        for (const { entry, obj } of list) {
          const part = partsOf(entry.cls).find((p) => p.id === id)!;
          const h = (obj as unknown as { part(p: PartClass): { break(): void, restore(): void } }).part(part);
          if (action === 'break') h.break();
          else h.restore();
        }
      });
      return ok(`部位 ${id} を ${action === 'break' ? '壊す' : '戻す'}${list.some(({ entry }) => partsOf(entry.cls).some((p) => p.id === id && hiddenBones(p).length)) ? '（hideBone あり）' : ''}`);
    });
  }

  if (allProps.length) {
    reg.registerEnum('hakomc:prop', allProps);
    reg.registerCommand({
      ...base, name: 'hakomc:prop', description: 'hakomc: プロパティに値を入れる',
      mandatoryParameters: [{ name: 'hakomc:prop', type: CustomCommandParamType.Enum }, { name: 'value', type: CustomCommandParamType.String }],
      optionalParameters: [target],
    }, (origin, name: string, raw: string, sel?: Entity[]) => {
      const list = targets(origin, sel, (en) => propsOf(en.cls).includes(name));
      if (!list.length) return fail(`プロパティ ${name} を持つエンティティが近くにいない`);
      const value: boolean | number | string = raw === 'true' ? true : raw === 'false' ? false : raw !== '' && !Number.isNaN(Number(raw)) ? Number(raw) : raw;
      system.run(() => {
        for (const { obj } of list) if (isValid(obj.entity)) obj.entity.setProperty(name, value);
      });
      return ok(`${name} = ${JSON.stringify(value)}`);
    });
  }

  if (custom.size) {
    reg.registerEnum('hakomc:command', [...custom.keys()]);
    reg.registerCommand({
      ...base, name: 'hakomc:do', description: 'hakomc: エンティティのクラスで足したコマンド',
      mandatoryParameters: [{ name: 'hakomc:command', type: CustomCommandParamType.Enum }], optionalParameters: [target],
    }, (origin, name: string, sel?: Entity[]) => {
      const defs = custom.get(name) ?? [];
      const list = targets(origin, sel, (en) => defs.some((d) => d.cls === en.cls));
      if (!list.length) return fail(`コマンド ${name} を持つエンティティが近くにいない`);
      const ctx: CommandContext = { player: originPlayer(origin), origin };
      system.run(() => {
        for (const { entry, obj } of list) {
          if (isValid(obj.entity)) defs.find((d) => d.cls === entry.cls)!.fn(obj as never, ctx);
        }
      });
      return ok(`${list.map(({ entry }) => entry.cls.name).join(', ')}: ${name}`);
    });
  }
}
