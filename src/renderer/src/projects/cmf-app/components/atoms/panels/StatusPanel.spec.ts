import '~@/__tests__/setup'

import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import StatusPanel from './StatusPanel.vue'

describe('StatusPanel', () => {
  test.each(['<p>Default Slot Content</p>'])(
    'should render default slot content (%s)',
    (slotContent) => {
      const component = mount(StatusPanel, {
        slots: {
          default: slotContent
        }
      })

      const statusPanelEl = component.find('[data-test-id="status-panel__info"]')
      const html = statusPanelEl.html()

      expect(html).toContain(slotContent)
      expect(html).toMatchSnapshot()
    }
  )

  test.each(['<p>Action Slot Content</p>'])(
    'should render default slot content (%s)',
    (slotContent) => {
      const component = mount(StatusPanel, {
        slots: {
          default: '',
          action: slotContent
        }
      })

      const statusPanelEl = component.find('[data-test-id="status-panel__action"]')
      const html = statusPanelEl.html()

      expect(html).toContain(slotContent)
      expect(html).toMatchSnapshot()
    }
  )

  test.each(['<p>Status Slot Content</p>'])(
    'should render default slot content (%s)',
    (slotContent) => {
      const component = mount(StatusPanel, {
        slots: {
          default: '',
          status: slotContent
        }
      })

      const statusPanelEl = component.find('[data-test-id="status-panel__status"]')
      const html = statusPanelEl.html()

      expect(html).toContain(slotContent)
      expect(html).toMatchSnapshot()
    }
  )
})
