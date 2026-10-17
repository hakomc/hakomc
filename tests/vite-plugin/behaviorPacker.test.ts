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

describe('behaviorPacker: ビヘイビアパックの素材', () => {
  it('behavior_pack/ をコピーし、データモジュールを足す', async () => {
    write('behavior_pack/entities/boss.json', '{"boss":1}');
    write('behavior_pack/texts/ja_JP.lang', 'a=b');
    await build({ name: 'test', uuid: UUID });
    expect(read('dist/behavior_pack/entities/boss.json')).toBe('{"boss":1}');
    expect(read('dist/behavior_pack/texts/ja_JP.lang')).toBe('a=b');
    expect(json('dist/behavior_pack/manifest.json').modules.map((x: any) => x.type)).toEqual(['script', 'data']);
  });
  it('素材側の manifest.json と scripts/ は生成物と重なるのでコピーせず、警告する', async () => {
    write('behavior_pack/manifest.json', '{"mine":true}');
    write('behavior_pack/scripts/old.js', 'old');
    const ctx = await build({ name: 'test', uuid: UUID });
    expect(json('dist/behavior_pack/manifest.json').header.uuid).toBe(UUID);
    expect(exists('dist/behavior_pack/scripts/old.js')).toBe(false);
    expect(ctx.warn).toHaveBeenCalledWith(expect.stringContaining('manifest.json, scripts/old.js'));
  });
  it('素材から消したファイルは、次のビルドで出力からも消える', async () => {
    write('behavior_pack/entities/old.json');
    await build({ name: 'test', uuid: UUID });
    fs.rmSync(join(tmp, 'behavior_pack/entities/old.json'));
    write('behavior_pack/entities/new.json');
    await build({ name: 'test', uuid: UUID });
    expect(exists('dist/behavior_pack/entities/old.json')).toBe(false);
    expect(exists('dist/behavior_pack/entities/new.json')).toBe(true);
  });
  it('watch 用に素材ファイルを監視対象にする', async () => {
    write('behavior_pack/entities/boss.json');
    write('resource_pack/textures/boss.png', 'png');
    const ctx = await build({ name: 'test', uuid: UUID });
    const watched = ctx.addWatchFile.mock.calls.map((c: any[]) => c[0]);
    expect(watched).toEqual(expect.arrayContaining([join(tmp, 'behavior_pack/entities/boss.json'), join(tmp, 'resource_pack/textures/boss.png')]));
  });
});

describe('behaviorPacker: リソースパック', () => {
  it('resource_pack/ があれば作り、BP と RP を互いに依存させる', async () => {
    write('resource_pack/textures/boss.png', 'png');
    await build({ name: 'test', uuid: UUID, version: [1, 2, 0] });
    const bp = json('dist/behavior_pack/manifest.json');
    const rp = json('dist/resource_pack/manifest.json');
    expect(read('dist/resource_pack/textures/boss.png')).toBe('png');
    expect(rp.modules[0].type).toBe('resources');
    expect(rp.dependencies).toEqual([{ uuid: UUID, version: [1, 2, 0] }]);
    expect(bp.dependencies).toContainEqual({ uuid: rp.header.uuid, version: [1, 2, 0] });
    expect(rp.header.min_engine_version).toEqual(bp.header.min_engine_version);
  });
  it('RP の UUID はビルドのたびに同じ（指定もできる）', async () => {
    write('resource_pack/a.json');
    await build({ name: 'test', uuid: UUID });
    const a = json('dist/resource_pack/manifest.json').header.uuid;
    await build({ name: 'test', uuid: UUID });
    expect(json('dist/resource_pack/manifest.json').header.uuid).toBe(a);
    const fixed = '11111111-2222-4333-8444-555555555555';
    await build({ name: 'test', uuid: UUID, resourcePack: { uuid: fixed, name: 'RP' } });
    const rp = json('dist/resource_pack/manifest.json');
    expect(rp.header).toMatchObject({ uuid: fixed, name: 'RP' });
  });
  it('別のフォルダ名を指定でき、false で無効にできる', async () => {
    write('assets/rp/a.json');
    await build({ name: 'test', uuid: UUID, resourcePack: { dir: 'assets/rp' } });
    expect(exists('dist/resource_pack/a.json')).toBe(true);
    write('resource_pack/b.json');
    fs.rmSync(join(tmp, 'dist'), { recursive: true });
    await build({ name: 'test', uuid: UUID, resourcePack: false });
    expect(exists('dist/resource_pack')).toBe(false);
    expect(json('dist/behavior_pack/manifest.json').dependencies.some((d: any) => d.uuid)).toBe(false);
  });
});

describe('behaviorPacker: .mcaddon', () => {
  it('BP と RP をまとめた .mcaddon を書き出す', async () => {
    write('behavior_pack/entities/boss.json', '{"boss":1}');
    write('resource_pack/texts/en_US.lang', 'x=y');
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
