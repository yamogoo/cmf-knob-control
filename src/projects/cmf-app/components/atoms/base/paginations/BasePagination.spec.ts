import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import BasePagination from './BasePagination.vue'

describe('BasePagination', () => {
  test.each([
    [0, 9],
    [0, 6],
    [0, 3]
  ])('should render min: %i, max: %i, step: %i', (sid, itemsCount) => {
    const component = mount(BasePagination, {
      props: {
        sid,
        itemsCount
      }
    })

    const indicators = component.findAll('[data-test-id="pagination-indicator"]')
    const length = indicators.length

    expect(length).toBe(itemsCount)
    expect(indicators.length).toMatchSnapshot()
  })

  test.each(['<p id="test">Slot content</p>'])('should render slot content (%s)', (slotCOntent) => {
    const component = mount(BasePagination, {
      props: {
        sid: 1,
        itemsCount: 3
      },
      slots: {
        default: slotCOntent
      }
    })

    const indicators = component.findAll('[data-test-id="pagination-indicator"]')
    const html = indicators[0].html()

    expect(html).toContain(slotCOntent)
    expect(html).toMatchSnapshot()
  })
})
