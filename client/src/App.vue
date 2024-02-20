<template lang="pug">
RouterView
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
body {
    position: relative;
    @include box(100vw, 100vh);
    margin: 0;
    padding: 0;
}

##{$MAIN_APP_PREFIX} {
    position: relative;
    @include box(100vw, 100vh);
}
</style>