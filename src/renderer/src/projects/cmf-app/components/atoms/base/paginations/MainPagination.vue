<template lang="pug">
BasePagination(
    v-slot="{ isActive }"
    :items-count="itemsCount"
    :sid="sid"
)
    div(
        ref="refItem"
        :class="[`${APP_PREFIX}-pagination__item-indicator`, isActive ? Classes.ACTIVE : Classes.NORMAL]"
        :style="{width: size + 'px', height: size + 'px', borderRadius: size/2 + 'px'}"
        data-testid="pagination__item-indicator"
    )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config'
import BasePagination, { type Props } from './BasePagination.vue'

interface BaseProps extends Props {
  sid: number
  size?: number
}

withDefaults(defineProps<BaseProps>(), {
  sid: 0,
  size: 8
})
</script>

<script lang="ts">
enum Classes {
  ACTIVE = 'active',
  NORMAL = 'normal'
}
</script>

<style lang="scss">
.#{$APP_PREFIX}-pagination {
  position: relative;
  display: flex;
  @include box(auto, 100%);
  gap: 6px;

  &__item {
    &-indicator {
      &.normal {
        background-color: darken($GRAY, 26%);
      }

      &.active {
        background-color: $CARDAMON_LIGHT;
      }
    }
  }
}
</style>
