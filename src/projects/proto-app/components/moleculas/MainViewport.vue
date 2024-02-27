<template lang="pug">
div(
    :class="[`${PROTO_APP_PREFIX}-main-viewport`]"
)
    slot
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
</script>

<style lang="scss">
$proto-view: (
    xs: (),
    sm: (),
    md: (),
    lg: (),
    xl: ()
);

.#{$PROTO_APP_PREFIX}-main-viewport {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);
    background-color: #eaeaea;
}
</style>