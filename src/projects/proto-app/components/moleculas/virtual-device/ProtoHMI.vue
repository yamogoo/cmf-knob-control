<template lang="pug">
div(:class="[`${PROTO_APP_PREFIX}-hmi`]")
    ProtoHousing(
        v-if="visualType === ProtoVisualTypes.HOUSING"
        :show-knob="showKnob"
    )
        slot
    ProtoFrontPanel(
        v-else-if="visualType === ProtoVisualTypes.FRONT_PANEL"
        :show-knob="showKnob"
    )
        slot
    ProtoDisplay(
        v-else-if="visualType === ProtoVisualTypes.DISPLAY"
    )
        slot
    ProtoScreen(
        v-else-if="visualType === ProtoVisualTypes.SCREEN"
    )
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config';

import ProtoHousing from './ProtoHousing.vue';
import ProtoFrontPanel from './ProtoFrontPanel.vue';
import ProtoDisplay from './ProtoDisplay.vue';
import ProtoScreen from './ProtoScreen.vue';

export interface Props {
    visualType?: ProtoVisualTypes,
    showKnob?: boolean
}

withDefaults(defineProps<Props>(), {
    visualType: ProtoVisualTypes.HOUSING,
    showKnob: true
});

</script>
<script lang="ts">
export enum ProtoVisualTypes {
    HOUSING = 'housing',
    FRONT_PANEL = 'panel',
    DISPLAY = 'display',
    SCREEN = 'screen'
}
</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-hmi {}
</style>