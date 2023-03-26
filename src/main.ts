import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/pages/main/index.vue'
import router from '@/app/routes'

import '@/app/assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
