<template lang="pug">
header(
    :class="[`${MAIN_APP_PREFIX}-main-header`]"
)
    MainNavigation
</template>

<script setup lang="ts">
import { MAIN_APP_PREFIX } from '@/config';

import MainNavigation from '@/components/atoms/main/MainNavigation.vue'
</script>

<style lang="scss">
$main-header: (
    sm: (size: (height: 48px)),
    md: (size: (height: 60px)),
    lg: (size: (height: 60px))
);

.#{$MAIN_APP_PREFIX}-main-header {
    position: relative;
    display: block;
    // top: 0;
    width: 100%;
    background-color: none;
    border-bottom: 1px solid gray;
    overflow: hidden;

    @include respond-above(lg) {
        min-height: get('lg.size.height', $main-header);
    }

    @include respond-between(md, lg) {
        min-height: get('md.size.height', $main-header);
    }

    @include respond-below(md) {
        min-height: get('sm.size.height', $main-header);
    }
}
</style>