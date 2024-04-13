// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element css
import "@/styles/element.scss";
import type { App } from "vue";

export function setupElementPlus(app: App<Element>) {
  // 引入elementPlus的组件
  app.use(ElementPlus);
  // 引入elementPlus的icon
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
}
