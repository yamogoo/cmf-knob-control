<template lang="pug">
div(
    :class="[`${APP_PREFIX}-pagination`]"
)
    div(
        v-for="idx in itemsCount"
        data-test-id="pagination-indicator"
        :id="String(idx - 1)"
        :key="idx - 1"
        :class="[`${APP_PREFIX}-pagination-item`]"
    )
        slot(:is-active="idx - 1 === sid")
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config'

export interface Props {
  sid: number
  itemsCount: number
}

withDefaults(defineProps<Props>(), {
  sid: 0
})
</script>

<style lang="scss">
.#{$APP_PREFIX}-pagination {
  position: relative;
  display: flex;
  @include box(auto, 100%);
  gap: 6px;

  &__item {
    border-radius: 32px;

    &.normal {
      background-color: darken($GRAY, 26%);
    }

    &.active {
      background-color: $CARDAMON_LIGHT;
    }
  }
}
</style>
