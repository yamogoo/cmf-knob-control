<template lang="pug">
div(
    ref="refRoot"
    :class="[`${PROTO_APP_PREFIX}-knob`]"
    :style="size"
    @pointerdown="onRingCursorDown"
    @touchstart="onRingCursorTouchDown"
)
    div(:class="[`${PROTO_APP_PREFIX}-knob-container`]")
        div(:class="`${PROTO_APP_PREFIX}-knob__info`")
            div(:class="`${PROTO_APP_PREFIX}-knob__info-container`")
                span(
                    v-if="showAngle"
                    :class="`${PROTO_APP_PREFIX}-knob__button__descriptor`"
                ) {{ prevAngle }}° {{ angle }}°, {{ count }}, {{ dir }}
        div(
            :class="`${PROTO_APP_PREFIX}-knob__ring`"
            :style="`transform: rotate(${angle}deg);`"
        )
            svg(:class="`${PROTO_APP_PREFIX}-knob__ring`" width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg")
                circle(cx="3" cy="3" r="2.75" transform="matrix(1 0 0 -1 157 25.406)" fill="black" stroke="black" stroke-width="0.5")
        div(
            ref="refButton"
            :class="[`${PROTO_APP_PREFIX}-knob__button`, {'focused': isButtonFocused}]"
            @click="onButtonPress"
        )
            ProtoKnobLayer02
        div(
            :class="`${PROTO_APP_PREFIX}-knob__texture`"
        )
            ProtoKnobLayer01
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { PROTO_APP_PREFIX } from '@proto/config';

import g from 'gsap';
import { debounce } from '@utils/index';

import type { GesturesCursorPosition } from '@typings/gestures';
import { type KnobEmittedData } from '@app/typings/controls';

import ProtoKnobLayer01 from './ProtoKnobLayer01.vue';
import ProtoKnobLayer02 from './ProtoKnobLayer02.vue';
import type { Point } from '@/typings/controls';


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

let position: GesturesCursorPosition<number> = {
    start: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    delta: { x: 0, y: 0 },
};

const stepToAngele = computed(() => 360 / props.numStepsPerRound);

const angle = ref(0);
const isPressed = ref(false);
const isButtonFocused = ref(false);
// const isRingTurning = ref(false);

let prevAngle = 0,
    count = 0, dir = 0, dir2 = 0;

const normalizePosition = (p: number, dir: number = 1, offset: number = props.size): number => {
    return (p - offset / 2) * dir;
};

const getPosition = (e: MouseEvent | TouchEvent): Point => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: x, y: y };
};

const getDeltaPosition = (start: Point, end: Point): Point => {
    const x = end.x - start.x;
    const y = end.y - start.y;
    return { x: x, y: y };
};

onMounted(() => {
    if (refButton.value) refButton.value.addEventListener('pointerenter', buttonMouseEnterHandler);
});

onUnmounted(() => {
    if (refButton.value) {
        refButton.value.removeEventListener('pointerdown', buttonMouseDownHandler);
        refButton.value.removeEventListener('pointerleave', buttonMouseDownHandler);
        refButton.value.removeEventListener('pointerenter', buttonMouseEnterHandler);
    };

    if (refRoot.value) {
        document.removeEventListener('pointerup', ringMouseUpHandler);
        document.removeEventListener('pointermove', ringMouseMoveHandler);
        document.removeEventListener('pointerout', ringMouseOutHandler);
    }
})

const onRingCursorTouchDown = (): void => { };

const onRingCursorDown = (e: MouseEvent): void => {
    position.delta.x = 0;
    position.delta.y = 0;

    onRingStartMoving(e.offsetX, e.offsetY);
    document.addEventListener('pointerup', ringMouseUpHandler);
    document.addEventListener('pointermove', ringMouseMoveHandler);
    document.addEventListener('pointerout', ringMouseOutHandler);
};

const onRingStartMoving = (x: number, y: number): void => {
    position.start.x = normalizePosition(x);
    position.start.y = normalizePosition(y, - 1);
};

/* * * Ring (Rotary Encoder) * * */

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


const ringMouseMoveHandler: (e: MouseEvent) => void = debounce((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onTurn(e.offsetX, e.offsetY);

    if (refButton.value) refButton.value.removeEventListener('pointerenter', buttonMouseEnterHandler);
}, .5);

const onTurn = (offsetX: number, offsetY: number) => {
    position.current.x = normalizePosition(offsetX);
    position.current.y = normalizePosition(offsetY, - 1);

    // direction: 
    angle.value = Math.round(calcAngle(position.current.x, position.current.y) * 180 / Math.PI);

    if (position.current.x !== 0 &&
        position.current.y !== 0
        // && angle.value !== prevAngle
    ) {

        dir = calcDirectionByAngle(prevAngle, angle.value);
        if (dir === 1 && angle.value > prevAngle + stepToAngele.value) {
            count += 1;
            prevAngle = angle.value;

            const data: KnobEmittedData = ({ dir, count, angle: angle.value });
            emit('onUpdateData', data);
            emit('onTurnRight', data);
        };

        if (dir === -1 && angle.value + stepToAngele.value < prevAngle) {
            count -= 1;
            prevAngle = angle.value;

            const data: KnobEmittedData = ({ dir, count, angle: angle.value });
            emit('onUpdateData', data);
            emit('onTurnLeft', data);
        };

        position.previous.x = position.current.x;
        position.previous.y = position.current.y;
    };
};

const ringMouseUpHandler = (e: MouseEvent): void => {
    e.stopPropagation();
    if (refButton.value) refButton.value.addEventListener('pointerenter', buttonMouseEnterHandler);

    document.removeEventListener('pointerup', ringMouseUpHandler);
    document.removeEventListener('pointermove', ringMouseMoveHandler);
    document.removeEventListener('pointerout', ringMouseOutHandler);
};

const ringMouseOutHandler = (): void => {
    document.removeEventListener('pointerup', ringMouseUpHandler);
    document.removeEventListener('pointermove', ringMouseMoveHandler);
    document.removeEventListener('pointerout', ringMouseOutHandler);
};


/* * * Button (Physical Button) * * */

const onPress = (state: boolean): void => {
    const data: KnobEmittedData = ({ dir: 0, count, angle: angle.value });
    emit('onUpdateData', data);

    state ? emit('onPress', data) : emit('onRelease', data);
    onAnimPress(state);
};

const buttonMouseEnterHandler = (): void => {
    isButtonFocused.value = true;

    if (refButton.value) {
        refButton.value.addEventListener('pointerleave', buttonMouseLeaveHandler);
        refButton.value.addEventListener('pointerdown', buttonMouseDownHandler);
    };
};

const buttonMouseDownHandler = (): void => {
    if (refButton.value) {
        refButton.value.addEventListener('pointerup', buttonringMouseUpHandler);
    };

    isPressed.value = true;
    onPress(true);
};

const buttonringMouseUpHandler = (): void => {

    if (isPressed.value) {
        isPressed.value = false;
        onPress(false)
    };
};

const buttonMouseLeaveHandler = (): void => {
    isButtonFocused.value = false;

    if (refButton.value) {
        refButton.value.removeEventListener('pointerdown', buttonMouseDownHandler);
        refButton.value.removeEventListener('pointerleave', buttonMouseLeaveHandler);
    }
};

const onButtonPress = () => {
    console.log('press')
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

    &__button {
        position: absolute;
        width: max-content;
        height: max-content;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        z-index: 1;
        // pointer-events: painted;
        pointer-events: none;

        // &.focused {
        //     pointer-events: all;
        // }

        // pointer-events: none;
    }
}
</style>