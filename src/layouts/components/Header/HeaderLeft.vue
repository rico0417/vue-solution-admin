<template>
  <div class="HeaderLeft-container">
    <CollapseIcon id="collapseIcon" />
    <Breadcrumb v-show="globalStore.breadcrumb" id="breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.HeaderLeft-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
