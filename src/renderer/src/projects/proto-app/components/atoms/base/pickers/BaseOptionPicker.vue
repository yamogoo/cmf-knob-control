<template lang="pug">
select(
  v-model="selectedData"
  :class="[`${PROTO_APP_PREFIX}-option-picker`]"
)
  option(
    v-for="option, idx in options"
    :key="idx"
  )
    slot(:id="idx" :option="option")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PROTO_APP_PREFIX } from '@proto/config'

export interface Props {
  options: Option[] | []
  initValue: Option
}

const props = withDefaults(defineProps<Props>(), {})

const selectedData = ref<Option | null>(props.initValue)
</script>

<script lang="ts">
export interface Option {
  name: string
  value: any
}
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
}
</style>
