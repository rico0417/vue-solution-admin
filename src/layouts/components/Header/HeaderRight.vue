<template>
  <div class="headerRight">
    <div class="header-icon">
      <Size />
      <Sign />
      <Search />
      <Language />
      <Fullscreen />
      <UserInfo />
      <SystemSettings />
    </div>
  </div>
</template>

<script setup lang="ts">
import Fullscreen from './components/Fullscreen.vue';
import Search from './components/Search.vue';
import SystemSettings from './components/SystemSettings.vue';
import UserInfo from './components/UserInfo.vue';
import Language from './components/Language.vue';
import Size from './components/Size.vue';
import Sign from './components/Sign.vue';
</script>

<style lang="scss" scoped>
.headerRight {
  display: flex;
  align-items: center;
  justify-content: center;
  .header-icon {
    display: flex;
    align-items: center;
  }
}
</style>
