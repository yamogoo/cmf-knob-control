<template lang="pug">
div(:class="`${PROTO_APP_PREFIX}-front-panel`")
    ProtoHousing
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config';
import ProtoHousing from './ProtoHousing.vue';

</script>

<style lang="scss">
.#{$PROTO_APP_PREFIX}-front-panel {}
</style>