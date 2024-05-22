import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Icons } from './icons'
import BaseIcon from './BaseIcon.vue'

describe('BaseIcon', () => {
  test.each(Object.values(Icons))('should render %s icon from "Icons" data set', async (name) => {
    const component = mount(BaseIcon, {
      props: {
        show: true,
        name
      }
    })

    await vi.dynamicImportSettled()

    const res = component.find('svg')

    expect(res.exists()).toBe(true)
    expect(res.exists()).toMatchSnapshot()
  })
})
