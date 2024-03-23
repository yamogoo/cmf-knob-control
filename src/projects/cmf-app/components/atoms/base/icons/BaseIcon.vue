<template lang="pug">
component(
    :is="component"
    v-if="show && name"
    :class="[CLASS_NAME, `${CLASS_NAME}--${color}`]"
)
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { APP_PREFIX } from '@app/config';
import { Icons } from './icons';

const CLASS_NAME = `${APP_PREFIX}-icon`;

interface Props {
    name?: Icons,
    color?: Colors,
    show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    show: true,
    name: undefined,
    color: undefined
});

const component = defineAsyncComponent(() => {
    return import(`./symbols/${props.name}.vue`);
});
</script>

<script lang="ts">
export * from './icons';

export enum Colors {
    PAPRICA = 'paprica',
    PAPRICA_DEEP = 'paprica-deep',
    CARDAMON = 'cardamon',
    CARDAMON_DEEP = 'cardamon-deep',
    JUPITER = 'jupiter',
    JUPITER_DEEP = 'jupiter-deep',
    WALNUT = 'walnut',
    WALNUT_DEEP = 'walnut-deep',
    TURMERIC = 'turmeric',
    TURMERIC_DEEP = 'turmeric-deep',
    GRAY = 'gray',
    GRAY_SHADOW = 'gray-shadow'
}
</script>

<style lang="scss">
.#{$APP_PREFIX} {
    @include box(100%);

    &-icon {
        fill: inherit;

        path: {
            fill: inherit;
        }

        // colors:
        &.white {
            fill: $WHITE;
        }

        &.black {
            fill: $BLACK;
        }

        &.gray {
            fill: $GRAY;
        }

        &.gray-shadow {
            fill: $GRAY_SHADOW;
        }

        &.cardamon {
            fill: $CARDAMON;
        }

        &.cardamon-deep {
            fill: $CARDAMON_DEEP;
        }

        &.paprica {
            fill: $PAPRICA;
        }

        &.paprica-deep {
            fill: $PAPRICA_DEEP;
        }

        &.turmeric {
            fill: $TURMERIC;
        }

        &.turmeric-deep {
            fill: $TURMERIC_DEEP;
        }

        &.jupiter {
            fill: $JUPITER;
        }

        &.jupiter-deep {
            fill: $JUPITER_DEEP;
        }

        &.walnut {
            fill: $WALNUT;
        }

        &.walnut-deep {
            fill: $WALNUT_DEEP;
        }
    }
}
</style>