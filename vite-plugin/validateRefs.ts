/**
 * ビルド時の検査: リソースパックのクライアント側のエンティティ定義（entity/*.json）が参照しているものが、
 * パックの中に実在するかを確かめる。
 *
 * - geometry の識別子 → models/ の中のモデル
 * - テクスチャのパス → textures/ の中の .png / .tga
 * - animations → animations/ のアニメーション、animation_controllers/ のコントローラー
 * - render_controllers → render_controllers/ のレンダーコントローラー
 *
 * バニラのもの（geometry.pig など）を参照していることもあるので、見つからなくても警告にとどめる。
 */
import * as fs from 'node:fs';
import { join, relative, sep } from 'node:path';
import { listFiles } from './packFiles';

/** バニラにあるので、パックに無くてよいもの（フレームワークが自分で参照しているもの） */
const VANILLA_RENDER_CONTROLLERS = new Set(['controller.render.default']);
/** 部位の見た目（空のモデル）が指すテクスチャ */
const VANILLA_TEXTURES = new Set(['textures/blocks/glass']);

/** Bedrock の JSON はコメントを含むことがあるので、取り除いてから読む */
export function readJsonLoose(file: string): any {
  const text = fs.readFileSync(file, 'utf8');
  let out = '', i = 0, inStr = false;
  while (i < text.length) {
    const c = text[i], n = text[i + 1];
    if (inStr) {
      out += c;
      if (c === '\\') { out += n ?? ''; i += 2; continue; }
      if (c === '"') inStr = false;
      i++;
      continue;
    }
    if (c === '"') { inStr = true; out += c; i++; continue; }
    if (c === '/' && n === '/') { while (i < text.length && text[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { i += 2; while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i++; i += 2; continue; }
    out += c;
    i++;
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, '$1'));
}

const jsonFiles = (dir: string) => listFiles(dir).filter((f) => f.endsWith('.json'));

/** パックの中にある識別子を集める */
function collect(rp: string) {
  const geometries = new Set<string>();
  for (const f of jsonFiles(join(rp, 'models'))) {
    try {
      const d = readJsonLoose(f);
      for (const g of d['minecraft:geometry'] ?? []) if (g?.description?.identifier) geometries.add(g.description.identifier);
      // 古い形式（format_version 1.8.0 / 1.10.0）: "geometry.name" や "geometry.name:geometry.parent" がキー
      for (const k of Object.keys(d)) if (k.startsWith('geometry.')) geometries.add(k.split(':')[0]);
    } catch { /* 壊れた JSON はここでは見ない */ }
  }
  const animations = new Set<string>();
  for (const f of jsonFiles(join(rp, 'animations'))) {
    try { for (const k of Object.keys(readJsonLoose(f).animations ?? {})) animations.add(k); } catch { /* 同上 */ }
  }
  for (const f of jsonFiles(join(rp, 'animation_controllers'))) {
    try { for (const k of Object.keys(readJsonLoose(f).animation_controllers ?? {})) animations.add(k); } catch { /* 同上 */ }
  }
  const renderControllers = new Set<string>(VANILLA_RENDER_CONTROLLERS);
  for (const f of jsonFiles(join(rp, 'render_controllers'))) {
    try { for (const k of Object.keys(readJsonLoose(f).render_controllers ?? {})) renderControllers.add(k); } catch { /* 同上 */ }
  }
  const textures = new Set<string>(VANILLA_TEXTURES);
  for (const f of listFiles(join(rp, 'textures'))) {
    const rel = relative(rp, f).split(sep).join('/');
    const m = /^(.*)\.(png|tga|jpg|jpeg)$/i.exec(rel);
    if (m) textures.add(m[1]);
  }
  return { geometries, animations, renderControllers, textures };
}

/**
 * render_controllers の識別子を取り出す。正式には配列だが、文字列 1 つやオブジェクトで書かれていても扱う
 * （文字列をそのまま for...of で回すと、1 文字ずつになってしまうため）
 * - 配列の要素は、文字列（"controller.render.x"）か、条件付き（{ "controller.render.x": "q.is_baby" }）
 */
export function renderControllerIds(v: unknown): string[] {
  const items = Array.isArray(v) ? v : v === undefined || v === null ? [] : [v];
  return items.flatMap((rc) => (typeof rc === 'string' ? [rc] : rc && typeof rc === 'object' ? Object.keys(rc) : []));
}

/** 値（文字列 or { name: 値 }）を全部取り出す */
const values = (v: unknown): string[] => (typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v as Record<string, unknown>).filter((x): x is string => typeof x === 'string') : []);

/**
 * リソースパックの参照を確かめる
 * @returns 警告の文（見つからないもの 1 つにつき 1 行）
 */
export function checkResourceRefs(rp: string): string[] {
  if (!fs.existsSync(join(rp, 'entity'))) return [];
  const have = collect(rp);
  const warnings: string[] = [];
  for (const f of jsonFiles(join(rp, 'entity'))) {
    let d: any;
    try {
      d = readJsonLoose(f);
    } catch (e) {
      warnings.push(`${relative(rp, f)}: JSON として読めない（${(e as Error).message}）`);
      continue;
    }
    const desc = d?.['minecraft:client_entity']?.description;
    if (!desc) continue;
    const where = `${relative(rp, f).split(sep).join('/')}（${desc.identifier}）`;
    // 同じエンティティの中で、同じものを何度も参照していても 1 回だけ警告する
    const reported = new Set<string>();
    const miss = (kind: string, name: string, hint: string) => {
      if (reported.has(`${kind}:${name}`)) return;
      reported.add(`${kind}:${name}`);
      warnings.push(`${where}: ${kind} ${name} が見つからない（${hint}。バニラのものなら無視してよい）`);
    };
    for (const g of values(desc.geometry)) if (!have.geometries.has(g)) miss('geometry', g, 'assets/models/ にその識別子のモデルを置く');
    for (const t of values(desc.textures)) if (!have.textures.has(t)) miss('テクスチャ', t, `assets/${t}.png を置く`);
    for (const a of values(desc.animations)) if (!have.animations.has(a)) miss('アニメーション', a, 'assets/resource/animations/ か animation_controllers/ に置く');
    for (const id of renderControllerIds(desc.render_controllers)) {
      if (!have.renderControllers.has(id)) miss('レンダーコントローラー', id, 'assets/resource/render_controllers/ に置く');
    }
  }
  return warnings;
}
