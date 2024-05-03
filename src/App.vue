<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores/modules/global';
import { useTheme } from '@/hooks/useTheme';
import { reactive, computed, onMounted } from 'vue';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { getBrowserLang } from '@/utils/languageUtils';

const globalStore = useGlobalStore();

// 初始化主题
const { initTheme } = useTheme();
initTheme();

// 初始化语言
const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState('language', language);
});

// 初始化按钮相关配置
const buttonConfig = reactive({ autoInsertSpace: false });

// 初始化全局组件大小
const assemblySize = computed(() => globalStore.assemblySize);

// 初始化element-plus国际化
const locale = computed(() => {
  if (globalStore.language == 'zh') return zhCn;
  if (globalStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});
</script>
