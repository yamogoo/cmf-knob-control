import { createRouter, createWebHistory } from 'vue-router'
import { _ROOT_PATH_PREFIX, absoluteUrls } from './urls'

const routes = [
  {
    alias: _ROOT_PATH_PREFIX,
    path: `${absoluteUrls.SPLASH}`,
    component: () => import('../views/SplashScreenView.vue')
  },
  {
    path: `${absoluteUrls.STANDBY}`,
    name: 'Standby Screen',
    component: () => import('../views/StandbyScreenView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
