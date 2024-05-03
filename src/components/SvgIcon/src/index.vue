<template>
  <svg class="svg-icon" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

defineOptions({ name: 'SvgIcon' });

interface SvgProps {
  name: string; // 图标的名称 ==> 必传
  prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
  iconStyle?: CSSProperties; // 图标的样式 ==> 非必传
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: 'icon',
  iconStyle: () => ({ width: '24px', height: '24px' })
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
  &:focus {
    outline: none;
  }
}
</style>
