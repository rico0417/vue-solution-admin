import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import ContextMenu from '@imengyu/vue3-context-menu';
import type { App } from 'vue';

export function setupContextMenu(app: App<Element>) {
  // https://github.com/imengyu/vue3-context-menu?tab=readme-ov-file
  app.use(ContextMenu);
}
