<template lang="pug">
div(:class="[`${PROTO_APP_PREFIX}-screen`]")
  slot
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-screen {
  position: relative;
  border-radius: 32px;
  border: 1px solid rgb(34, 34, 34);
  background-color: black;
  @include box(100%);
  overflow: hidden;
}
</style>
