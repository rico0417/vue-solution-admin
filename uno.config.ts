import { defineConfig, presetUno } from 'unocss';
/**
 * presetUno：此预设尝试提供流行的实用程序优先框架的通用超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。
 * https://unocss.dev/presets/uno#installation
 *
 *
 */
export default defineConfig({
  presets: [presetUno()]
});
