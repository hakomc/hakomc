import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import { join } from 'node:path';
import { inflateRawSync } from 'node:zlib';
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
  const ctx = { warn: vi.fn(), addWatchFile: vi.fn() };
  plugin.buildStart.call(ctx);
  await plugin.writeBundle.call(ctx, {}, { 'index.js': { type: 'chunk', isEntry: true, fileName: 'index.js' } });
  return ctx;
};

/** .mcaddon（ZIP）の中身を読む。テスト用の最小実装 */
const readZip = (file: string) => {
  const buf = fs.readFileSync(file);
  const files: Record<string, string> = {};
  let p = 0;
  while (buf.readUInt32LE(p) === 0x04034b50) {
    const method = buf.readUInt16LE(p + 8), size = buf.readUInt32LE(p + 18);
    const nameLen = buf.readUInt16LE(p + 26), extra = buf.readUInt16LE(p + 28);
    const name = buf.subarray(p + 30, p + 30 + nameLen).toString('utf8');
    const body = buf.subarray(p + 30 + nameLen + extra, p + 30 + nameLen + extra + size);
    files[name] = (method === 8 ? inflateRawSync(body) : body).toString('utf8');
    p += 30 + nameLen + extra + size;
  }
  return files;
};

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
  it('watch 用に assets のファイルを監視対象にする', async () => {
    write('assets/behavior/entities/boss.json');
    write('assets/textures/boss.png', 'png');
    const ctx = await build({ name: 'test', uuid: UUID });
    const watched = ctx.addWatchFile.mock.calls.map((c: any[]) => c[0]);
    expect(watched).toEqual(expect.arrayContaining([join(tmp, 'assets/behavior/entities/boss.json'), join(tmp, 'assets/textures/boss.png')]));
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
});
