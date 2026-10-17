import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import { join, relative, sep } from 'node:path';
import { deflateRawSync } from 'node:zlib';

/**
 * seed から毎回同じ UUID を作る（SHA-1 ベース、UUID v5 と同じ書式）。
 * ビルドのたびに UUID が変わると、ワールドに登録したパックとして認識されなくなるため。
 */
export const stableUuid = (seed: string): string => {
  const h = crypto.createHash('sha1').update(`hakomc:${seed}`).digest();
  h[6] = (h[6] & 0x0f) | 0x50;
  h[8] = (h[8] & 0x3f) | 0x80;
  const x = h.subarray(0, 16).toString('hex');
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20, 32)}`;
};

/** dir 以下のファイルを全て列挙する（dir が無ければ空） */
export const listFiles = (dir: string): string[] => {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(p));
    else if (entry.isFile()) out.push(p);
  }
  return out;
};

/** dir の中身を消す（keep に入っている直下の名前は残す） */
export const cleanDir = (dir: string, keep: string[] = []) => {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (keep.includes(name)) continue;
    fs.rmSync(join(dir, name), { recursive: true, force: true });
  }
};

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

/** ZIP の日付（MS-DOS 形式）。0 は月日が 0 の不正な日付になるので、1980-01-01 00:00 にする */
const DOS_TIME = 0;
const DOS_DATE = (0 << 9) | (1 << 5) | 1;

const crc32 = (buf: Buffer) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

/**
 * ZIP ファイルを書き出す（.mcaddon / .mcpack 用）。依存パッケージを増やさないための最小実装。
 * @param entries ZIP 内のパス（/ 区切り）と中身
 */
export const writeZip = (outPath: string, entries: Array<{ path: string, data: Buffer }>) => {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const { path, data } of entries) {
    const name = Buffer.from(path, 'utf8');
    const crc = crc32(data);
    const deflated = deflateRawSync(data);
    const useDeflate = deflated.length < data.length;
    const body = useDeflate ? deflated : data;
    const method = useDeflate ? 8 : 0;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);       // version needed
    local.writeUInt16LE(0x0800, 6);   // flags: UTF-8 names
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, body);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);     // version made by
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);

    offset += local.length + name.length + body.length;
  }
  const centralSize = centrals.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  fs.mkdirSync(join(outPath, '..'), { recursive: true });
  fs.writeFileSync(outPath, Buffer.concat([...locals, ...centrals, end]));
};

/** assets/ 直下のフォルダ名と、そのまま入れる先のパック。ここに無い名前は assets/behavior/ か assets/resource/ に置く */
export const ASSET_ROUTES: Record<string, 'bp' | 'rp'> = {
  textures: 'rp',
  sounds: 'rp',
  models: 'rp',
  particles: 'rp',
  font: 'rp',
  structures: 'bp',
  functions: 'bp',
};

export type RoutedFile = { src: string, rel: string };

/**
 * assets フォルダのファイルを、ビヘイビアパックとリソースパックに振り分ける。
 * - behavior/ と resource/ の中身は、それぞれのパックの直下にそのまま入る
 * - ASSET_ROUTES にあるフォルダは、決まったパックにフォルダごと入る
 * - 直下の pack_icon.png は両方のパックに入る
 * - それ以外と、生成物と重なるもの（manifest.json・BP の scripts/）は skipped
 */
export const routeAssets = (dir: string) => {
  const bp: RoutedFile[] = [];
  const rp: RoutedFile[] = [];
  const skipped: Array<{ rel: string, reason: 'generated' | 'unknown' }> = [];
  for (const src of listFiles(dir)) {
    const rel = relative(dir, src).split(sep).join('/');
    const [top, ...rest] = rel.split('/');
    const inner = rest.join('/');
    if (rel === 'pack_icon.png') {
      bp.push({ src, rel });
      rp.push({ src, rel });
    } else if (top === 'behavior' && rest.length) {
      if (inner === 'manifest.json' || inner.startsWith('scripts/')) skipped.push({ rel, reason: 'generated' });
      else bp.push({ src, rel: inner });
    } else if (top === 'resource' && rest.length) {
      if (inner === 'manifest.json') skipped.push({ rel, reason: 'generated' });
      else rp.push({ src, rel: inner });
    } else if (rest.length && ASSET_ROUTES[top]) {
      (ASSET_ROUTES[top] === 'bp' ? bp : rp).push({ src, rel });
    } else {
      skipped.push({ rel, reason: 'unknown' });
    }
  }
  return { bp, rp, skipped };
};

/** 振り分けたファイルを dest にコピーする */
export const copyRouted = (files: RoutedFile[], dest: string) => {
  for (const { src, rel } of files) {
    const to = join(dest, rel);
    fs.mkdirSync(join(to, '..'), { recursive: true });
    fs.copyFileSync(src, to);
  }
};

/** パック内のパス → JSON を書き出す */
export const writeJsonFiles = (dest: string, files: Record<string, unknown>) => {
  for (const [rel, json] of Object.entries(files)) {
    const to = join(dest, rel);
    fs.mkdirSync(join(to, '..'), { recursive: true });
    fs.writeFileSync(to, JSON.stringify(json, null, 2));
  }
};

/**
 * ローカライズの行を texts/<言語>.lang に書き、texts/languages.json にその言語を入れる。
 * assets から置いた .lang があれば、それに足す。同じキーの行があれば、定義から作った行で置き換える
 * （同じキーが 2 行あると、ゲームがどちらを使うか分からなくなるため）。
 * @returns 置き換えたキー（言語ごと）
 */
export const writeLang = (packDir: string, lang: Record<string, string[]>): Record<string, string[]> => {
  const replaced: Record<string, string[]> = {};
  const codes = Object.keys(lang).filter((c) => lang[c].length);
  if (!codes.length) return replaced;
  const texts = join(packDir, 'texts');
  fs.mkdirSync(texts, { recursive: true });
  const keyOf = (line: string) => {
    const t = line.trim();
    if (!t || t.startsWith('#') || !t.includes('=')) return undefined;
    return t.slice(0, t.indexOf('=')).trim();
  };
  for (const code of codes) {
    const file = join(texts, `${code}.lang`);
    const lines = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split(/\r?\n/) : [];
    while (lines.length && lines[lines.length - 1] === '') lines.pop();
    const index = new Map<string, number>();
    lines.forEach((l, i) => {
      const k = keyOf(l);
      if (k !== undefined) index.set(k, i);
    });
    for (const line of lang[code]) {
      const k = keyOf(line)!;
      const at = index.get(k);
      if (at !== undefined) {
        if (lines[at] !== line) (replaced[code] ??= []).push(k);
        lines[at] = line;
      } else {
        index.set(k, lines.length);
        lines.push(line);
      }
    }
    fs.writeFileSync(file, `${lines.join('\n')}\n`);
  }
  const listFile = join(texts, 'languages.json');
  const list: string[] = fs.existsSync(listFile) ? JSON.parse(fs.readFileSync(listFile, 'utf8')) : [];
  for (const code of codes) if (!list.includes(code)) list.push(code);
  fs.writeFileSync(listFile, JSON.stringify(list, null, 2));
  return replaced;
};
