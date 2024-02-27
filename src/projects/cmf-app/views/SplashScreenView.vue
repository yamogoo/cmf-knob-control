<template lang="pug">
SplashScreenLogo(
    @on-complete="onLogoAnimComplete"
)
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { absoluteUrls } from '@app/router/urls';

import { cancelableTimer } from '@utils/timer';

import SplashScreenLogo from '@app/components/atoms/logos/SplashScreenLogo.vue'

const router = useRouter();

let redirectTimer: Function | undefined = undefined;

const time = ref(0);

const onLogoAnimComplete = (): void => {
    redirectTimer = cancelableTimer({
        duration: 100,
        onUpdate: (t: number): void => {
            time.value = t
        },
        onComplete: () => {
            router.push({ path: absoluteUrls.STANDBY });
        }
    });
};

onUnmounted(() => { if (redirectTimer) redirectTimer() });

</script>

<style lang="scss"></style>