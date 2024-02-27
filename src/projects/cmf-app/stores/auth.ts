import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    isConnected: false
  })
})
