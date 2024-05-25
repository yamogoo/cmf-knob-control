<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
  @leave="onLeave"
)
  div(
    v-if="show"
    :class="[`${PROTO_APP_PREFIX}-knob__led`]"    
  )
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
import g from 'gsap'

export interface Props {
  show?: boolean
}

withDefaults(defineProps<Props>(), {
  show: false
})

/* * * Animations * * */

const onEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0.0
    },
    {
      opacity: 1.0,
      ease: 'power4.out',
      duration: 0.35,
      onComplete: done
    }
  )
}

const onLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0.0,
    ease: 'power4.out',
    duration: 0.15,
    onComplete: done
  })
}
</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-knob__led {
}
</style>
