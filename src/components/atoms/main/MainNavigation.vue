<template lang="pug">
nav(
    :class="[`${MAIN_APP_PREFIX}-navigation`]"
)
</template>

<script setup lang="ts">
import { MAIN_APP_PREFIX } from '@/config';

</script>

<style lang="scss">
.#{$MAIN_APP_PREFIX}-navigation {}
</style>