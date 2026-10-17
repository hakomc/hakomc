import type { Plugin } from 'vite';
import { fileURLToPath } from 'node:url';

const TARGETS: Record<string, string> = {
  '@minecraft/server': '../testing/server/index.js',
  '@minecraft/server-ui': '../testing/server-ui/index.js',
  '@minecraft/server-net': '../testing/server-net/index.js',
};

/**
 * テスト（Vitest）で `@minecraft/server` を hakomc/testing の模擬モジュールに差し替える。
 * `@minecraft/server-ui` / `@minecraft/server-net` も型定義だけのパッケージなので、名前をそろえたスタブに差し替える。
 *
 * ```ts
 * // vitest.config.ts
 * import { defineConfig } from 'vitest/config';
 * import { mockMinecraftServer } from 'hakomc/vite-plugin';
 * export default defineConfig({ plugins: [mockMinecraftServer()] });
 * ```
 */
const mockMinecraftServer = (): Plugin => ({
  name: 'MockMinecraftServer',
  enforce: 'pre',
  resolveId(id) {
    const target = TARGETS[id];
    if (!target) return null;
    // ビルド後の dist/vite-plugin/index.js から見た位置
    return fileURLToPath(new URL(target, import.meta.url));
  },
});

export default mockMinecraftServer;
