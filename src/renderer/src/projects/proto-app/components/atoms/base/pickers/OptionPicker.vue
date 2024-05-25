<template lang="pug">
BaseOptionPicker(
  v-slot="{ option }"
  :options="options"
  :init-value="initValue"
  @on-update-option="onUpdateOption"
)
  div(:class="[`${PROTO_APP_PREFIX}-option-picker__item`]") {{ option.name }}
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
import BaseOptionPicker, { type Option } from './BaseOptionPicker.vue'

// export interface Props extends /* @vue-ignore */ BaseProps { }

export interface Props {
  options: Option[] | []
  initValue: Option
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'onUpdateOption', id: number): void
}>()

const onUpdateOption = (id: number): void => {
  emit('onUpdateOption', id)
}
</script>

<script lang="ts">
// export { type Option } from './BaseOptionPicker.vue';
</script>

<style lang="scss">
$navbar: (
  xs: (),
  sm: (),
  md: (),
  lg: (),
  xl: ()
);

.#{PROTO_APP_PREFIX}-option-picker {
  @include box(auto, max-content);

  &__item {
  }
}
</style>
