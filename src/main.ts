import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupElementPlus } from '@/plugins/elementPlus'

import App from './App.vue'
import router from './router'

import '@/styles/normalize.scss'

const app = createApp(App)

// 引入elementPlus相关
setupElementPlus(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
