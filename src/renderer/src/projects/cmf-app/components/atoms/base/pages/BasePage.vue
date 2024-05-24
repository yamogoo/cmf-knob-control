<template lang="pug">
div(:class="[`${APP_PREFIX}-page`]")
    slot
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config';
</script>

<style lang="scss">
.#{$APP_PREFIX}-page {
    position: relative;
    display: block;
    @include box(100%);
    padding: 8px;
    overflow: hidden;
}
</style>