<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/shared/components/Header.vue'

/**
 * TODO:
 * 1. Получать квиз по коду - активные или неактивные
 * 2. использовать авторизацию, то есть присылать запросы с заголовком токена
 * 3. механика переключения на новую карточку
 *
 *
 * иду по коду на апи, получаю токен сессии, кладу ее в локал стор, теперь буду ходить с токеном авторизации и текущей сессии
 */
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
