// エンティティのコンポーネント（minecraft:health など）の型と関数を、Mojang 公式の JSON スキーマから生成する。
//
//   node scripts/gen-entity-components.mjs
//
// 元: @minecraft/bedrock-schemas の schemas/bp/entities
// 生成物: core/entity/generated/components.ts
//
// 公式パッケージには TypeScript の型も入っているが、JSON スキーマより大ざっぱなところがある
// （例: minecraft:timer の time は「数値 / [最小, 最大] / {min, max}」なのに number[] だけ）。
// なので型は JSON スキーマから自前で作る。
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkgDir = resolve(root, 'node_modules/@minecraft/bedrock-schemas');
const entitiesDir = resolve(pkgDir, 'schemas/bp/entities');
const MAP_FILE = resolve(entitiesDir, 'entity_entity_component_definitions.schema.json');
if (!existsSync(MAP_FILE)) {
  console.error('@minecraft/bedrock-schemas が見つからない。npm install してから実行する');
  process.exit(1);
}
const version = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf8')).version;

const RESERVED = new Set(['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'await', 'component']);

const pascal = (s) => s.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join('');
/** minecraft:behavior.melee_attack → behaviorMeleeAttack */
export const functionName = (key) => {
  const parts = key.replace(/^minecraft:/, '').split(/[._]/).filter(Boolean);
  const name = parts.map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1))).join('');
  return RESERVED.has(name) ? `${name}_` : name;
};

/** エンティティのイベントを指す項目か（音の名前などは除く） */
const isEventKey = (key) => key !== undefined && /(^|_)event$/.test(key) && !/sound/.test(key);

const loaded = new Map(); // 絶対パス → スキーマ
const load = (file) => {
  if (!loaded.has(file)) loaded.set(file, JSON.parse(readFileSync(file, 'utf8')));
  return loaded.get(file);
};

/** $ref で参照されたスキーマごとに、名前付きの型を作る（再帰しても止まるように） */
const named = new Map(); // 絶対パス → { name, body }
const typeNameOf = (file) => pascal(basename(file).replace(/\.schema\.json$/, ''));
const missing = new Set();
const refType = (file, key) => {
  if (!existsSync(file)) {
    // 公式パッケージ側で参照先が欠けていることがある（例: common/expression.schema.json）
    missing.add(file.replace(`${pkgDir}/`, ''));
    return 'unknown';
  }
  if (!named.has(file)) {
    const entry = { name: typeNameOf(file), body: 'unknown' };
    named.set(file, entry);
    entry.body = toTs(load(file), dirname(file), 0);
  }
  const name = named.get(file).name;
  // イベントの指定（entity_actordefinitiontrigger など）なら、文字列やイベントのクラスでも書ける
  return isEventKey(key) ? `${name} | string | EventRef` : name;
};

const lit = (v) => JSON.stringify(v);
const indent = (s, n) => s.replace(/\n/g, `\n${'  '.repeat(n)}`);
const doc = (s) => {
  const lines = [];
  if (s.title && s.description) lines.push(s.description);
  else if (s.description || s.title) lines.push(s.description || s.title);
  if (s.default !== undefined && typeof s.default !== 'object') lines.push(`@default ${JSON.stringify(s.default)}`);
  if (s.deprecated) lines.push('@deprecated');
  if (!lines.length) return '';
  return `/** ${lines.join('\n * ').replace(/\*\//g, '*\\/')} */\n`;
};

/**
 * JSON スキーマ → TS の型（文字列）
 * @param key このスキーマが入っている項目名（イベントの項目を見分けるため）
 */
