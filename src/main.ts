import { createApp } from 'vue';
import { setupElementPlus } from '@/plugins/elementPlus';
import { router, setupRouter } from '@/routers';
import { setupStore } from '@/stores';
import { setupPermission } from '@/permission';
import { setupI18n } from '@/plugins/languages';
import { registerGlobComp } from '@/components/registerGlobComp';

import '@/styles/normalize.scss';
import '@/styles/common.scss';

import App from './App.vue';

const app = createApp(App);

// 引入pinia
setupStore(app);
// 注册全局组件
registerGlobComp(app);
// 引入elementPlus相关
setupElementPlus(app);
// 引入vue-router
setupRouter(app);
// 路由权限控制
setupPermission(router);
// i18n
setupI18n(app);

app.mount('#app');
