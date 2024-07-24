<template lang="pug">
label.ui-switch(
    :class="[checked? 'active' : 'normal']"
    data-testid="ui-switch"
)
    input(
        v-bind="$attrs"
        type="checkbox"
        :checked="props.checked"
        @change="onChange"
    )
    div.ui-switch__track
        span.ui-switch__knob(
            ref="refKnob"
        )
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import g from 'gsap'

defineOptions({
  inheritAttrs: false
})

interface Props {
  checked: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits<{
  (e: 'update:checked', state: any): void
}>()

const refKnob = ref<HTMLDivElement | null>(null)

const onChange = (e: Event): void => {
  const state = (e.target as HTMLInputElement).checked
  emits('update:checked', state)
}

/* * * Animations * * */

const onAnimateKnob = (duration = 0.25): void => {
  if (refKnob.value) {
    const knobPosX = props.checked ? 20 : 0

    g.to(refKnob.value, {
      x: knobPosX,
      duration,
      ease: 'power4.out'
    })
  }
}

onMounted(() => {
  if (refKnob.value) {
    onAnimateKnob(0.0)
  }
})

watch(
  () => props.checked,
  () => {
    onAnimateKnob()
  }
)
</script>

<!-- <style lang="scss">
$__height: 20px;
$__knob-size: 16px;

.ui-switch {
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__track {
    @include box(40px, $__height);
    border-radius: calc($__height / 2);
    padding: 2px;
    overflow: hidden;
  }

  &__knob {
    display: block;
    @include box($__knob-size);
    border-radius: $__knob-size;

    @include themify($themes) {
      background-color: themed('background', 'secondary');
    }
  }

  &.active {
    .ui-switch__track {
      @include themify($themes) {
        background-color: themed('background', 'secondary--active');
      }
    }
  }

  &.normal {
    .ui-switch__track {
      @include themify($themes) {
        background-color: themed('background', 'secondary--disabled');
      }
    }
  }
}
</style> -->
