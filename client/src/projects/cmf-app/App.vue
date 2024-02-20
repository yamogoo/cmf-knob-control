<template lang="pug">
div(
    :class="[`${APP_PREFIX}-container`]"
    :data-test="`${APP_PREFIX}`"
)
    h1 CMF App
    RouterView
</template>
    
<script setup lang="ts">
import { APP_PREFIX } from '@app/config';
</script>
    
<style lang="scss">
##{$APP_PREFIX} {
    @include box(100%);

    .#{$APP_PREFIX}-container {
        @include box(100%);
    }
}
</style>