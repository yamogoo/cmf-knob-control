import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@app/router'
import App from '@app/App.vue'

import './assets/fonts/_fonts.scss'

export const app = createApp(App)
app.use(createPinia())
app.use(router)

export * from '@app/config'
