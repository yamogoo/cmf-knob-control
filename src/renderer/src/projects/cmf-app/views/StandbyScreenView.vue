<template lang="pug">
Transition(
  :css="false"
  @enter="onPageEnter"
)
  UIBasePage(
    :id="[`${APP_PREFIX}-standby-page`]"
  )
    StatusPanel
      template(#action)
        MiniClock
    CarouselStack(
      v-slot="screen"
      :sid="screenSid"
      :items="slots.length"
      :gap="40"
      @update:sid="onUpdateScreenSid"
    )
      div(:class="[`${APP_PREFIX}-grid-stack`]")
        ControlSectionButton(
          v-for="slot, idx in slots[screen.id]"
          :id="slot.id"
          :key="idx"
          :is-focused="slot.id === slotSid"
          :is-knob-pressed="slot.id === slotSid && isKnobPressed"
          @on-press="onButtonPress(slot)"
        )
          span Item {{ String('0' + slot.id).slice(-2) }}
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { APP_PREFIX } from '@app/config'
import g from 'gsap'

import { absoluteUrls } from '@app/router/urls'
import { useRouter } from 'vue-router'
import { flattenMatrix } from '~@/utils/matrix'

import UIBasePage from '@app/components/atoms/base/pages/BasePage.vue'
import StatusPanel from '@app/components/atoms/panels/StatusPanel.vue'
import CarouselStack from '@app/components/atoms/base/stacks/CarouselStack.vue'
import ControlSectionButton from '@app/components/atoms/base/buttons/ControlSectionButton.vue'
import MiniClock from '@app/components/atoms/base/timers/MiniClock.vue'

const slots = ref<ControlButtonSlot[][]>([
  [
    {
      id: 0,
      name: 'Manual',
      type: ButtonTypes.SECTION
      // url: absoluteUrls.MANUAL_MODE
    },
    {
      id: 1,
      name: 'Auto',
      type: ButtonTypes.SECTION
    },
    {
      id: 2,
      name: 'Assisted',
      type: ButtonTypes.SECTION
    },
    {
      id: 3,
      name: 'Favorites',
      type: ButtonTypes.SECTION
    },
    {
      id: 4,
      name: 'User Guide',
      type: ButtonTypes.SECTION
    },
    {
      id: 5,
      name: 'Bake',
      type: ButtonTypes.MANUAL_PROGRAM
    }
  ],
  [
    {
      id: 6,
      name: 'User',
      type: ButtonTypes.SECTION
    },
    {
      id: 7,
      name: 'Settings',
      type: ButtonTypes.SECTION
    },
    {
      id: 8,
      name: 'Guide',
      type: ButtonTypes.SECTION
    },
    {
      id: 9,
      name: 'Info',
      type: ButtonTypes.SECTION
    }
  ]
])

const router = useRouter()

const slotSid = ref(0)
const slotsLength = computed(() => flattenMatrix(slots.value).length)
const screenSid = computed(() => (slotSid.value > 5 ? 1 : 0))

/* * * Knob * * */

const isKnobPressed = ref(false)
const isKnobReleased = ref(true)

onMounted(() => {
  document.addEventListener('knobturnleft', knobTurnLeftHandler)
  document.addEventListener('knobturnright', knobTurnRightHandler)
  document.addEventListener('knobpress', knobPressHandler)
  document.addEventListener('knobrelease', knobReleaseHandler)
})

onUnmounted(() => {
  document.removeEventListener('knobturnleft', knobTurnLeftHandler)
  document.removeEventListener('knobturnright', knobTurnRightHandler)
  document.removeEventListener('knobpress', knobPressHandler)
  document.removeEventListener('knobrelease', knobReleaseHandler)
})

const knobReleaseHandler = (): void => {
  isKnobPressed.value = false
  isKnobReleased.value = true
}
const knobPressHandler = (): void => {
  isKnobPressed.value = true
  isKnobReleased.value = false
}

const knobTurnLeftHandler = (): void => {
  isKnobPressed.value = false

  if (slotSid.value > 0) slotSid.value -= 1
}

const knobTurnRightHandler = (): void => {
  isKnobPressed.value = false

  if (slotSid.value < slotsLength.value - 1) slotSid.value += 1
}

/* * * Buttons * * */

const onButtonPress = (slot: ControlButtonSlot): void => {
  slotSid.value = slot.id

  const flatten = flattenMatrix<ControlButtonSlot>(slots.value)
  const id = slot.id ?? 0

  if (flatten[id].url) {
    router.push({ path: absoluteUrls.MANUAL_MODE })
  }
}

const onUpdateScreenSid = (): void => {}

/* * * Animations * * */

const onPageEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0.0,
      scale: 0.5
    },
    {
      opacity: 1.0,
      scale: 1.0,
      duration: 0.5,
      ease: 'power4.out',
      onComplete: done
    }
  )
}
</script>

<script lang="ts">
export enum ButtonTypes {
  SECTION,
  MANUAL_PROGRAM,
  ASSISTED_PROGRAM
}

export interface ControlButtonSlot {
  id: number
  name: string
  disabled?: boolean
  type: ButtonTypes
  url?: string
}
</script>

<style lang="scss">
##{$APP_PREFIX}-standby-page {
  position: relative;
  display: grid !important;
  grid-template-rows: 64px auto !important;

  .#{$APP_PREFIX}-carousel-stack {
    padding-bottom: 8px;
    @include box(100%);
  }
}

.#{$APP_PREFIX}-grid-stack {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  * {
    font-size: 23px !important;
  }
}
</style>
