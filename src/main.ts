import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupElementPlus } from '@/plugins/elementPlus'
import { setupRouter } from '@/routers'

import App from './App.vue'

import '@/styles/normalize.scss'
import '@/styles/common.scss'

const app = createApp(App)

// 引入elementPlus相关
setupElementPlus(app)
app.use(createPinia())
// 引入vue-router
setupRouter(app)

app.mount('#app')
