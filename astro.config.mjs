// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // リンクにマウスを乗せた時点で次のページを先読みして、移動を速くする
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
