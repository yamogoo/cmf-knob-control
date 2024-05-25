<template lang="pug">
div(
  ref="refRoot"
  :class="[`${APP_PREFIX}-switch`]"
  @click="onUpdateValue"
)
  div(
    ref="refTrack"
    :class="[`${APP_PREFIX}-switch__track`]"
  )
    div(
      ref="refKnob"
      :class="[`${APP_PREFIX}-switch__knob`]"
    )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config'

interface Props {
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  (e: 'onUpdateValue', state: boolean): void
}>()

const onUpdateValue = (): void => {
  emit('onUpdateValue', !props.isActive)
}
</script>

<style lang="scss">
.#{$APP_PREFIX}-switch {
  @include box(32px);
  background-color: red;

  &__track {
  }

  &__knob {
  }
}
</style>
