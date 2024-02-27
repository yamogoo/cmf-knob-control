<template lang="pug">
div(
    :class="[`${MAIN_APP_PREFIX}-container`]"
)
    MainHeader
    MainView
        div(:id="PROTO_APP_PREFIX")
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { MAIN_APP_PREFIX } from '@/config'
import { app as protoApp, PROTO_APP_PREFIX } from '@proto/main';

import MainHeader from '@/components/atoms/main/MainHeader.vue'
import MainView from '@/components/atoms/main/MainView.vue'

onMounted(() => {
    protoApp.mount(`#${PROTO_APP_PREFIX}`);
})
</script>
  
<style lang="scss">
.#{$MAIN_APP_PREFIX}-container {
    position: relative;
    display: flex;
    flex-direction: column;
    @include box(inherit);
    overflow: hidden;
}
</style>