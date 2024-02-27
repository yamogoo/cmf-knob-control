<template lang="pug">
component(
    :is="component"
    v-if="show"
    :class="[`${APP_PREFIX}-icon`]"
)
</template>
    
<script setup lang="ts">
import { APP_PREFIX } from '@/projects/cmf-app/config';
import { defineAsyncComponent } from 'vue';

export interface Props {
    path: string,
    show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    format: 'vue',
    show: true
});

const component = defineAsyncComponent(() => {
    return import(props.path);
});
</script>
    
<script lang="ts">
export * from './icons';
</script>
    
<style lang="scss">
.#{$APP_PREFIX} {

    &-icon {
        fill: inherit;

        path: {
            fill: inherit;
        }
    }
}
</style>