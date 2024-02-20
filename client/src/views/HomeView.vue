<template lang="pug">
main#app-container
    div(:id="PROTO_APP_PREFIX")
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { app as protoApp, APP_PREFIX as PROTO_APP_PREFIX } from '@proto/main';

onMounted(() => {
    protoApp.mount(`#${PROTO_APP_PREFIX}`);
})
</script>
  
<style lang="scss">
#app-container {}
</style>