import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import MainView from './MainView.vue'

describe('MainView', () => {
  test.each(['<p>Slot Content</p>'])('should render default slot (%s)', (content) => {
    const component = mount(MainView, {
      slots: {
        default: content
      }
    })

    const slotHtml = component.html()
    expect(slotHtml).toContain(content)
    expect(slotHtml).toMatchSnapshot()
  })
})
