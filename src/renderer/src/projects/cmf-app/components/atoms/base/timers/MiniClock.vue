<template lang="pug">
div(:class="[`${APP_PREFIX}-mini-clock`]")
  span(
    data-test-id="mini-clock__time"
  ) {{ time }}
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config'

import { useCurrentTime } from '@app/composables/useTime'

const time = useCurrentTime()
</script>

<style lang="scss">
.#{$APP_PREFIX}-mini-clock {
  font-size: 21px;
  color: $WHITE;

  span {
    color: inherit;
    font-size: inherit;
  }
}
</style>
