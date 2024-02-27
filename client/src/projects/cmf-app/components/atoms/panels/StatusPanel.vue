<template lang="pug">
div(:class="[`${APP_PREFIX}-status-panel`]")
    div(:class="[`${APP_PREFIX}-status-panel-container`]")
        div(:class="[`${APP_PREFIX}-status-panel__status`]")
            BaseSign(
                :name="Icons.WIFI"
            )
            slot(name="status")
        div(:class="[`${APP_PREFIX}-status-panel__info`]")
            slot
        div(
            v-if="$slots.action"
            :class="[`${APP_PREFIX}-status-panel__action`]"
        )
            slot(name="action")
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config';
import BaseSign, { Icons } from '@app/components/atoms/base/icons/BaseSign.vue';

</script>

<style lang="scss">
$status-panel: (
    min-height: 64px
);

.#{$APP_PREFIX}-status-panel {
    position: relative;
    display: block;
    width: 100%;
    min-height: get('min-height', $status-panel);
    background-color: none;

    &-container {
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: row;
        @include box(100%);
    }

    &__status,
    &__info,
    &__action {
        position: relative;
        @include box(100%);
    }

    &__status {
        display: flex;
        align-items: center;

        * {
            fill: lighten($CARDAMON, 12%);
        }
    }

    &__info {
        position: absolute;
        z-index: 1;
    }
}
</style>