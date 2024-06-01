import type { App } from 'vue';
import { SvgIcon } from './SvgIcon';

// 注册全局组件
export function registerGlobComp(app: App<Element>) {
  app.use(SvgIcon);
}
