<template lang="pug">
main(
  :class="[`${PROTO_APP_PREFIX}-main-view`]"
)
  slot
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
</script>

<style lang="scss">
$main-view: (
  sm: (),
  md: (),
  lg: ()
);

.#{$PROTO_APP_PREFIX}-main-view {
  position: relative;
  display: block;
  @include box(100%);
  background-color: none;
  overflow: hidden;
}
</style>
