<template lang="pug">
div(:class="`${PROTO_APP_PREFIX}-display`")
    div(:class="[`${PROTO_APP_PREFIX}-display-container`]")
        ProtoScreen
            slot
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config';
import ProtoScreen from './ProtoScreen.vue';

</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-display {
    position: relative;
    border-radius: 56px;
    border: 1px solid rgb(34, 34, 34);
    background-color: black;
    padding: 40px;
    overflow: hidden;

    &-container {
        position: relative;
        width: 640px;
        height: 480px;
    }
}
</style>