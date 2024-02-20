import { defineStore } from 'pinia'
import { PROTO_APP_PREFIX } from '@proto/config'

export interface LayoutState {
  navbar: {
    width: number
  }
}

export const useLayoutStore = defineStore<string, LayoutState>(`${PROTO_APP_PREFIX}-layout-store`, {
  state: () => ({
    navbar: {
      width: 320
    }
  })
})
