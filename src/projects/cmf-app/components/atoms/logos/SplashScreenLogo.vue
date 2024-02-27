<template lang="pug">
lottie(
    ref="refRoot"
    :style="`width: ${100}%; height: ${100}%;`"
    :animation-data="Logo"
    :loop="false"
    @on-complete="onComplete"
)
</template>

<script setup lang="ts">
import Logo from '@app/assets/lottie/splashscreen-logo_02.json';

const emit = defineEmits<{
    (e: 'onComplete'): void
}>();

const onComplete = (): void => {
    emit('onComplete');
};
</script>

<style lang="scss"></style>