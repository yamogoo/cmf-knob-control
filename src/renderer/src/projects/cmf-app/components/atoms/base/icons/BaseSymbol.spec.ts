import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

import BaseSymbol from './BaseSymbol.vue'

describe('BaseSymbol', () => {
  test.each(['./symbols/AttentionSymbol.vue', './symbols/AutoSymbol.vue'])(
    'should render svg DOM element (path: %s)',
    async (path) => {
      const component = mount(BaseSymbol, {
        props: {
          path
        }
      })

      await vi.dynamicImportSettled()

      const svg = component.find('svg')
      const isSVGExis = svg.exists()

      expect(isSVGExis).toBe(true)
      expect(isSVGExis).toMatchSnapshot()
    }
  )

  test.each([''])('should render ', async () => {
    const component = mount(BaseSymbol, {
      props: {
        path: './symbols/AttentionSymbol.vue'
      }
    })

    await vi.dynamicImportSettled()

    const svg = component.find('svg')
    const isSVGExis = svg.exists()

    expect(isSVGExis).toBe(true)
    expect(isSVGExis).toMatchSnapshot()
  })
})
