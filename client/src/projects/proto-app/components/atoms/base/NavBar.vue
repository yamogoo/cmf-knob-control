<template lang="pug">
div(
    :class="[`${PROTO_APP_PREFIX}-navbar`]"
)
    div(:class="[`${PROTO_APP_PREFIX}-navbar-container`]")
        OptionPicker(
            :options="options"
            :init-value="options[0]"
            @on-update-option="onUpdateOption"
        )
        OptionPicker(
            :options="options"
            :init-value="options[0]"
            @on-update-option="onUpdateOption"
        )
</template>

<script setup lang="ts">
import { PROTO_APP_PREFIX } from '@proto/config'
import OptionPicker from '@proto/components/atoms/base/pickers/OptionPicker.vue';
import { type Option } from '@proto/components/atoms/base/pickers/BaseOptionPicker.vue';

const options: Array<Option> = [
    { name: 'default', value: 'default' },
    { name: 'default', value: 'default' },
];

const onUpdateOption = (id: number): void => {
    console.log(options[id])
};

</script>

<style lang="scss">
$navbar: (
    xs: (),
    sm: (),
    md: (),
    lg: (),
    xl: ()
);

.#{PROTO_APP_PREFIX}-navbar {
    @include box(auto, max-content);
}
</style>