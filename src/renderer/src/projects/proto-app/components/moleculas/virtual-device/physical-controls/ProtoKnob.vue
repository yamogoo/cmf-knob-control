<template lang="pug">
div(
    ref="refRoot"
    :class="[`${PROTO_APP_PREFIX}-knob`]"
    :style="size"
    @pointerdown="onRingCursorDown"
)
    div(:class="[`${PROTO_APP_PREFIX}-knob-container`]")
        div(:class="`${PROTO_APP_PREFIX}-knob__info`")
            div(:class="`${PROTO_APP_PREFIX}-knob__info-container`")
                span(
                    v-if="showAngle"
                    :class="`${PROTO_APP_PREFIX}-knob__button__descriptor`"
                )
        div(
            :class="`${PROTO_APP_PREFIX}-knob__ring`"
            :style="`transform: rotate(${angle}deg);`"
        )
            svg(:class="`${PROTO_APP_PREFIX}-knob__ring`" width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg")
                circle(cx="3" cy="3" r="2.75" transform="matrix(1 0 0 -1 157 25.406)" fill="black" stroke="black" stroke-width="0.5")
        div(
            ref="refButton"
            :class="[`${PROTO_APP_PREFIX}-knob__button`, {'focused': isButtonFocused}]"
            :style="`width: ${buttonSize}px; height: ${buttonSize}px;`"
        )
            Transition(
                :css="false"
                @enter="onButtonEnter"
                @leave="onButtonLeave"
            )
                div(
                    v-if="isButtonFocused"
                    :class="`${PROTO_APP_PREFIX}-knob__button__visible-layer`"
                )
                    span(:class="`${PROTO_APP_PREFIX}-knob__button__visible-layer__action`") Press
                    ProtoKnobLayer02
        div(
            :class="`${PROTO_APP_PREFIX}-knob__texture`"
        )
            ProtoKnobLayer01
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { PROTO_APP_PREFIX } from '@proto/config'

import g from 'gsap'
import { debounce } from '@utils/index'
import type { Point, KnobEmittedData } from '@typings/index'

import ProtoKnobLayer01 from './ProtoKnobLayer01.vue'
import ProtoKnobLayer02 from './ProtoKnobLayer02.vue'

export interface Props {
  size?: number
  buttonSize?: number
  showAngle?: boolean
  numStepsPerRound?: number
  stopWhenPointerOut?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 320,
  buttonSize: 220,
  showAngle: true,
  numStepsPerRound: 6,
  stopWhenPointerOut: false
})

const emit = defineEmits<{
  (e: 'onUpdateData', data: KnobEmittedData): void
  (e: 'onTurnLeft', data: KnobEmittedData): void
  (e: 'onTurnRight', data: KnobEmittedData): void
  (e: 'onPress', data: KnobEmittedData): void
  (e: 'onRelease', data: KnobEmittedData): void
}>()

const refRoot = ref<HTMLDivElement | null>(null)
const refButton = ref<HTMLDivElement | null>(null)

const size = computed(() => `width: ${props.size}px; height: ${props.size}px;`)

/* * * Events * * */

const angle = ref(0)
const count = ref(0)
const isButtonFocused = ref(false)

let prevAngle = 0,
  dir = 0,
  isManipulatingStart = false

onMounted(() => {
  if (refButton.value) {
    refButton.value.addEventListener('pointerenter', buttonPointerEnterHandler)
    refButton.value.addEventListener('pointerdown', buttonPointerDownHandler)
    refButton.value.addEventListener('pointerleave', buttonPointerLeaveHandler)
  }
})

onUnmounted(() => {
  if (refButton.value) {
    refButton.value.removeEventListener('pointerdown', buttonPointerDownHandler)
    refButton.value.removeEventListener('pointerleave', buttonPointerDownHandler)
    refButton.value.removeEventListener('pointerenter', buttonPointerEnterHandler)
  }

  if (refRoot.value) {
    document.removeEventListener('pointerup', ringPointerUpHandler)
    document.removeEventListener('pointermove', ringPointerMoveHandler)
    document.removeEventListener('pointerout', ringPointerOutHandler)
  }
})

const getOffset = (e: MouseEvent): Point => {
  if (refRoot.value) {
    const rect = refRoot.value?.getBoundingClientRect()
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }

    const offsetX = e.clientX - center.x
    const offsetY = center.y - e.clientY

    return { x: offsetX, y: offsetY }
  }
  return { x: 0, y: 0 }
}

