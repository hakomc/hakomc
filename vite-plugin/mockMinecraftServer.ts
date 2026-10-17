import type { Plugin } from 'vite';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** [ビルド後の dist/vite-plugin/index.js から見た位置, ソース（vite-plugin/*.ts）から見た位置] */
const TARGETS: Record<string, [string, string]> = {
  '@minecraft/server': ['../testing/server/index.js', '../core/testing/server.ts'],
  '@minecraft/server-ui': ['../testing/server-ui/index.js', '../core/testing/serverUi.ts'],
  '@minecraft/server-net': ['../testing/server-net/index.js', '../core/testing/serverNet.ts'],
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
    // 普段はビルド後の dist から。hakomc 自身のテストではソースから動くので、そちらも探す
    for (const t of target) {
      const file = fileURLToPath(new URL(t, import.meta.url));
      if (existsSync(file)) return file;
    }
    return null;
  },
});

export default mockMinecraftServer;
