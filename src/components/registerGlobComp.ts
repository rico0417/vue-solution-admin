import type { App } from 'vue';
import { SvgIcon } from './SvgIcon';

export function registerGlobComp(app: App<Element>) {
  app.use(SvgIcon);
}
