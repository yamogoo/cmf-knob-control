import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import BasePage from './BasePage.vue'

describe('BasePage', () => {
  test.each(['<p>Slot Content</p>'])('should render default slot (%s)', (content) => {
    const component = mount(BasePage, {
      slots: {
        default: content
      }
    })

    const slotHtml = component.html()
    expect(slotHtml).toContain(content)
    expect(slotHtml).toMatchSnapshot()
  })
})
