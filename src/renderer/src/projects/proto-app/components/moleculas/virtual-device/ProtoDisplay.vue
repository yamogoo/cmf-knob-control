<template lang="pug">
div(:class="`${PROTO_APP_PREFIX}-display`")
    div(
        :class="[`${PROTO_APP_PREFIX}-display-container`]"
        :style="`width: ${size.width}px; height: ${size.height}px;`"    
    )
        ProtoScreen
            slot
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PROTO_APP_PREFIX } from '@proto/config'
import { useLayoutStore } from '~@/projects/proto-app/stores/layout'

import ProtoScreen from './ProtoScreen.vue'

const store = useLayoutStore()
const size = computed(() => store.display.size)
</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-display {
  position: relative;
  border-radius: 56px;
  border: 1px solid rgb(34, 34, 34);
  background-color: black;
  padding: 40px;
  overflow: hidden;

  &-container {
    position: relative;
  }
}
</style>
@/projects/proto-app/stores/layout/layout