const onRingCursorDown = (): void => {
  if (refRoot.value) {
    isManipulatingStart = true

    document.addEventListener('pointerup', ringPointerUpHandler)
    document.addEventListener('pointermove', ringPointerMoveHandler)

    if (props.stopWhenPointerOut) document.addEventListener('pointerout', ringPointerOutHandler)
  }
}

/* * * Ring (Rotary Encoder) * * */

const ringPointerMoveHandler: (e: MouseEvent) => void = debounce((e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  if (refRoot.value) {
    const { x, y } = getOffset(e)
    onTurn(x, y)
  }
}, 0.5)

const calcAngle = (x: number, y: number): number => {
  if (x >= 0 && y > 0) return Math.atan(x / y)
  else if (y > 0 && x < 0) return 2 * Math.PI + Math.atan(x / y)
  return Math.PI + Math.atan(x / y)
}

const onTurn = (offsetX: number, offsetY: number) => {
  prevAngle = angle.value

  angle.value = Math.round((calcAngle(offsetX, offsetY) * 180) / Math.PI)

  // Find direction:
  if (prevAngle !== angle.value && Math.abs(angle.value - prevAngle) === 1) {
    dir = angle.value - prevAngle
  }

  if (props.numStepsPerRound > 0) {
    count.value = Math.round((angle.value / 360) * props.numStepsPerRound)
  } else {
    throw new Error('Knob: numStepsPerRound must be greater than zero.')
  }
}

watch(count, (prev, next) => {
  if (!isManipulatingStart) {
    const data: KnobEmittedData = { dir, count: next, angle: angle.value }

    if (prev !== next) emit('onUpdateData', data)

    if (dir === 1) emit('onTurnRight', data)
    else if (dir === -1) emit('onTurnLeft', data)
  }
  isManipulatingStart = false
})

const ringPointerUpHandler = (e: MouseEvent): void => {
  e.stopPropagation()

  document.removeEventListener('pointerup', ringPointerUpHandler)
  document.removeEventListener('pointermove', ringPointerMoveHandler)

  if (props.stopWhenPointerOut) document.removeEventListener('pointerout', ringPointerOutHandler)
}

const ringPointerOutHandler = (): void => {
  document.removeEventListener('pointerup', ringPointerUpHandler)
  document.removeEventListener('pointermove', ringPointerMoveHandler)
  if (props.stopWhenPointerOut) document.removeEventListener('pointerout', ringPointerOutHandler)
}

/* * * Button (Physical Button) * * */

const onPress = (state: boolean): void => {
  const data: KnobEmittedData = { dir: 0, count: count.value, angle: angle.value }
  emit('onUpdateData', data)

  state ? emit('onPress', data) : emit('onRelease', data)
  onAnimPress(state)
}

const buttonPointerEnterHandler = (): void => {
  isButtonFocused.value = true
}
const buttonPointerLeaveHandler = (): void => {
  isButtonFocused.value = false
}

const buttonPointerDownHandler = (): void => {
  document.addEventListener('pointerup', buttonringMouseUpHandler)
  onPress(true)
}

const buttonringMouseUpHandler = (): void => {
  onPress(false)
}

/* * * Animations * * */

const onAnimPress = (state: boolean): void => {
  const scale = state ? 0.95 : 1.0
  const duration = state ? 0.15 : 0.35

  if (refRoot.value)
    g.to(refRoot.value, {
      scale,
      duration,
      ease: 'power4.out'
    })
}

const onButtonEnter = (el: Element, done: () => void): void => {
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

const onButtonLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0.0,
    ease: 'power4.out',
    duration: 0.35,
    onComplete: done
  })
}
</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-knob {
  position: relative;
  border-radius: 100%;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  touch-action: none;
  user-select: none;
  cursor: pointer;

  * {
    pointer-events: none;
  }

  &-container {
    position: relative;
    @include box(100%);
  }

  &__info {
    position: absolute;
    top: 0;
    left: 0;
    @include box(100%);
    z-index: 2;

    &-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      @include box(inherit);
    }
  }

  &__ring {
    position: relative;
    display: block;
    @include box(inherit);
    z-index: 1;

    &__indicator {
      position: absolute;
      display: block;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      background-color: $BLACK;
    }
  }

  &__texture {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }

  &__button {
    position: absolute;
    width: max-content;
    height: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    z-index: 1;
    pointer-events: painted;

    &__visible-layer {
      &__action {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
