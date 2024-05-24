<template lang="pug">
div(
  ref="refRoot"
  :class="[`${APP_PREFIX}-carousel-stack`]"
  @mousedown="onMouseDownHandler"
)
  div(
    ref="refTrack"
    :class="[`${APP_PREFIX}-carousel-stack__track`]"
    :style="[`gap: ${gap}px;`]"
  )
    div(
      v-for="item, idx in items"
      data-test-id="carousel-stack__item"
      :id="String(idx)"
      :key="idx"
      ref="refItem"
      :class="[`${APP_PREFIX}-carousel-stack__item`]"
    )
      slot(
        :id="Number(idx)"
        :item="item"
      )
      slot(
        :id="Number(idx)"
        :name="`slide_${idx}`"
        :item="item"
      )
  div(
    v-if="showPagination"
    :class="[`${APP_PREFIX}-carousel-stack__footer`]"
  )
    MainPagination(
      v-if="itemsLength > 1"
      data-test-id="MainPagination"
      :items-count="itemsLength"
      :sid="itemSid"
    )
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, watch, type InjectionKey, type Ref } from 'vue'
import { APP_PREFIX } from '@app/config'
import g from 'gsap'

import type { Point } from '~@/typings/controls'

import MainPagination from '@app/components/atoms/base/paginations/MainPagination.vue'

/**
 * Tolerance is percentage of slide position changing (relative to slide width);
 * !Direction not implemented yet.
 */

export interface Props {
  sid?: number
  items: number | any[]
  direction?: Directions
  gap?: number
  isScrollable?: boolean
  isScrollOnWindowArea?: boolean
  tolerance?: number
  showPagination?: boolean
  initAnimDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  sid: 0,
  items: 1,
  direction: Directions.HORIZONTAL,
  gap: 0,
  isScrollable: true,
  isScrollOnWindowArea: true,
  tolerance: 0.4,
  showPagination: true,
  initAnimDuration: 0.0
})

const emit = defineEmits<{
  (e: 'update:sid', id: number): void
  (e: 'onUnmountAnimationCompleted'): void
}>()

const refRoot = ref<HTMLDivElement | null>(null)
const refTrack = ref<HTMLDivElement | null>(null)

const slideWidth = ref(0)

const itemSid = ref(props.sid ?? 0)
const isMoving = ref(false)

provide(RefRootInjectionKey, refRoot)

const itemsLength = typeof props.items === 'number' ? props.items : props.items.length

defineExpose({
  refRoot
})

onMounted(async () => {
  updateWidth()
  onEnter()
  changeSlide(props.initAnimDuration)
})

