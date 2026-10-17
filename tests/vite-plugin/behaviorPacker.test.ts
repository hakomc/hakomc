import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { crc32, inflateRawSync } from 'node:zlib';
import behaviorPacker from '../../vite-plugin/behaviorPacker';

const UUID = '82b9174d-ea3d-42ae-986c-b42ce3644760';
let cwd: string;
let tmp: string;

const write = (rel: string, content = '{}') => {
  fs.mkdirSync(join(tmp, rel, '..'), { recursive: true });
  fs.writeFileSync(join(tmp, rel), content);
};
const read = (rel: string) => fs.readFileSync(join(tmp, rel), 'utf8');
const json = (rel: string) => JSON.parse(read(rel));
const exists = (rel: string) => fs.existsSync(join(tmp, rel));

/** vite がスクリプトを書き出した後の writeBundle を再現する */
const build = async (opts: Parameters<typeof behaviorPacker>[0]) => {
  const plugin = behaviorPacker(opts) as any;
  write('dist/behavior_pack/scripts/index.js', 'console.log(1);');
  const ctx = { warn: vi.fn(), addWatchFile: vi.fn(), error: (m: string) => { throw new Error(m); } };
  await plugin.buildStart.call(ctx);
  await plugin.writeBundle.call(ctx, {}, { 'index.js': { type: 'chunk', isEntry: true, fileName: 'index.js' } });
  return ctx;
};

/**
 * .mcaddon（ZIP）を、末尾のセントラルディレクトリから読む（実際の unzip と同じ読み方）。
 * ローカルヘッダとセントラルヘッダの CRC・サイズが一致し、中身の CRC が合っていることも確かめる。
 */
const readZip = (file: string) => {
  const buf = fs.readFileSync(file);
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  expect(eocd).toBe(buf.length - 22);
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  expect(p + buf.readUInt32LE(eocd + 12)).toBe(eocd);
  const files: Record<string, string> = {};
  for (let i = 0; i < count; i++) {
    expect(buf.readUInt32LE(p)).toBe(0x02014b50);
    const method = buf.readUInt16LE(p + 10), date = buf.readUInt16LE(p + 14), crc = buf.readUInt32LE(p + 16);
    const size = buf.readUInt32LE(p + 20), rawSize = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28), extraLen = buf.readUInt16LE(p + 30), commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString('utf8');
    // ローカルヘッダも同じ値を持つこと
    expect(buf.readUInt32LE(local)).toBe(0x04034b50);
    expect([buf.readUInt16LE(local + 8), buf.readUInt16LE(local + 12), buf.readUInt32LE(local + 14), buf.readUInt32LE(local + 18), buf.readUInt32LE(local + 22)])
      .toEqual([method, date, crc, size, rawSize]);
    // 日付は 1980-01-01 以降の正しい値（月・日が 0 ではない）
    expect((date >> 5) & 0x0f).toBeGreaterThan(0);
    expect(date & 0x1f).toBeGreaterThan(0);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const body = buf.subarray(start, start + size);
    const data = method === 8 ? inflateRawSync(body) : body;
    expect(data.length).toBe(rawSize);
    expect(crc32(data)).toBe(crc);
    files[name] = data.toString('utf8');
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
};

