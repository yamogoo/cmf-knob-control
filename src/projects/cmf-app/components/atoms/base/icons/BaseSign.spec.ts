import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

import BaseSign, { Icons } from './BaseIcon.vue'

describe('BaseSign', () => {
  test.each([Icons.ASSISTED, Icons.ATTENTION])('should render Icon (name="%s")', async (name) => {
    const component = mount(BaseSign, {
      props: {
        name
      }
    })

    await vi.dynamicImportSettled()

    const iconEl = component.find('svg')
    const isIconElExist = iconEl.exists()

    expect(isIconElExist).toBe(true)
    expect(isIconElExist).toMatchSnapshot()
  })
})
