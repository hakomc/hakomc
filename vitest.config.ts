import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'core'),
      '@minecraft/server-ui': resolve(__dirname, 'tests/stubs/server-ui.ts'),
      '@minecraft/server-net': resolve(__dirname, 'tests/stubs/server-net.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
