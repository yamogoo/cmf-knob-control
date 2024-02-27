<template lang="pug">
div(:class="[`${CLASS_NAME}`]")
    WiFiSymbolVue(
        :level="level"
    )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/main';
import WiFiSymbolVue from './WiFiSymbol.vue';

const CLASS_NAME = `${APP_PREFIX}-wifi-symbol`;

export interface Props {
    level: number
};

withDefaults(defineProps<Props>(), {
    level: 1
});

</script>

<style lang="scss">
.#{$APP_PREFIX}-wifi-symbol {
    @include box(36px);
}
</style>