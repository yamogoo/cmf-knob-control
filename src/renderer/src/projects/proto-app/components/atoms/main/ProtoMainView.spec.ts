import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import ProtoMainView from './ProtoMainView.vue'

describe('ProtoMainView', () => {
  test.each(['<p>Slot Content</p>'])('should render default slot (%s)', (content) => {
    const component = mount(ProtoMainView, {
      slots: {
        default: content
      }
    })

    const slotHtml = component.html()
    expect(slotHtml).toContain(content)
    expect(slotHtml).toMatchSnapshot()
  })
})
