<template lang="pug">
div(
  :class="[CLASS_NAME,`${CLASS_NAME}--${size}`]"
  data-test-id="base-sign"
)
  BaseIcon(
    :name="name"
    data-test-id="base-icon"
  )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config'
import BaseIcon, { Icons } from './BaseIcon.vue'

interface Props {
  name: Icons
  size?: Sizes
}

withDefaults(defineProps<Props>(), {
  size: Sizes.SM
})
</script>

<script lang="ts">
export { Icons } from './BaseIcon.vue'

export enum Sizes {
  SM = 'sm',
  MD = 'md',
  LG = 'lg'
}

export const CLASS_NAME = `${APP_PREFIX}-sign`
</script>

<style lang="scss">
.#{$APP_PREFIX}-sign {
  &--sm {
    @include box(32px);
  }

  &--md {
    @include box(36px);
  }

  &--lg {
    @include box(40px);
  }
}
</style>