function toTs(s, dir, depth, key) {
  if (s === true || s === undefined) return 'unknown';
  if (s === false) return 'never';
  if (s.$ref) return refType(resolve(dir, s.$ref), key);
  if (s.enum) return s.enum.map(lit).join(' | ');
  if (s.const !== undefined) return lit(s.const);
  const alts = s.anyOf ?? s.oneOf;
  if (alts) {
    const parts = [...new Set(alts.map((a) => toTs(a, dir, depth, key)))];
    // イベントの指定は「文字列 or {event, target}」になっていることが多いので、クラスも足す
    if (isEventKey(key) && !parts.some((p) => p.includes('EventRef'))) parts.push('EventRef');
    return parts.length > 1 ? parts.map((p) => (p.includes('\n') ? `(${p})` : p)).join(' | ') : parts[0];
  }
  const types = Array.isArray(s.type) ? s.type : [s.type];
  const out = types.map((t) => {
    switch (t) {
      case 'string': return isEventKey(key) || key === 'event' ? 'string | EventRef' : 'string';
      case 'number':
      case 'integer': return 'number';
      case 'boolean': return 'boolean';
      case 'null': return 'null';
      case 'array': {
        const item = Array.isArray(s.items) ? `[${s.items.map((i) => toTs(i, dir, depth + 1)).join(', ')}]` : null;
        if (item) return item;
        const it = toTs(s.items, dir, depth + 1, key);
        if (s.minItems && s.minItems === s.maxItems && s.minItems <= 4) return `[${Array(s.minItems).fill(it).join(', ')}]`;
        return it.includes(' ') || it.includes('\n') ? `Array<${it}>` : `${it}[]`;
      }
      case 'object': {
        const props = Object.entries(s.properties ?? {});
        if (!props.length && !s.additionalProperties) {
          // 中身が書かれていないオブジェクト。イベントの指定なら {event, target} 形式にする
          return isEventKey(key) ? 'EventTrigger' : 'Record<string, unknown>';
        }
        const req = new Set(s.required ?? []);
        const lines = props.map(([k, v]) => {
          const name = /^[A-Za-z_$][\w$]*$/.test(k) ? k : lit(k);
          return `${doc(v)}${name}${req.has(k) ? '' : '?'}: ${indent(toTs(v, dir, depth + 1, k), 1)};`;
        });
        if (s.additionalProperties) {
          const ap = s.additionalProperties === true ? 'unknown' : toTs(s.additionalProperties, dir, depth + 1);
          lines.push(`[key: string]: ${props.length ? 'unknown' : indent(ap, 1)};`);
        }
        return `{\n  ${lines.map((l) => indent(l, 1)).join('\n  ')}\n}`;
      }
      case undefined: return 'unknown';
      default: return 'unknown';
    }
  });
  return [...new Set(out)].join(' | ');
}

// ---- 生成 ----
const map = load(MAP_FILE).properties;
const components = [];
const fnNames = new Map();
for (const [key, s] of Object.entries(map)) {
  const type = toTs(s, entitiesDir, 0);
  const fn = functionName(key);
  if (fnNames.has(fn)) throw new Error(`関数名がかぶる: ${key} と ${fnNames.get(fn)} → ${fn}`);
  fnNames.set(fn, key);
  components.push({ key, type, fn, doc: doc(s) });
}

const out = [];
out.push('// このファイルは scripts/gen-entity-components.mjs が生成する。手で編集しないこと。');
out.push(`// 生成元: @minecraft/bedrock-schemas ${version}（MIT License, Copyright (c) Microsoft Corporation）`);
out.push('/* eslint-disable */');
out.push("import { component, type Component, type EventRef, type EventTrigger } from '../component';");
out.push('');
out.push(`export const COMPONENT_SOURCE_VERSION = '${version}';`);
out.push('');
for (const { name, body } of named.values()) out.push(`export type ${name} = ${body};`);
out.push('');
out.push('/** コンポーネント名と、その中身の型 */');
out.push('export interface EntityComponents {');
for (const c of components) out.push(`  ${indent(c.doc, 1)}${lit(c.key)}: ${indent(c.type, 1)};`);
out.push('}');
out.push('');
for (const c of components) {
  // 項目はほぼ全て省略可能なので、引数ごと省略できる（{} になる。タグのようなコンポーネント用）
  const d = c.doc ? c.doc.replace(/^\/\*\* /, `/** \`${c.key}\` — `) : `/** \`${c.key}\` */\n`;
  out.push(`${d}export const ${c.fn} = (value: EntityComponents[${lit(c.key)}] = {} as EntityComponents[${lit(c.key)}]): Component => component(${lit(c.key)}, value);`);
}
out.push('');
mkdirSync(resolve(root, 'core/entity/generated'), { recursive: true });
writeFileSync(resolve(root, 'core/entity/generated/components.ts'), out.join('\n'));
console.log(`@minecraft/bedrock-schemas ${version}: components ${components.length}, named types ${named.size}`);
for (const m of missing) console.warn(`  参照先が見つからないので unknown にした: ${m}`);
