<template lang="pug">
div(
    :class="[`${APP_PREFIX}-container`]"
    :data-test="`${APP_PREFIX}`"
)
    RouterView
</template>
    
<script setup lang="ts">
import { APP_PREFIX } from '@app/config';
</script>
    
<style lang="scss">
##{$APP_PREFIX} {
    @include box(100%);

    * {
        box-sizing: border-box;
    }

    .#{$APP_PREFIX}-container {
        @include box(100%);
    }
}
</style>