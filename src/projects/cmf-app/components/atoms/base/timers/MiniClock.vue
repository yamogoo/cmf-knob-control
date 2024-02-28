<template lang="pug">
div(:class="[`${APP_PREFIX}-mini-clock`]")
    span {{ time }}
</template>

<script setup lang="ts">
import { cancelableInterval } from '@/utils';
import { APP_PREFIX } from '@app/config';
import { onMounted, onUnmounted, ref } from 'vue';

const time = ref('--:--');

let timer: ReturnType<typeof cancelableInterval> | undefined = undefined;

const getTime = (): void => {
    const d = new Date();
    time.value = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
};

onMounted(() => {
    getTime();
    timer = cancelableInterval(() => {
        getTime();
    }, 1000);
});

onUnmounted(() => {
    if (timer) timer();
});
</script>

<style lang="scss">
.#{$APP_PREFIX}-mini-clock {
    font-size: 21px;
    color: $WHITE;

    span {
        color: inherit;
        font-size: inherit;
    }
}
</style>