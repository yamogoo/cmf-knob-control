<template lang="pug">
div(:class="[`${CLASS_NAME}`]")
  WiFiSymbolVue(
    v-if="isConnected"
    :level="level"
  )
  WiFiDisconnectedSymbol(
    v-if="!isConnected"
  )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/main'

import WiFiSymbolVue from './WiFiSymbol.vue'
import WiFiDisconnectedSymbol from '../animated-symbols/WiFiDisconnectedSymbol.vue'

const CLASS_NAME = `${APP_PREFIX}-wifi-symbol`

export interface Props {
  level?: number
  isConnected?: boolean
}

withDefaults(defineProps<Props>(), {
  level: 1,
  isDisconnected: true
})
</script>

<style lang="scss">
.#{$APP_PREFIX}-wifi-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  @include box(36px);
}
</style>
