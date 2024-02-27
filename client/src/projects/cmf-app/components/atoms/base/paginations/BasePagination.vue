<template lang="pug">
div(
    :class="[`${APP_PREFIX}-pagination`]"
)
    div(
        v-for="idx in itemsCount"
        :id="String(idx - 1)"
        :key="idx - 1"
        :class="[`${APP_PREFIX}-pagination-item`]"
        :sid="sid"
    )
        slot(:id="idx")
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config';

export interface Props {
    sid: number,
    itemsCount: number
}

withDefaults(defineProps<Props>(), {
    sid: 0
});

</script>

<style lang="scss">
.#{$APP_PREFIX}-pagination {
    position: relative;
    @include flexbox();
    @include box(auto, 100%);
    gap: 6px;
}
</style>