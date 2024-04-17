<template lang="pug">
//- NavBar
MainViewport
    ProtoHMI(
        v-if="showHMI"
    )
        slot
</template>

<script setup lang="ts">
// import NavBar from '@proto/components/atoms/base/NavBar.vue';
import MainViewport from '@proto/components/moleculas/MainViewport.vue'
import ProtoHMI from '@proto/components/moleculas/virtual-device/ProtoHMI.vue'

export interface Props {
  showHMI?: boolean
}

withDefaults(defineProps<Props>(), {
  showHMI: true
})
</script>

<style lang="scss"></style>
