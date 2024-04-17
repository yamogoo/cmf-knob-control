<template lang="pug">
svg(viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg")
    path(
        :class="[`${CLASS_NAME}__level`, level > 1 ? 'active': 'normal']"
        d="M15.0007 12.5117C12.2486 12.5117 9.86749 14.0999 8.72382 16.4098L7.28397 14.8775C8.8583 12.2616 11.7252 10.5117 15.0007 10.5117C18.2764 10.5117 21.1433 12.2617 22.7176 14.8777L21.2778 16.41C20.1341 14.1 17.7529 12.5117 15.0007 12.5117Z"
    )
    path(
        :class="[`${CLASS_NAME}__level`, level > 2 ? 'active': 'normal']"
        d="M26.2261 11.1441L24.8314 12.6282C22.661 9.53425 19.0671 7.5117 15.0007 7.5117C10.9345 7.5117 7.34061 9.53417 5.17017 12.6281L3.77556 11.144C6.32821 7.72516 10.406 5.5117 15.0007 5.5117C19.5956 5.5117 23.6734 7.72523 26.2261 11.1441Z"
    )
    path(
        :class="[`${CLASS_NAME}__level`, level > 3 ? 'active': 'normal']"
        d="M29.6891 7.45881L28.3067 8.92995C25.1921 5.01872 20.3892 2.51172 15.0007 2.51172C9.61237 2.51172 4.80953 5.01865 1.69492 8.92979L0.3125 7.45865C3.79711 3.21716 9.08298 0.511719 15.0007 0.511719C20.9186 0.511719 26.2045 3.21722 29.6891 7.45881Z"
    )
    path(
        :class="[`${CLASS_NAME}__circle`, level > 0 ? 'active': 'normal']"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.0007 15.535C12.8044 15.535 11.024 17.3154 11.024 19.5117C11.024 21.708 12.8044 23.4884 15.0007 23.4884C17.197 23.4884 18.9775 21.708 18.9775 19.5117C18.9775 17.3154 17.197 15.535 15.0007 15.535ZM13.024 19.5117C13.024 18.42 13.909 17.535 15.0007 17.535C16.0924 17.535 16.9775 18.42 16.9775 19.5117C16.9775 20.6034 16.0924 21.4884 15.0007 21.4884C13.909 21.4884 13.024 20.6034 13.024 19.5117Z"
    )
</template>

<script setup lang="ts">
import { APP_PREFIX } from '@app/config'

const CLASS_NAME = `${APP_PREFIX}-wifi-icon`

export interface Props {
  level: number
}

withDefaults(defineProps<Props>(), {
  level: 1
})
</script>

<style lang="scss">
.#{$APP_PREFIX}-wifi-icon {
  &__level,
  &__circle {
    &.active {
      fill: $CARDAMON_LIGHT;
    }

    &.normal {
      fill: darken($GRAY, 20%);
    }
  }
}
</style>
