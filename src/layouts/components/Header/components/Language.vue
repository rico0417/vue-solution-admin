<template>
  <el-tooltip effect="dark" content="语言" placement="bottom" :offset="15" :show-after="1000">
    <el-dropdown trigger="click" @command="changeLanguage">
      <div class="universal-style">
        <SvgIcon name="i18n" :icon-style="{ width: '18px', height: '18px' }"></SvgIcon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languageList"
            :key="item.value"
            :command="item.value"
            :disabled="language === item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';

defineOptions({ name: 'Language' });

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed(() => globalStore.language);

const languageList = [
  { label: '简体中文', value: 'zh' },
  { label: 'English', value: 'en' }
];

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang;
  globalStore.setGlobalState('language', lang);
};
</script>

<style lang="scss" scoped>
@import '../styles/iconStyle.scss';
</style>
