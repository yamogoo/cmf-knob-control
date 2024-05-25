<template lang="pug">
div(
  :class="[`${PROTO_APP_PREFIX}-toolbar`]"
)
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
</script>

<style lang="scss">
$toolbar: (
  xs: (),
  sm: (),
  md: (),
  lg: (),
  xl: ()
);

// .#{PROTO_APP_PREFIX}-toolbar {}
</style>
