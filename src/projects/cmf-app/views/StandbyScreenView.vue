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
            @on-update-sid="onUpdateScreenSid"
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
                    span {{ slot.name }}
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { APP_PREFIX } from '@app/config';
import g from 'gsap';

import { flattenMatrix } from '@/utils/matrix';

import UIBasePage from '@app/components/atoms/base/pages/BasePage.vue';
import StatusPanel from '@app/components/atoms/panels/StatusPanel.vue';
import CarouselStack from '@app/components/atoms/base/stacks/CarouselStack.vue';
import ControlSectionButton from '@app/components/atoms/base/buttons/ControlSectionButton.vue';
import MiniClock from '@app/components/atoms/base/timers/MiniClock.vue';


enum ButtonTypes {
    SECTION,
    MANUAL_PROGRAM,
    ASSISTED_PROGRAM
}

//! id for knob control

interface Slot {
    id: number;
    name: string;
    disabled?: boolean;
    type: ButtonTypes;
}

const slots = ref<Slot[][]>([
    [
        {
            id: 0, name: 'Manual',
            type: ButtonTypes.SECTION
        },
        {
            id: 1, name: 'Auto',
            type: ButtonTypes.SECTION
        },
        {
            id: 2, name: 'Assisted',
            type: ButtonTypes.SECTION
        },
        {
            id: 3, name: 'Favorites',
            type: ButtonTypes.SECTION
        },
        {
            id: 4, name: 'User Guide',
            type: ButtonTypes.SECTION
        },
        {
            id: 5, name: 'Bake',
            type: ButtonTypes.MANUAL_PROGRAM
        },
    ],
    [
        {
            id: 6, name: 'User',
            type: ButtonTypes.SECTION
        },
        {
            id: 7, name: 'Settings',
            type: ButtonTypes.SECTION
        },
        {
            id: 8, name: 'Guide',
            type: ButtonTypes.SECTION
        },
        {
            id: 9, name: 'Info',
            type: ButtonTypes.SECTION
        },
        // {
        //     id: 10, name: 'Slot 5',
        //     type: ButtonTypes.SECTION
        // },
        // {
        //     id: 11, name: 'Slot 6',
        //     type: ButtonTypes.MANUAL_PROGRAM
        // },
    ]
]);

const slotSid = ref(0);
const slotsLength = computed(() => flattenMatrix(slots.value).length);
const screenSid = computed(() => slotSid.value > 5 ? 1 : 0);

/* * * Knob * * */

const isKnobPressed = ref(false);

onMounted(() => {
    document.addEventListener('knobturnleft', knobTurnLeftHandler);
    document.addEventListener('knobturnright', knobTurnRightHandler);
    document.addEventListener('knobpress', knobPressHandler);
    document.addEventListener('knobrelease', knobReleaseHandler);
});

onUnmounted(() => {
    document.removeEventListener('knobturnleft', knobTurnLeftHandler);
    document.removeEventListener('knobturnright', knobTurnRightHandler);
    document.removeEventListener('knobpress', knobPressHandler);
    document.removeEventListener('knobrelease', knobReleaseHandler);
});

const knobReleaseHandler = (): void => { isKnobPressed.value = false };
const knobPressHandler = (): void => { isKnobPressed.value = true };

const knobTurnLeftHandler = (): void => {
    isKnobPressed.value = false;

    if (slotSid.value > 0) slotSid.value -= 1;
};

const knobTurnRightHandler = (): void => {
    isKnobPressed.value = false;

    if (slotSid.value < slotsLength.value - 1) slotSid.value += 1;
};

/* * * Buttons * * */

const onButtonPress = (slot: Slot): void => { slotSid.value = slot.id };
const onUpdateScreenSid = (): void => { };

/* * * Animations * * */

const onPageEnter = (el: Element, done: () => void): void => {
    g.fromTo(el, {
        opacity: .0,
        scale: .5
    }, {
        opacity: 1.0,
        scale: 1.0,
        duration: .5,
        ease: 'power4.out',
        onComplete: done
    });
};
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