/** unzip コマンドがあれば、それでも壊れていないか確かめる */
const hasUnzip = (() => {
  try {
    execFileSync('unzip', ['-v'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

beforeEach(() => {
  cwd = process.cwd();
  tmp = fs.mkdtempSync(join(os.tmpdir(), 'hakomc-packer-'));
  process.chdir(tmp);
});
afterEach(() => {
  process.chdir(cwd);
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe('behaviorPacker: これまでと同じ使い方', () => {
  it('素材フォルダが無ければ、スクリプトのモジュールとマニフェストだけ（データモジュールも RP 依存も無い）', async () => {
    await build({ name: 'test', uuid: UUID });
    const m = json('dist/behavior_pack/manifest.json');
    expect(m.header.uuid).toBe(UUID);
    expect(m.modules.map((x: any) => x.type)).toEqual(['script']);
    expect(m.dependencies.map((d: any) => d.module_name)).toEqual(['@minecraft/server', '@minecraft/server-ui']);
    expect(exists('dist/resource_pack')).toBe(false);
    expect(read('dist/behavior_pack/scripts/index.js')).toBe('console.log(1);');
  });
  it('uuid を指定すれば、モジュールの UUID もビルドのたびに同じ', async () => {
    await build({ name: 'test', uuid: UUID });
    const a = json('dist/behavior_pack/manifest.json');
    await build({ name: 'test', uuid: UUID });
    const b = json('dist/behavior_pack/manifest.json');
    expect(b.modules[0].uuid).toBe(a.modules[0].uuid);
    expect(b.modules[0].uuid).not.toBe(UUID);
  });
  it('manifest オプションの上書きは今まで通り効く', async () => {
    await build({ name: 'test', uuid: UUID, manifest: { header: { min_engine_version: [1, 26, 0] }, dependencies: [{ module_name: '@minecraft/server', version: '2.6.0' }] } });
    const m = json('dist/behavior_pack/manifest.json');
    expect(m.header.min_engine_version).toEqual([1, 26, 0]);
    expect(m.dependencies.find((d: any) => d.module_name === '@minecraft/server').version).toBe('2.6.0');
  });
});

describe('behaviorPacker: assets の振り分け', () => {
  it('フォルダ名で行き先のパックが決まる', async () => {
    write('assets/textures/entity/boss.png', 'png');
    write('assets/sounds/roar.ogg', 'ogg');
    write('assets/models/entity/boss.geo.json', '{"geo":1}');
    write('assets/structures/arena.mcstructure', 'nbt');
    write('assets/functions/start.mcfunction', 'say hi');
    write('assets/pack_icon.png', 'icon');
    await build({ name: 'test', uuid: UUID });
    expect(read('dist/resource_pack/textures/entity/boss.png')).toBe('png');
    expect(read('dist/resource_pack/sounds/roar.ogg')).toBe('ogg');
    expect(read('dist/resource_pack/models/entity/boss.geo.json')).toBe('{"geo":1}');
    expect(read('dist/behavior_pack/structures/arena.mcstructure')).toBe('nbt');
    expect(read('dist/behavior_pack/functions/start.mcfunction')).toBe('say hi');
    expect(read('dist/behavior_pack/pack_icon.png')).toBe('icon');
    expect(read('dist/resource_pack/pack_icon.png')).toBe('icon');
    expect(exists('dist/behavior_pack/textures')).toBe(false);
    expect(exists('dist/resource_pack/structures')).toBe(false);
  });
  it('behavior/ と resource/ の中身は、それぞれのパックの直下に入る（同じ名前のフォルダも混ざらない）', async () => {
    write('assets/behavior/entities/boss.json', '{"bp":1}');
    write('assets/behavior/texts/ja_JP.lang', 'bp=1');
    write('assets/resource/entity/boss.entity.json', '{"rp":1}');
    write('assets/resource/texts/ja_JP.lang', 'rp=1');
    await build({ name: 'test', uuid: UUID });
    expect(read('dist/behavior_pack/entities/boss.json')).toBe('{"bp":1}');
    expect(read('dist/behavior_pack/texts/ja_JP.lang')).toBe('bp=1');
    expect(read('dist/resource_pack/entity/boss.entity.json')).toBe('{"rp":1}');
    expect(read('dist/resource_pack/texts/ja_JP.lang')).toBe('rp=1');
    expect(json('dist/behavior_pack/manifest.json').modules.map((x: any) => x.type)).toEqual(['script', 'data']);
  });
  it('リソースパックに入るものしか無ければ、BP にデータモジュールは足さない', async () => {
    write('assets/textures/a.png');
    await build({ name: 'test', uuid: UUID });
    expect(json('dist/behavior_pack/manifest.json').modules.map((x: any) => x.type)).toEqual(['script']);
  });
  it('生成物と重なるものと、行き先が分からないものはコピーせず警告する', async () => {
    write('assets/behavior/manifest.json', '{"mine":true}');
    write('assets/behavior/scripts/old.js', 'old');
    write('assets/resource/manifest.json', '{"mine":true}');
    write('assets/entities/boss.json');
    write('assets/readme.txt', 'x');
    const ctx = await build({ name: 'test', uuid: UUID });
    expect(json('dist/behavior_pack/manifest.json').header.uuid).toBe(UUID);
    expect(exists('dist/behavior_pack/scripts/old.js')).toBe(false);
    expect(exists('dist/behavior_pack/entities')).toBe(false);
    expect(exists('dist/resource_pack')).toBe(false);
    const warnings = ctx.warn.mock.calls.map((c: any[]) => c[0]).join('\n');
    expect(warnings).toContain('behavior/manifest.json, behavior/scripts/old.js, resource/manifest.json');
    expect(warnings).toContain('entities/boss.json, readme.txt');
  });
  it('assets から消したファイルは、次のビルドで出力からも消える', async () => {
    write('assets/structures/old.mcstructure');
    write('assets/textures/old.png');
    await build({ name: 'test', uuid: UUID });
    fs.rmSync(join(tmp, 'assets/structures/old.mcstructure'));
    fs.rmSync(join(tmp, 'assets/textures/old.png'));
    write('assets/structures/new.mcstructure');
    write('assets/textures/new.png');
    await build({ name: 'test', uuid: UUID });
    expect(exists('dist/behavior_pack/structures/old.mcstructure')).toBe(false);
    expect(exists('dist/behavior_pack/structures/new.mcstructure')).toBe(true);
    expect(exists('dist/resource_pack/textures/old.png')).toBe(false);
    expect(exists('dist/resource_pack/textures/new.png')).toBe(true);
  });
  it('watch 用に assets フォルダごと監視対象にする（後から足したファイルも拾うため。まだ無くても登録する）', async () => {
    const ctx = await build({ name: 'test', uuid: UUID });
    expect(ctx.addWatchFile.mock.calls.map((c: any[]) => c[0])).toEqual([join(tmp, 'assets')]);
    const ctx2 = await build({ name: 'test', uuid: UUID, assetsDir: 'art' });
    expect(ctx2.addWatchFile.mock.calls.map((c: any[]) => c[0])).toEqual([join(tmp, 'art')]);
  });
  it('assetsDir で場所を変えられる', async () => {
    write('art/textures/a.png', 'png');
    await build({ name: 'test', uuid: UUID, assetsDir: 'art' });
    expect(read('dist/resource_pack/textures/a.png')).toBe('png');
  });
});

describe('behaviorPacker: リソースパック', () => {
  it('リソースパックに入るファイルがあれば作り、BP と RP を互いに依存させる', async () => {
    write('assets/textures/boss.png', 'png');
    await build({ name: 'test', uuid: UUID, version: [1, 2, 0] });
    const bp = json('dist/behavior_pack/manifest.json');
    const rp = json('dist/resource_pack/manifest.json');
    expect(rp.header.name).toBe('test resources');
    expect(rp.modules[0].type).toBe('resources');
    expect(rp.dependencies).toEqual([{ uuid: UUID, version: [1, 2, 0] }]);
    expect(bp.dependencies).toContainEqual({ uuid: rp.header.uuid, version: [1, 2, 0] });
    expect(rp.header.min_engine_version).toEqual(bp.header.min_engine_version);
  });
  it('RP の UUID はビルドのたびに同じ（指定もできる）', async () => {
    write('assets/textures/a.png');
    await build({ name: 'test', uuid: UUID });
    const a = json('dist/resource_pack/manifest.json').header.uuid;
    await build({ name: 'test', uuid: UUID });
    expect(json('dist/resource_pack/manifest.json').header.uuid).toBe(a);
    const fixed = '11111111-2222-4333-8444-555555555555';
    await build({ name: 'test', uuid: UUID, resourcePack: { uuid: fixed, name: 'RP' } });
    expect(json('dist/resource_pack/manifest.json').header).toMatchObject({ uuid: fixed, name: 'RP' });
  });
  it('ファイルが無くても resourcePack を指定すれば作る', async () => {
    await build({ name: 'test', uuid: UUID, resourcePack: {} });
    expect(json('dist/resource_pack/manifest.json').modules[0].type).toBe('resources');
  });
  it('false で作らず、前回の出力も消す', async () => {
    write('assets/textures/a.png');
    await build({ name: 'test', uuid: UUID });
    expect(exists('dist/resource_pack')).toBe(true);
    const ctx = await build({ name: 'test', uuid: UUID, resourcePack: false });
    expect(exists('dist/resource_pack')).toBe(false);
    expect(json('dist/behavior_pack/manifest.json').dependencies.some((d: any) => d.uuid)).toBe(false);
    expect(ctx.warn).toHaveBeenCalledWith(expect.stringContaining('resourcePack: false'));
  });
});

describe('behaviorPacker: .mcaddon', () => {
  it('BP と RP をまとめた .mcaddon を書き出す', async () => {
    write('assets/behavior/entities/boss.json', '{"boss":1}');
    write('assets/resource/texts/en_US.lang', 'x=y');
    await build({ name: 'My Boss', uuid: UUID, mcaddon: true });
    const files = readZip(join(tmp, 'dist/My Boss.mcaddon'));
    expect(Object.keys(files).sort()).toEqual([
      'behavior_pack/entities/boss.json',
      'behavior_pack/manifest.json',
      'behavior_pack/scripts/index.js',
      'resource_pack/manifest.json',
      'resource_pack/texts/en_US.lang',
    ]);
    expect(files['behavior_pack/entities/boss.json']).toBe('{"boss":1}');
    expect(JSON.parse(files['resource_pack/manifest.json']).dependencies[0].uuid).toBe(UUID);
  });
  it.skipIf(!hasUnzip)('unzip -t でも壊れていない（圧縮するファイルとしないファイルの両方）', async () => {
    write('assets/behavior/entities/big.json', JSON.stringify({ list: Array.from({ length: 500 }, (_, i) => `entry-${i}`) }));
    write('assets/textures/tiny.png', 'p');
    write('assets/resource/texts/ja_JP.lang', 'タイトル=モルグレイヴ');
    await build({ name: 'zip', uuid: UUID, mcaddon: true });
    const out = execFileSync('unzip', ['-t', join(tmp, 'dist/zip.mcaddon')]).toString();
    expect(out).toContain('No errors detected');
    expect(readZip(join(tmp, 'dist/zip.mcaddon'))['resource_pack/texts/ja_JP.lang']).toBe('タイトル=モルグレイヴ');
  });
});

describe('behaviorPacker: 定義（src/pack.ts）から JSON を作る', () => {
  const ENTITY = JSON.stringify(join(cwd0(), 'core/entity/index.ts'));
  function cwd0() { return process.cwd(); }
  const writePack = () => {
    write('src/boss.ts', `
      import { world } from '@minecraft/server';
      import { BoolProperty, ComponentGroup, EntityEvent, entity, health, movement, set, timer, type Component } from ${ENTITY};
      class IsAngry extends BoolProperty('is_angry', false, { client: true }) {}
      class Angry extends ComponentGroup {
        components: Component[] = [movement({ value: 0.35 }), timer({ time: 30, time_down_event: Calm })];
      }
      class Enrage extends EntityEvent { static readonly id = 'enrage'; add = [Angry]; set = [set(IsAngry, true)]; }
      class Calm extends EntityEvent { static readonly id = 'calm'; remove = [Angry]; set = [set(IsAngry, false)]; }
      export class Boss extends entity('hako:boss', {
        name: { en_US: 'Boss', ja_JP: 'ボス' },
        properties: [IsAngry],
        components: [health({ value: 600 })],
        events: [Enrage],
        client: { geometry: 'geometry.boss', textures: 'textures/entity/boss' },
      }) {}
      // 振る舞いのコードも一緒に読み込まれる（@minecraft/server は模擬に差し替わる）
      world.afterEvents.entityHurt.subscribe(() => {});
    `);
    write('src/pack.ts', `
      import { definePack } from ${ENTITY};
      import { Boss } from './boss';
      export default definePack({ entities: [Boss] });
    `);
  };
  it('BP の entities、RP の entity、ローカライズを書き出し、RP を有効にする', async () => {
    writePack();
    write('assets/resource/texts/ja_JP.lang', 'item.hako:gem.name=宝石');
    await build({ name: 'test', uuid: UUID });
    const bp = json('dist/behavior_pack/entities/boss.json')['minecraft:entity'];
    expect(bp.description.properties['hako:is_angry'].type).toBe('bool');
    expect(bp.component_groups.angry['minecraft:timer'].time_down_event).toBe('hako:calm');
    expect(json('dist/resource_pack/entity/boss.entity.json')['minecraft:client_entity'].description.geometry).toEqual({ default: 'geometry.boss' });
    expect(read('dist/resource_pack/texts/ja_JP.lang')).toBe('item.hako:gem.name=宝石\nentity.hako:boss.name=ボス\n');
    expect(read('dist/resource_pack/texts/en_US.lang')).toBe('entity.hako:boss.name=Boss\n');
    expect(json('dist/resource_pack/texts/languages.json')).toEqual(['en_US', 'ja_JP']);
    // BP に data モジュール、BP → RP の依存
    const m = json('dist/behavior_pack/manifest.json');
    expect(m.modules.map((x: any) => x.type)).toEqual(['script', 'data']);
    expect(m.dependencies.some((d: any) => d.uuid)).toBe(true);
  });
  it('assets の .lang に同じキーがあれば、定義から作った行で置き換えて警告する（2 行にしない）', async () => {
    writePack();
    write('assets/resource/texts/en_US.lang', '## comment\nentity.hako:boss.name=Old Name\nitem.hako:gem.name=Gem\n');
    const ctx = await build({ name: 'test', uuid: UUID });
    expect(read('dist/resource_pack/texts/en_US.lang')).toBe('## comment\nentity.hako:boss.name=Boss\nitem.hako:gem.name=Gem\n');
    expect(ctx.warn).toHaveBeenCalledWith(expect.stringContaining('texts/en_US.lang の entity.hako:boss.name'));
    // 何度ビルドしても同じ結果（行が増えない）
    await build({ name: 'test', uuid: UUID });
    expect(read('dist/resource_pack/texts/en_US.lang')).toBe('## comment\nentity.hako:boss.name=Boss\nitem.hako:gem.name=Gem\n');
  });
  it('watch 用に、pack.ts から辿ったファイルも監視する', async () => {
    writePack();
    const ctx = await build({ name: 'test', uuid: UUID });
    const watched = ctx.addWatchFile.mock.calls.map((c: any[]) => c[0]);
    expect(watched).toEqual(expect.arrayContaining([join(tmp, 'src/pack.ts'), join(tmp, 'src/boss.ts')]));
  });
  it('定義の間違いはビルドを止める', async () => {
    write('src/pack.ts', `
      import { definePack, entity } from ${ENTITY};
      export default definePack({ entities: [entity('hako:dup'), entity('hako:dup')] });
    `);
    await expect(build({ name: 'test', uuid: UUID })).rejects.toThrow('hako:dup が 2 つ定義されている');
  });
  it('pack: false なら読み込まない', async () => {
    writePack();
    await build({ name: 'test', uuid: UUID, pack: false });
    expect(exists('dist/behavior_pack/entities')).toBe(false);
  });
});
