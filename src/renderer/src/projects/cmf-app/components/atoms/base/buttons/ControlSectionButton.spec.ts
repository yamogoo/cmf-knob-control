import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import ControlSectionButton from './ControlSectionButton.vue'

describe('ControlSectionButton', () => {
  test.each([1, 2, 3])('should emit "onPress" event with id = (%i)', (id) => {
    const component = mount(ControlSectionButton, {
      props: {
        id,
        isKnobPressed: false,
        isFocused: false
      }
    })

    const buttonEl = component.find('[data-test-id="control-section-button"]')
    buttonEl.trigger('mousedown')
    buttonEl.trigger('mouseup')

    const emmitedId = (component.emitted('onPress') as Array<Array<number>>)[0][0]
    expect(emmitedId).toBe(id)
    expect(component.emitted('onPress')).toMatchSnapshot()
  })

  test.each(['<p>Slot Content</p>'])('should render slot content (%s)', (slotContent) => {
    const component = mount(ControlSectionButton, {
      slots: {
        default: slotContent
      }
    })

    const html = component.find('[data-test-id="control-section-button"]').html()
    expect(html).toContain(slotContent)
    expect(html).toMatchSnapshot()
  })

  test.each(['focused', 'released'])('should have "%s" class', (className) => {
    const component = mount(ControlSectionButton, {
      props: {
        id: 1,
        isFocused: true,
        isKnobPressed: false
      }
    })

    const buttonEl = component.find('[data-test-id="control-section-button"]')

    expect(buttonEl.classes(className)).toBe(true)
    expect(buttonEl.classes()).toMatchSnapshot()
  })

  test.each(['pressed'])(
    'should have "%s" class by passign "isKnobPressed" prop from parent',
    (className) => {
      const component = mount(ControlSectionButton, {
        props: {
          id: 1,
          isFocused: false,
          isKnobPressed: true
        }
      })

      const buttonEl = component.find('[data-test-id="control-section-button"]')

      expect(buttonEl.classes(className)).toBe(true)
      expect(buttonEl.classes()).toMatchSnapshot()
    }
  )

  test.each(['pressed'])('should have "%s" class by pressing the button', (className) => {
    const component = mount(ControlSectionButton, {
      props: {
        id: 1,
        isFocused: false,
        isKnobPressed: true
      }
    })

    const buttonEl = component.find('[data-test-id="control-section-button"]')
    buttonEl.trigger('mousedown')

    expect(buttonEl.classes(className)).toBe(true)
    expect(buttonEl.classes()).toMatchSnapshot()
  })
})
