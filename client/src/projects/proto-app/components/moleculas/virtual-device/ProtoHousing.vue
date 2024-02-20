<template lang="pug">
div(:class="[`${PROTO_APP_PREFIX}-housing`]")
    ProtoDisplay
        slot
    ProtoKnob(
        v-if="showKnob"
        @on-update-data="onUpdateKnobData"
        @on-turn-left="onKnobTurnLeft"
        @on-turn-right="onKnobTurnRight"
        @on-press="onKnobPress"
        @on-release="onKnobRelease"
    )
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config';

import { createCustomEvent } from '@utils/events';
import { type KnobEmittedData } from '@app/typings/controls';

import ProtoDisplay from './ProtoDisplay.vue';
import ProtoKnob from './physical-controls/ProtoKnob.vue';


export interface Props {
    showKnob: boolean
}

withDefaults(defineProps<Props>(), {
    showKnob: true
});

const onUpdateKnobData = (data: KnobEmittedData): void => {
    document.dispatchEvent(createCustomEvent('knobdata', {
        detail: data,
        bubbles: true
    }));
};

const onKnobTurnLeft = (data: KnobEmittedData): void => {
    document.dispatchEvent(createCustomEvent('knobturnleft', {
        detail: data,
        bubbles: true
    }));
};

const onKnobTurnRight = (data: KnobEmittedData): void => {
    document.dispatchEvent(createCustomEvent('knobturnright', {
        detail: data,
        bubbles: true
    }));
};

const onKnobPress = (data: KnobEmittedData): void => {
    document.dispatchEvent(createCustomEvent('knobpress', {
        detail: data,
        bubbles: true
    }));
};

const onKnobRelease = (data: KnobEmittedData): void => {
    document.dispatchEvent(createCustomEvent('knobrelease', {
        detail: data,
        bubbles: true
    }));
};

</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-housing {
    position: relative;
    display: flex;
    align-items: center;
    gap: 60px;

    .#{$PROTO_APP_PREFIX}-knob {
        display: block;
        // position: absolute;
        // top: 50%;
        // right: 40;
    }
}
</style>