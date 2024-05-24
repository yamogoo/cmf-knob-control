import { defineStore } from 'pinia'
import { PROTO_APP_PREFIX } from '@proto/config'
import type { Size } from '~@/typings/controls'

export interface LayoutState {
  navbar: {
    width: number
  }
  display: {
    size: Size
  }
}

export const useLayoutStore = defineStore<string, LayoutState>(`${PROTO_APP_PREFIX}-layout-store`, {
  state: () => ({
    navbar: {
      width: 320
    },
    display: {
      size: {
        width: 640,
        height: 480
      }
    }
  })
})
