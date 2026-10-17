// @minecraft/server などは型定義のみのパッケージで、実行可能な JS を持たない。
// hakomc/testing の模擬モジュールが「import できる名前」を全て揃えるために、
// 各パッケージの index.d.ts から enum / const / class 名を読み取り、実行可能なスタブを生成する。
//
//   node scripts/gen-testing-stubs.mjs
//
// 生成物: core/testing/generated/*Stubs.ts
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const TARGETS = [
  { pkg: '@minecraft/server', out: 'serverStubs.ts', implemented: ['world', 'system'] },
  { pkg: '@minecraft/server-ui', out: 'serverUiStubs.ts', implemented: [] },
  { pkg: '@minecraft/server-net', out: 'serverNetStubs.ts', implemented: [] },
];

function generate({ pkg, out: outFile, implemented }) {
  const dir = resolve(root, 'node_modules', pkg);
  if (!existsSync(resolve(dir, 'index.d.ts'))) {
    console.log(`skip ${pkg} (not installed)`);
    return;
  }
  const dts = readFileSync(resolve(dir, 'index.d.ts'), 'utf8');
  const version = JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf8')).version;

  const enums = [];
  for (const m of dts.matchAll(/^export enum (\w+) \{([\s\S]*?)^\}/gm)) {
    const members = [];
    for (const mm of m[2].matchAll(/^\s+(\w+) = ('[^']*'|-?\d+(?:\.\d+)?)\s*,?\s*$/gm)) members.push([mm[1], mm[2]]);
    enums.push([m[1], members]);
  }
  const consts = [];
  for (const m of dts.matchAll(/^export const (\w+) = (-?\d+(?:\.\d+)?|'[^']*');/gm)) consts.push([m[1], m[2]]);
  // `export const http: HttpClient;` のような値を持たない定数（オブジェクト）
  const objects = [];
  for (const m of dts.matchAll(/^export const (\w+): \w+;/gm)) if (!implemented.includes(m[1])) objects.push(m[1]);
  const classes = [];
  for (const m of dts.matchAll(/^export class (\w+)/gm)) classes.push(m[1]);

  const out = [];
  out.push(`// このファイルは scripts/gen-testing-stubs.mjs が生成する。手で編集しないこと。`);
  out.push(`// 生成元: ${pkg} ${version}`);
  out.push(`import { notImplemented } from '../runtime';`);
  out.push('');
  out.push(`export const STUB_SOURCE_VERSION = '${version}';`);
  out.push('');
  for (const [name, members] of enums) {
    out.push(`export const ${name} = Object.freeze({`);
    for (const [k, v] of members) out.push(`  ${k}: ${v},`);
    out.push(`} as const);`);
  }
  if (consts.length) out.push('');
  for (const [name, v] of consts) out.push(`export const ${name} = ${v};`);
  out.push('');
  out.push(`/** 模擬環境で未実装のクラス。参照（instanceof や static 参照）はできるが、生成すると分かりやすいエラーを投げる。 */`);
  out.push(`const stubClass = (name: string) => class {`);
  out.push(`  constructor() {`);
  out.push(`    notImplemented(\`${pkg} の \${name}\`);`);
  out.push(`  }`);
  out.push(`};`);
  for (const name of classes) out.push(`export const ${name} = stubClass('${name}');`);
  if (objects.length) {
    out.push('');
    out.push(`/** 模擬環境で未実装のオブジェクト。メンバーに触れると分かりやすいエラーを投げる。 */`);
    out.push(`const stubObject = (name: string): any => new Proxy({}, {`);
    out.push(`  get: (_t, key) => (typeof key === 'symbol' || key === 'then' ? undefined : notImplemented(\`${pkg} の \${name}.\${String(key)}\`)),`);
    out.push(`});`);
    for (const name of objects) out.push(`export const ${name} = stubObject('${name}');`);
  }
  out.push('');

  mkdirSync(resolve(root, 'core/testing/generated'), { recursive: true });
  writeFileSync(resolve(root, 'core/testing/generated', outFile), out.join('\n'));
  console.log(`${pkg} ${version}: enums ${enums.length}, consts ${consts.length}, objects ${objects.length}, classes ${classes.length}`);
}

for (const t of TARGETS) generate(t);