onUnmounted(() => {
  if (refRoot.value) {
    if (!props.isScrollOnWindowArea) {
      document.removeEventListener('mousemove', mouseMoveHandler)
    } else {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }
  document.removeEventListener('mouseup', mouseUpHandler)
  document.removeEventListener('mouseout', mouseOutHandler)
})

const updateWidth = (): void => {
  if (refRoot.value) {
    const width = refRoot.value?.clientWidth
    slideWidth.value = width
  } else slideWidth.value = 0

  onMoveEnd()
}

watch(
  () => props.sid,
  () => {
    itemSid.value = props.sid
    changeSlide(0.35)
  }
)

/* * * Gestures * * */

interface Position {
  start: Point
  end: Point
  prevDelta: Point
  delta: Point
  actual: Point
}

let position: Position = {
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
  prevDelta: { x: 0, y: 0 },
  delta: { x: 0, y: 0 },
  actual: { x: 0, y: 0 }
}

const resetPosition = (point: Point): void => {
  point.x = 0
  point.y = 0
}

const resetPositions = (): void => {
  resetPosition(position.delta)
}

const getPosition = (e: MouseEvent | TouchEvent): Point => {
  const x = 'touches' in e ? e.touches[0].clientX : e.clientX
  const y = 'touches' in e ? e.touches[0].clientY : e.clientY
  return { x: x, y: y }
}

const getDeltaPosition = (start: Point, end: Point): Point => {
  const x = end.x - start.x
  const y = end.y - start.y
  return { x: x, y: y }
}

const getActualPosition = (e: MouseEvent | TouchEvent): Point => {
  position.prevDelta = position.delta
  position.end = getPosition(e)
  position.delta = getDeltaPosition(position.start, position.end)
  return position.delta
}

const setIsMoving = (state: boolean): void => {
  isMoving.value = state
}

/* * * Handlers * * */

const onMouseDownHandler = (e: MouseEvent): void => {
  // e.stopPropagation();

  if (props.isScrollable) {
    resetPositions()

    if (refRoot.value) {
      onMoveStart(e)

      if (props.isScrollOnWindowArea) document.addEventListener('mousemove', mouseMoveHandler)
      else refRoot.value.addEventListener('mousemove', mouseMoveHandler)

      document.addEventListener('mouseup', mouseUpHandler)
    }
  }
}

const mouseUpHandler = (e: MouseEvent): void => {
  e.stopPropagation()
  onMoveEnd()
}

const mouseMoveHandler = (e: MouseEvent): void => {
  onMove(e)
  e.preventDefault()
  e.stopPropagation()
}

const mouseOutHandler = (_e: MouseEvent): void => {
  onMoveEnd()
}

/* * * Transform * * */

const onMoveStart = (e: MouseEvent | TouchEvent): void => {
  setIsMoving(false)
  position.start = getPosition(e)
}

const onMove = (e: MouseEvent | TouchEvent): void => {
  setIsMoving(true)
  position.actual = getActualPosition(e)

  // Debounce:
  if (position.prevDelta.x != position.delta.x) {
    if (refTrack.value) {
      g.to(refTrack.value, {
        x: -(slideWidth.value + props.gap) * itemSid.value + position.actual.x,
        duration: 0
      })
    }
  }
}

const onMoveEnd = (): void => {
  setIsMoving(false)

  if (refRoot.value) {
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
    document.removeEventListener('mouseout', mouseOutHandler)

    const dir = position.actual.x !== 0 ? Math.sign(Math.round(position.actual.x)) : 0
    const tolerance = (Math.abs(position.delta.x) * 2) / slideWidth.value

    if (tolerance >= props.tolerance) {
      if (dir === -1 && itemSid.value < itemsLength - 1) itemSid.value += 1
      if (dir === 1 && itemSid.value > 0) itemSid.value -= 1
    }

    changeSlide(0.35).then(() => {
      emit('update:sid', itemSid.value)
    })
  }
}

const changeSlide = (duration: number) => {
  const offset = -((slideWidth.value + props.gap) * itemSid.value)

  return new Promise((resolve) => {
    if (refTrack.value) {
      g.to(refTrack.value, {
        x: offset,
        duration: duration,
        ease: 'power4.out',
        onComplete: resolve
      })
    }
  })
}

/* * * Animation * * */

const onEnter = () => {
  return new Promise((resolve) => {
    if (!refRoot.value) return
    g.fromTo(
      refRoot.value,
      {
        scale: 0.5,
        opacity: 0.0
      },
      {
        scale: 1.0,
        opacity: 1.0,
        duration: 0.35,
        ease: 'power4.out',
        onComplete: resolve
      }
    )
  })
}
</script>

<script lang="ts">
export const RefRootInjectionKey = Symbol() as InjectionKey<Ref<HTMLDivElement | null>>

export enum Directions {
  HORIZONTAL = 'hor',
  VERTICAL = 'vert'
}
</script>

<style lang="scss">
.#{$APP_PREFIX}-carousel-stack {
  position: relative;
  display: flex;
  flex-direction: column;
  @include box(100%);
  @include min-box(100%, auto);
  gap: 16px;
  overflow: hidden;
  cursor: pointer;

  &__track {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 100%;
    height: 100%;
    padding: 0 !important;
  }

  &__footer {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  img {
    pointer-events: none;
  }

  &__item {
    position: relative;
    display: flex;
    flex-shrink: 0;
    @include box(100%);
  }
}
</style>
