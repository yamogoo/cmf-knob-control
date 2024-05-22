<template lang="pug">
main(
  :class="[`${MAIN_APP_PREFIX}-main-view`]"
)
  slot
</template>

<script setup lang="ts">
import { MAIN_APP_PREFIX } from '@/config'
</script>

<style lang="scss">
$main-view: (
  sm: (),
  md: (),
  lg: ()
);

.#{$MAIN_APP_PREFIX}-main-view {
  position: relative;
  display: block;
  @include box(100%);
  background-color: none;
  overflow: hidden;
}
</style>
