<template>
  <el-tooltip effect="dark" content="组件尺码" placement="bottom" :offset="15" :show-after="1000">
    <el-dropdown trigger="click" @command="setAssemblySize">
      <div class="universal-style">
        <SvgIcon name="size" :icon-style="{ width: '18px', height: '18px' }"></SvgIcon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in assemblySizeList"
            :key="item.value"
            :command="item.value"
            :disabled="assemblySize === item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';

defineOptions({ name: 'Size' });

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeList = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' }
];

const setAssemblySize = (item: any) => {
  if (assemblySize.value === item) return;
  globalStore.setGlobalState('assemblySize', item);
};
</script>

<style lang="scss" scoped>
@import '../styles/iconStyle.scss';
</style>
