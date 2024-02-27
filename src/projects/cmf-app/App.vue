<template lang="pug">
div(
    :class="[`${APP_PREFIX}-container`]"
    :data-test="`${APP_PREFIX}`"
)
    RouterView
</template>
    
<script setup lang="ts">
import { APP_PREFIX } from '@app/config';
import { computed, watch } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';
import { absoluteUrls } from './router/urls';

const router = useRouter();

/* * * Auth * * */

const authStore = useAuthStore();

const isConnected = computed(() => authStore.isConnected);

watch(isConnected, () => {
    if (!isConnected.value) router.push({ path: absoluteUrls.SPLASH });
}, { immediate: true });
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