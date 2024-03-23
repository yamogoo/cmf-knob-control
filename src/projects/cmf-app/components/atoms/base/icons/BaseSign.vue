<template lang="pug">
div(:class="[CLASS_NAME, `${CLASS_NAME}--${size}`]")
    BaseIcon(
        :name="name"
    )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config';
import BaseIcon, { Icons } from './BaseIcon.vue';

const CLASS_NAME = `${APP_PREFIX}-sign`;

interface Props {
    name: Icons;
    size?: Sizes;
}

withDefaults(defineProps<Props>(), {
    size: Sizes.SM
});
</script>

<script lang="ts">
export { Icons } from './BaseIcon.vue';

export enum Sizes {
    SM = 'sm',
    MD = 'md',
    LG = 'lg'
}
</script>

<style lang="scss">
.#{$APP_PREFIX}-sign {

    &--sm {
        @include box(32px);
    }

    &--md {
        @include box(36px);
    }

    &--lg {
        @include box(40px);
    }
}
</style>