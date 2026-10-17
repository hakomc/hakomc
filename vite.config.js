import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { resolve } from 'path';

export default defineConfig({
  plugins: [dts({ exclude: ['tests/**/*'], clearPureImport: false })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'core'),
    },
  },
  build: {
    ssr: true,
    lib: {
      entry: {
        'index': resolve(__dirname, 'core/index.ts'),
        'form/jsx-runtime/index': resolve(__dirname, 'core/form/runtime.ts'),
        'form/component/index': resolve(__dirname, 'core/form/components/index.ts'),
        'form/ddui/component/index': resolve(__dirname, 'core/form/ddui/components/index.ts'),
        'vite-plugin/index': resolve(__dirname, 'vite-plugin/index.ts'),
        'testing/index': resolve(__dirname, 'core/testing/index.ts'),
        'testing/server/index': resolve(__dirname, 'core/testing/server.ts'),
        'testing/server-ui/index': resolve(__dirname, 'core/testing/serverUi.ts'),
        'testing/server-net/index': resolve(__dirname, 'core/testing/serverNet.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        '@minecraft/server',
        '@minecraft/server-net',
        '@minecraft/server-ui',
        'path',
        'node:crypto',
        'node:fs',
        'node:url',
      ],
    }
  },
});
