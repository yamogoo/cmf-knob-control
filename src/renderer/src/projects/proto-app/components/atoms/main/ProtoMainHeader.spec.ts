import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ProtoMainHeader from './ProtoMainHeader.vue'

describe('ProtoMainHeader', () => {
  test('header should render MainNavigation component', () => {
    const component = mount(ProtoMainHeader)

    const navEl = component.find('[data-test-id="main-navigation"]')
    const isNavElExist = navEl.exists()

    expect(isNavElExist).toBe(true)
    expect(isNavElExist).toMatchSnapshot()
  })
})
