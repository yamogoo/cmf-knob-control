<template lang="pug">
div(
    :class="[`${PROTO_APP_PREFIX}-container`]"
    :data-test="`${PROTO_APP_PREFIX}`"
)
    h1 Proto App
    div(:id="APP_PREFIX")
</template>
    
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { APP_PREFIX as PROTO_APP_PREFIX } from '@proto/config';
import { app, APP_PREFIX } from '@app/main';

onMounted(() => {
    app.mount(`#${APP_PREFIX}`);
});

onUnmounted(() => {
    app.unmount();
});

</script>
    
<style lang="scss">
##{$PROTO_APP_PREFIX} {
    @include box(100%);

    .#{$PROTO_APP_PREFIX}-container {
        @include box(100%);
    }
}
</style>