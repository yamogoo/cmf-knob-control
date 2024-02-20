import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import App from '@proto/App.vue'

import { APP_PREFIX } from '@app/main'

test('Renders CmfApp', async () => {
  const wrapper = mount(App, {
    global: {
      mocks: {
        $route: {
          path: '/'
        }
      }
    }
  })

  await nextTick()
  expect(wrapper.html()).toContain(`<div id="${APP_PREFIX}"></div>`)
})
