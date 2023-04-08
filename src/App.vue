<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/shared/components/Header.vue'
</script>

<template>
  <div class="global">
    <MainHeader />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.global {
  position: relative;
}

.content {
  width: 100vw;
  height: calc(100vh - 60px);
}
</style>
