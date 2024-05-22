<template lang="pug">
lottie(
  ref="refRoot"
  :style="`width: ${100}%; height: ${100}%;`"
  :animation-data="animationData"
  :animation-link="animationLink"
  :loop="loop"
  :auto-play="autoplay"
  :renderer-settings="settings.renderSettings"
  @on-complete="onAnimCompleted"
  @on-loop-complete="onAnimCompleted"
  @on-animation-loaded="onAnimLoaded"
)
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const settings = reactive({
  direction: 'forward',
  renderSettings: {}
})

const refRoot = ref<any | null>(null)

/* * * Props * * */

export interface Props {
  animationData?: object | undefined
  animationLink?: string
  name?: string
  loop?: boolean
  speed?: number
  delay?: number
  autoplay?: boolean
  renderer?: string
}

withDefaults(defineProps<Props>(), {
  animationData: undefined,
  animationLink: undefined,
  name: 'default',
  loop: false,
  autoplay: false,
  speed: 1,
  delay: 0,
  renderer: 'none'
})

/* * * Events * * */

const emit = defineEmits<{
  (e: 'onAnimCompleted'): void
  (e: 'onAnimLoaded'): void
  (e: 'getDuration', duration: number): void
}>()

const onAnimCompleted = () => {
  emit('onAnimCompleted')
}

const onAnimLoaded = () => {
  emit('onAnimLoaded')
}
</script>
