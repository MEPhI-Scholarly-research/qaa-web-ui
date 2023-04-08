import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/app/routes'

import '@/app/styles/reset.css'
import '@/app/styles/vars.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
