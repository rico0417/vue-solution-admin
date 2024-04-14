import { createApp } from 'vue'
import { setupElementPlus } from '@/plugins/elementPlus'
import { setupRouter } from '@/routers'
import { setupStore } from '@/stores'

import App from './App.vue'

import '@/styles/normalize.scss'
import '@/styles/common.scss'

const app = createApp(App)

// 引入elementPlus相关
setupElementPlus(app)
// 引入vue-router
setupRouter(app)
// 引入pinia
setupStore(app)

app.mount('#app')
