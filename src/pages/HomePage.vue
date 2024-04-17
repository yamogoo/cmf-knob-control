<template lang="pug">
div(
    :class="[`${MAIN_APP_PREFIX}-container`]"
)
    //- MainHeader
    //- MainToolbar
    MainView
        div(:id="PROTO_APP_PREFIX")
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { MAIN_APP_PREFIX } from '@/config'
import { app as protoApp, PROTO_APP_PREFIX } from '@proto/main'

// import MainHeader from '@/components/atoms/main/MainHeader.vue'
import MainView from '@/components/atoms/main/MainView.vue'
// import MainToolbar from '@/components/moleculas/MainToolbar.vue'

onMounted(() => {
  protoApp.mount(`#${PROTO_APP_PREFIX}`)
})
</script>

<style lang="scss">
$main-toolbar: (
  sm: (
    size: (
      width: 240px
    )
  ),
  md: (
    size: (
      width: 320px
    )
  ),
  lg: (
    size: (
      width: 360px
    )
  )
);

.#{$MAIN_APP_PREFIX}-container {
  position: relative;
  display: flex;
  flex-direction: row;
  @include box(inherit);
  overflow: hidden;

  .#{$MAIN_APP_PREFIX}-main-toolbar {
    flex: none;

    @include respond-above(lg) {
      width: get('lg.size.width', $main-toolbar);
    }

    @include respond-between(sm, lg) {
      width: get('md.size.width', $main-toolbar);
    }

    @include respond-below(sm) {
      width: get('sm.size.width', $main-toolbar);
    }
  }
}
</style>
