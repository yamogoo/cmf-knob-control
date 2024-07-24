import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import SplashScreenLogo from './SplashScreenLogo.vue'

describe('SplashScreenLogo', () => {
  test('should render lottie icon DOM element', async () => {
    const component = mount(SplashScreenLogo)

    const lottieEl = component.find('[data-testid="lottie"]')
    const isLottieElExist = lottieEl.exists()

    expect(isLottieElExist).toBe(true)
    expect(isLottieElExist).toMatchSnapshot()
  })
})
