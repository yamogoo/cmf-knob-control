<template lang="pug">
div(
  :id="`${PROTO_APP_PREFIX}-main-toolbar`"
  :class="[`${PROTO_APP_PREFIX}-main-toolbar`]"
)
  div(
    :class="[`${PROTO_APP_PREFIX}-main-toolbar__container`]"
  )
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-main-toolbar {
  position: relative;
  width: 320px;
  padding: 10px;
  background-color: $GRAY_FADE;
  overflow: hidden;

  .#{$PROTO_APP_PREFIX}-main-toolbar__container {
    position: relative;
    display: block;
    @include box(100%);
    background-color: $WHITE;
    border-radius: 12px;
  }
}
</style>
