import { createServer, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { buildPack } from '../core/entity/pack';
import type { EntityClass, PackFiles } from '../core/entity/entity';
import { registry, resetRegistry } from '../core/entity/registry';
import mockMinecraftServer from './mockMinecraftServer';

export class PackLoadError extends Error {
  constructor(message: string, readonly registered: number, readonly isDefinitionError: boolean) {
    super(message);
  }
}

/**
 * スクリプトの入口（src/index.ts）か src/pack.ts を Node 上で読み込み、パックのファイルを作る。
 *
 * - default export が definePack({ ... }) なら、それを使う
 * - そうでなければ、読み込み中に register() されたエンティティを使う
 *
 * 定義のファイルには振る舞い（@minecraft/server を使うコード）も一緒に書くので、
 * @minecraft/server は hakomc/testing の模擬モジュールに差し替えて読み込む。
 *
 * @returns 作ったファイル、使ったエンティティの数、watch で監視すべきファイル（入口から辿った全ファイル）
 */
export async function loadPack(entry: string, root = process.cwd()): Promise<{ files: PackFiles, entities: number, watchFiles: string[] }> {
  // 読み込んだファイルを、自前のプラグインで記録する（Vite のモジュールグラフの内部には頼らない）
  const loaded = new Set<string>();
  const recordLoaded: Plugin = {
    name: 'hakomc:record-pack-files',
    transform(_code, id) {
      const file = id.split('?')[0];
      if (file.startsWith(root) && !file.includes('/node_modules/')) loaded.add(file);
      return null;
    },
  };
  const server = await createServer({
    configFile: false,
    root,
    logLevel: 'silent',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [mockMinecraftServer(), recordLoaded],
    // 依存パッケージ（hakomc 自身も）の中の @minecraft/server も模擬に差し替えるため、全て Vite で処理する
    ssr: { noExternal: true },
  });
  resetRegistry();
  try {
    let mod: Record<string, unknown>;
    try {
      mod = await server.ssrLoadModule(resolve(root, entry));
    } catch (e) {
      const err = e as Error;
      throw new PackLoadError(err?.message ?? String(e), registry().size, err?.name === 'EntityDefinitionError');
    }
    const pack = mod.default as { entities?: EntityClass[] } | undefined;
    const entities = pack && typeof pack === 'object' && Array.isArray(pack.entities)
      ? pack.entities
      : [...registry().values()].map((r) => r.cls as unknown as EntityClass);
    try {
      return { files: buildPack({ entities }), entities: entities.length, watchFiles: [...loaded] };
    } catch (e) {
      throw new PackLoadError((e as Error).message, entities.length, true);
    }
  } finally {
    resetRegistry();
    await server.close();
  }
}
