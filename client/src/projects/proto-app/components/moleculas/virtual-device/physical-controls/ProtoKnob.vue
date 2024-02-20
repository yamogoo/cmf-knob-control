<template lang="pug">
div(
    ref="refRoot"
    :class="[`${PROTO_APP_PREFIX}-knob`]"
    :style="size"
    @mousedown="onRingCursorDown"
    @touchstart="onRingCursorTouchDown"
)
    div(:class="[`${PROTO_APP_PREFIX}-knob-container`]")
        div(:class="`${PROTO_APP_PREFIX}-knob__info`")
            div(:class="`${PROTO_APP_PREFIX}-knob__info-container`")
                span(
                    v-if="showAngle"
                    :class="`${PROTO_APP_PREFIX}-knob__button__descriptor`"
                ) {{ angle }}°, {{ count }}
        div(
            :class="`${PROTO_APP_PREFIX}-knob__ring`"
            :style="`transform: rotate(${angle}deg);`"
        )
            <svg :class="`${PROTO_APP_PREFIX}-knob__ring`" width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="2.75" transform="matrix(1 0 0 -1 157 25.406)" fill="black" stroke="black" stroke-width="0.5" />
            </svg>
        div(
            ref="refButton"
            :class="`${PROTO_APP_PREFIX}-knob__button`"
        )
        div(
            :class="`${PROTO_APP_PREFIX}-knob__texture`"
        )
            ProtoKnobLayer01
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { PROTO_APP_PREFIX } from '@proto/config';

import g from 'gsap';
import { debounce } from '@utils/index';

import type { GesturesBasicCursorPosition } from '@typings/gestures';
import { type KnobEmittedData } from '@app/typings/controls';

import ProtoKnobLayer01 from './ProtoKnobLayer01.vue';


export interface Props {
    size?: number,
    showAngle?: boolean,
    numStepsPerRound?: number
}

const props = withDefaults(defineProps<Props>(), {
    size: 320,
    showAngle: true,
    numStepsPerRound: 6
});

const emit = defineEmits<{
    (e: 'onUpdateData', data: KnobEmittedData): void;
    (e: 'onTurnLeft', data: KnobEmittedData): void;
    (e: 'onTurnRight', data: KnobEmittedData): void;
    (e: 'onPress', data: KnobEmittedData): void;
    (e: 'onRelease', data: KnobEmittedData): void;
}>();

const refRoot = ref<HTMLDivElement | null>(null);
const refButton = ref<HTMLDivElement | null>(null);

const size = computed(() => {
    return `width: ${props.size}px; height: ${props.size}px;`;
});

/* * * Events * * */

let cursorPosition: GesturesBasicCursorPosition = {
    previous: { x: 0, y: 0 },
    current: { x: 0, y: 0 }
};

const stepToAngele = computed(() => 360 / props.numStepsPerRound);

const angle = ref(0);
const isPressed = ref(false);

let _prevAngle = 0,
    count = 0, dir = 0;

const normalizePosition = (p: number, dir: number = 1, offset: number = props.size): number => {
    return (p - offset / 2) * dir;
};

const onRingCursorTouchDown = (_e: TouchEvent): void => { };

const onRingCursorDown = (_e: MouseEvent): void => {
    isPressed.value = true;
    onPress(true);

    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseout', mouseOutHandler);
};

// !FIX: 0 to 360 deg changing:

const calcAngle = (x: number, y: number): number => {
    if (x >= 0 && y > 0) {
        return Math.atan(x / y);
    } else if (y > 0 && x < 0) {
        return 2 * Math.PI + Math.atan(x / y);
    } else {
        return Math.PI + Math.atan(x / y);
    }
};

const calcDirectionByAngle = (prev: number, curr: number): number => {
    if (curr >= prev) return 1;
    else if (curr < prev) return -1;
    return 0;
};

// !FIX: add debounce by pixels then by time

const mouseMoveHandler: (e: MouseEvent) => void = debounce((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onTurn(e.offsetX, e.offsetY);
}, .5);

const onTurn = (offsetX: number, offsetY: number) => {
    cursorPosition.current.x = normalizePosition(offsetX);
    cursorPosition.current.y = normalizePosition(offsetY, - 1);

    // direction: 
    angle.value = Math.round(calcAngle(cursorPosition.current.x, cursorPosition.current.y) * 180 / Math.PI);
    dir = calcDirectionByAngle(_prevAngle, angle.value);

    if (cursorPosition.current.x !== 0 &&
        cursorPosition.current.y !== 0 &&
        angle.value !== _prevAngle
    ) {

        if (dir === 1 && angle.value > _prevAngle + stepToAngele.value) {
            count += 1;
            _prevAngle = angle.value;

            const data: KnobEmittedData = ({ dir, count, angle: angle.value });
            emit('onUpdateData', data);
            emit('onTurnRight', data);
        };

        if (dir === -1 && angle.value + stepToAngele.value < _prevAngle) {
            count -= 1;
            _prevAngle = angle.value;

            const data: KnobEmittedData = ({ dir, count, angle: angle.value });
            emit('onUpdateData', data);
            emit('onTurnLeft', data);
        };

        cursorPosition.previous.x = cursorPosition.current.x;
        cursorPosition.previous.y = cursorPosition.current.y;
    };
};

const onPress = (state: boolean): void => {
    const data: KnobEmittedData = ({ dir: 0, count, angle: angle.value });
    emit('onUpdateData', data);

    state ? emit('onPress', data) : emit('onRelease', data);
    onAnimPress(state);
};

const mouseUpHandler = (_e: MouseEvent): void => {
    document.removeEventListener('mouseup', mouseUpHandler);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseout', mouseOutHandler);

    if (isPressed.value) {
        isPressed.value = false;
        onPress(false)
    };
};

const mouseOutHandler = (_e: MouseEvent): void => {
    document.removeEventListener('mouseup', mouseUpHandler);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseout', mouseOutHandler);

    if (isPressed.value) {
        isPressed.value = false;
        onPress(false);
    }
};

/* * * Animations * * */

const onAnimPress = (state: boolean): void => {
    const scale = state ? .95 : 1.0;
    const duration = state ? .15 : .35;

    if (refRoot.value)
        g.to(refRoot.value, {
            scale,
            duration,
            ease: 'power4.out'
        });
};

</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-knob {
    position: relative;
    // border: 1px solid black;
    border-radius: 100%;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    touch-action: none;
    user-select: none;
    cursor: pointer;
    // overflow: hidden;

    * {
        pointer-events: none;
    }

    &-container {
        position: relative;
        @include box(100%);
    }

    &__info {
        position: absolute;
        top: 0;
        left: 0;
        @include box(100%);
        z-index: 2;

        &-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            @include box(inherit);
        }
    }

    &__ring {
        position: relative;
        display: block;
        @include box(inherit);
        z-index: 1;

        &__indicator {
            position: absolute;
            display: block;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 12px;
            background-color: $BLACK;
        }
    }

    &__texture {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
    }
}
</style>