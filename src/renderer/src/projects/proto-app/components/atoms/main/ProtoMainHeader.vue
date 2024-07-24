<template lang="pug">
header(
  :class="[`${PROTO_APP_PREFIX}-main-header`]"
)
  ProtoMainNavigation(
    data-testid="main-navigation"
  )
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'

import ProtoMainNavigation from '@proto/components/atoms/main/ProtoMainNavigation.vue'
</script>

<style lang="scss">
$main-header: (
  sm: (
    size: (
      height: 48px
    )
  ),
  md: (
    size: (
      height: 60px
    )
  ),
  lg: (
    size: (
      height: 60px
    )
  )
);

.#{$PROTO_APP_PREFIX}-main-header {
  position: relative;
  display: block;
  width: 100%;
  background-color: none;
  overflow: hidden;

  @include respond-above(lg) {
    min-height: get('lg.size.height', $main-header);
  }

  @include respond-between(md, lg) {
    min-height: get('md.size.height', $main-header);
  }

  @include respond-below(md) {
    min-height: get('sm.size.height', $main-header);
  }
}
</style>
