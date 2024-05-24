<template lang="pug">
div(
  :id="`${MAIN_APP_PREFIX}-main-toolbar`"
  :class="[`${MAIN_APP_PREFIX}-main-toolbar`]"
)
  div(
    :class="[`${MAIN_APP_PREFIX}-main-toolbar__container`]"
  )
</template>

<script setup lang="ts">
import { MAIN_APP_PREFIX } from '~@/config'

// export interface Props {
//   width?: number
// }

// const props = withDefaults(defineProps<Props>(), {
//   width: 320
// })

// const styleObject = computed(() => {
//   return `width: ${props.width}px;`
// })
</script>

<style lang="scss">
.#{$MAIN_APP_PREFIX}-main-toolbar {
  position: relative;
  width: 320px;
  padding: 10px;
  background-color: $GRAY_FADE;
  overflow: hidden;

  .#{$MAIN_APP_PREFIX}-main-toolbar__container {
    position: relative;
    display: block;
    @include box(100%);
    background-color: $WHITE;
    border-radius: 12px;
  }

  //   display: flex;
  //   flex-direction: column;
  //   @include box(inherit);
  //   overflow: hidden;
}
</style>
