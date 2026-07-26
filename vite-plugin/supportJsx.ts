import type { Plugin } from 'vite';

const supportJsx = (): Plugin => ({
  name: 'SupportJsx',
  config: () => {
    return {
      esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'hakomc/form',
      },
    };
  },
});

export default supportJsx;
