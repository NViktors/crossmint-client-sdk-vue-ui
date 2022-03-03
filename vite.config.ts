import { resolve } from 'path';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    dedupe: ['vue'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CrossmintClientSDKVueUI',
      fileName: (format) => `crossmint-client-sdk-vue-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    minify: true,
    sourcemap: true,
  },
});
