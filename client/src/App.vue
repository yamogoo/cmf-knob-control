<template lang="pug">
h1 App
RouterView
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
#app {
    position: relative;
    @include box(100vw, 100vh);

    &-container {
        position: relative;
        @include box(100%);
    }
}
</style>