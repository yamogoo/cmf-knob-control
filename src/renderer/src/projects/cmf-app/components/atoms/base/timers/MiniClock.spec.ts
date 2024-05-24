import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { getCurrentTime } from '~@/utils'
import MiniClock from './MiniClock.vue'

describe('MiniClock', () => {
  const currentTime = getCurrentTime()

  test(`should render current time (${currentTime})`, () => {
    const component = mount(MiniClock)

    const timeEl = component.find('[data-test-id="mini-clock__time"]').text()
    expect(timeEl).toContain(String(currentTime))
    expect(timeEl).toMatchSnapshot()
  })
})
