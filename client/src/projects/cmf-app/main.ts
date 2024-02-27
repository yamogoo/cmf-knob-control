import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@app/router'
import App from '@app/App.vue'
import Vue3Lottie from 'vue3-lottie'

import './assets/fonts/_fonts.scss'

export const app = createApp(App)
app.use(createPinia())
app.use(Vue3Lottie, { name: 'Lottie' })
app.use(router)

export * from '@app/config'
