import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import MainPagination from './MainPagination.vue'

describe('MainPagination', () => {
  test.each([[6, 0]])('should have indicators count (%i)', (itemsCount, sid) => {
    const component = mount(MainPagination, {
      props: { sid, itemsCount }
    })

    const indicatorEls = component.findAll('[data-test-id="pagination__item-indicator"]')
    const length = indicatorEls.length

    expect(length).toBe(itemsCount)
    expect(length).toMatchSnapshot()
  })

  test.each([12])('an indicator should have size (%i)', (size) => {
    const component = mount(MainPagination, {
      props: {
        size,
        sid: 1,
        itemsCount: 6
      }
    })

    const indicatorEls = component.findAll('[data-test-id="pagination__item-indicator"]')
    const indicatorStyle = indicatorEls[0].attributes('style')

    expect(indicatorStyle).toContain(`width: ${size}px;`)
    expect(indicatorStyle).toContain(`height: ${size}px;`)
    expect(indicatorStyle).toContain(`border-radius: ${size / 2}px;`)
    expect(indicatorStyle).toMatchSnapshot()
  })

  test.each([[0, 6]])('first indicator should have "active" class', (sid, itemsCount) => {
    const component = mount(MainPagination, {
      props: {
        sid,
        itemsCount
      }
    })

    const indicatorEls = component.findAll('[data-test-id="pagination__item-indicator"]')
    const firstIndicator = indicatorEls[0]
    const isActiveExist = firstIndicator.classes('active')

    expect(isActiveExist).toBe(true)
    expect(isActiveExist).toMatchSnapshot()
  })
})
