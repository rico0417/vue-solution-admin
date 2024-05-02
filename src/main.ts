import { createApp } from 'vue';
import { setupElementPlus } from '@/plugins/elementPlus';
import { router, setupRouter } from '@/routers';
import { setupStore } from '@/stores';
import { setupPermission } from '@/permission';

import '@/styles/normalize.scss';
import '@/styles/common.scss';

import App from './App.vue';

const app = createApp(App);

// 引入pinia
setupStore(app);
// 引入elementPlus相关
setupElementPlus(app);
// 引入vue-router
setupRouter(app);
// 路由权限控制
setupPermission(router);

app.mount('#app');
