<template lang="pug">
div(
  :class="[`${APP_PREFIX}-manual-mode`]"
)
  Transition(
    :css="false"
    @enter="onEnter"
    @leave="onLeave"
  )
    BasePage
      h1(:style="`color: white;`") Manual Mode
      BaseSwitch(
        :is-active="switchState"
        @on-update-value="onToggleSwitch"
      )
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { APP_PREFIX } from '@app/config'
import g from 'gsap'

import BasePage from '@app/components/atoms/base/pages/BasePage.vue'
import BaseSwitch from '@app/components/atoms/base/controls/BaseSwitch.vue'

export interface Props {}

withDefaults(defineProps<Props>(), {})

const switchState = ref(false)

const onToggleSwitch = (state: boolean): void => {
  switchState.value = state
}

/* * * Animations * * */

const onEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0.0,
      scale: 0.5
    },
    {
      opacity: 1,
      scale: 1,
      ease: 'power4.out',
      duration: 0.35,
      onComplete: done
    }
  )
}

const onLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0.0,
    scale: 0.5,
    ease: 'power4.out',
    duration: 0.35,
    onComplete: done
  })
}
</script>
