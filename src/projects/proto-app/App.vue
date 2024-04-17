<template lang="pug">
div(
    :class="[`${PROTO_APP_PREFIX}-container`]"
    :data-test="`${PROTO_APP_PREFIX}`"
)
    ProtoView
        div(:id="APP_PREFIX")
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { PROTO_APP_PREFIX } from '@proto/config'
import { app, APP_PREFIX } from '@app/main'
import ProtoView from '@proto/views/ProtoView.vue'

// const connect = async () => {
//   const data = await fetch('api/v1/connect')
//   // const res = await data.json()
//   console.log(data)
// }

onMounted(() => {
  app.mount(`#${APP_PREFIX}`)
  // connect()
})

onUnmounted(() => {
  app.unmount()
})
</script>

<style lang="scss">
##{$PROTO_APP_PREFIX} {
  position: relative;
  @include box(100%);
  overflow: hidden;
}

.#{$PROTO_APP_PREFIX}-container {
  position: relative;
  display: flex;
  flex-direction: column;
  @include box(100%);
  overflow: hidden;
}
</style>
