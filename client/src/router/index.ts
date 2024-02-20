import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '/cmf/proto',
    component: () => import('../views/HomeView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
