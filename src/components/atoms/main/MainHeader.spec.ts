import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import MainHeader from './MainHeader.vue'

describe('MainHeader', () => {
  test('header should render MainNavigation component', () => {
    const component = mount(MainHeader)

    const navEl = component.find('[data-test-id="main-navigation"]')
    const isNavElExist = navEl.exists()

    expect(isNavElExist).toBe(true)
    expect(isNavElExist).toMatchSnapshot()
  })
})
