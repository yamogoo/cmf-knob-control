<template lang="pug">
nav(
    :class="[`${PROTO_APP_PREFIX}-navigation`]"
)
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
</script>
