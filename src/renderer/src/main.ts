import './assets/fonts/_fonts.scss'

import { MAIN_APP_PREFIX } from '~@/config'

import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount(`#${MAIN_APP_PREFIX}`)

export * from '~@/config'
