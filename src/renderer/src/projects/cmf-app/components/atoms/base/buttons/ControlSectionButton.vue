<template lang="pug">
div(
  ref="refRoot"
  :class="[CLASS_NAME, {'focused': isFocused}, isPressed ? Statuses.PRESSED : Statuses.RELEASED]"
  data-testid="control-section-button"
  @mousedown="onMouseDown"
)
  slot
  slot(
    :name="`button_${id}`"
  )
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { APP_PREFIX } from '@app/config'
import g from 'gsap'

const CLASS_NAME = `${APP_PREFIX}-control-boxed-button`

interface Props extends ControlSectionButtonStateProps {
  id: number
  isKnobPressed: boolean
  isFocused: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPressable: true,
  isDisabled: false
})

const emit = defineEmits<{
  (e: 'onPress', id: number): void
}>()

const refRoot = ref<HTMLDivElement | null>(null)
const isPressed = ref(props.isKnobPressed)

const onMouseDown = (e: MouseEvent): void => {
  e.preventDefault()

  onPress(true)

  if (refRoot.value) {
    refRoot.value.addEventListener('mouseup', mouseUpHandler)
    refRoot.value.addEventListener('mouseout', mouseOutHandler)
    refRoot.value.addEventListener('mousemove', mouseMoveHandler)
  }
}

watch(
  () => props.isKnobPressed,
  () => {
    isPressed.value = props.isKnobPressed

    if (!isPressed.value) emit('onPress', props.id)
    if (props.isPressable) onAnimPress(isPressed.value)
  }
)

const mouseMoveHandler = (_e: MouseEvent) => {}

const mouseUpHandler = (e: MouseEvent) => {
  e.preventDefault()

  onPress(false)
  emit('onPress', props.id)
}

const mouseOutHandler = (e: MouseEvent) => {
  e.preventDefault()

  if (props.isPressable) onPress(false)

  if (refRoot.value) {
    refRoot.value.removeEventListener('mouseup', mouseUpHandler)
    refRoot.value.removeEventListener('mouseout', mouseOutHandler)
  }
}

onUnmounted(() => {
  if (props.isPressable) onPress(false)

  if (refRoot.value) {
    refRoot.value.removeEventListener('mouseup', mouseUpHandler)
    refRoot.value.removeEventListener('mouseout', mouseOutHandler)
  }
})

const onPress = (state: boolean) => {
  isPressed.value = state

  onAnimPress(isPressed.value)
}

/* * * Animations * * */

const onAnimPress = (state: boolean): void => {
  const scale = state ? 0.9 : 1

  if (refRoot.value) {
    g.to(refRoot.value, {
      scale,
      duration: 0.25,
      ease: 'power4.out'
    })
  }
}
</script>

<script lang="ts">
export enum Classes {}

export enum Statuses {
  PRESSED = 'pressed',
  RELEASED = 'released'
}

export interface ControlSectionButtonStateProps {
  isPressable?: boolean
  isDisabled?: boolean
}
</script>

<style lang="scss">
.#{$APP_PREFIX}-control-boxed-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  @include transition(color background-color, 25ms, ease-out);
  color: $GRAY;

  &.released {
    background-color: $GRAY_SHADOW;
  }

  &.focused {
    // background-color: lighten($GRAY_SHADOW, 9%);
    color: lighten($CARDAMON_FADE, 9%);
    background-color: lighten($CARDAMON, 9%);
  }

  &.pressed {
    background-color: lighten($GRAY_SHADOW, 21%);
  }
}
</style>
