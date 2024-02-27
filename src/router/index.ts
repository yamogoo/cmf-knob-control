import { createRouter, createWebHistory } from 'vue-router'
import { CMF_PREFIX } from './urls'

const routes = [
  {
    alias: '/',
    path: `${CMF_PREFIX}:pathMatch(.*)*`,
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
