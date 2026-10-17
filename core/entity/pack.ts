import { EntityDefinitionError, type EntityClass, type PackFiles } from './entity';

export interface PackDefinition {
  entities?: EntityClass[];
}

/**
 * パックの中身をまとめる。src/pack.ts で default export すると、ビルド時に JSON が作られる。
 *
 * ```ts
 * // src/pack.ts
 * export default definePack({ entities: [Morgrave] });
 * ```
 */
export const definePack = (def: PackDefinition): PackDefinition => def;

/** パックの定義から、書き出すファイルを全部作る */
export function buildPack(def: PackDefinition): PackFiles {
  const out: PackFiles = { behavior: {}, resource: {}, lang: {} };
  const seen = new Map<string, EntityClass>();
  for (const e of def.entities ?? []) {
    const prev = seen.get(e.id);
    if (prev && prev !== e) throw new EntityDefinitionError(`エンティティ ${e.id} が 2 つ定義されている`);
    seen.set(e.id, e);
    if (prev) continue;
    const files = e.toFiles();
    for (const side of ['behavior', 'resource'] as const) {
      for (const [path, json] of Object.entries(files[side])) {
        if (out[side][path]) throw new EntityDefinitionError(`${path} が複数のエンティティから作られている（識別子の名前の部分が同じ）`);
        out[side][path] = json;
      }
    }
    for (const [code, lines] of Object.entries(files.lang)) (out.lang[code] ??= []).push(...lines);
  }
  return out;
}
