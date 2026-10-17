import { createServer, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { buildPack } from '../core/entity/pack';
import type { PackFiles } from '../core/entity/entity';
import mockMinecraftServer from './mockMinecraftServer';

/**
 * src/pack.ts を Node 上で読み込み、パックのファイルを作る。
 *
 * 定義のファイルは振る舞い（@minecraft/server を使うコード）も一緒に書くので、
 * @minecraft/server は hakomc/testing の模擬モジュールに差し替えて読み込む。
 *
 * @returns 作ったファイルと、watch で監視すべきファイル（pack.ts から辿った全ファイル）
 */
export async function loadPack(entry: string, root = process.cwd()): Promise<{ files: PackFiles, watchFiles: string[] }> {
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
  });
  try {
    const file = resolve(root, entry);
    const mod = await server.ssrLoadModule(file);
    const pack = mod.default;
    if (!pack || typeof pack !== 'object') {
      throw new Error(`${entry} は definePack({ ... }) を default export する`);
    }
    const files = buildPack(pack);
    return { files, watchFiles: [...loaded] };
  } finally {
    await server.close();
  }
}
