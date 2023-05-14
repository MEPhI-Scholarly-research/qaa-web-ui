<script lang="ts">
import type { Route } from '@/app/routes/routes'
import { getUserInfo, clearToken, clearUserInfo } from '@/shared/utils/auth/storage'
import { isAuth } from '@/shared/utils'
console.log({ auth: isAuth() })
export default {
  name: 'MainHeader',
  data() {
    return {
      routes: this.$router.options.routes as Route[],
      displayName: getUserInfo()?.displayName,
      isAuth: isAuth()
    }
  },
  methods: {
    logout() {
      clearToken()
      clearUserInfo()
      this.$router.push({ name: 'home' })
      this.isAuth = false
    },
    login() {
      this.$router.push({ name: 'auth' })
    }
  }
}
</script>

<template>
  <header>
    <nav class="headerMenu">
      <div class="logo">
        <span class="logoLabel">
          <router-link :to="{ name: 'home' }">QUAN</router-link>
        </span>
      </div>
      <div class="left">
        <ul class="menu">
          <li v-for="route in routes" :key="route.name">
            <router-link :to="{ name: route.name }" v-if="route.meta.show">
              <span class="itemLabel">{{ route.meta.title }}</span>
            </router-link>
          </li>
          <li v-if="isAuth">
            <span class="itemLabel" @click="logout">Выйти</span>
          </li>
          <li v-if="!isAuth">
            <span class="itemLabel" @click="login">Войти</span>
          </li>
        </ul>
        <span class="logged" v-if="isAuth">Привет, {{ displayName }}</span>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  left: 0;
  top: 0;
  width: 100vw;
  height: 60px;
  background-color: #ffffff7f;
  backdrop-filter: blur(5px);
  padding: 0 32px;

  nav.headerMenu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .logoLabel {
      font-family: MontserratBlack;
      letter-spacing: 2px;
      font-size: 18px;
      a {
        line-height: 29px;
        color: var(--text-main-color);
      }
    }

    .left {
      display: flex;
      gap: 8px;
      .menu {
        display: flex;
        gap: 8px;
        .itemLabel {
          font-family: Montserrat;
          font-size: 15px;
          color: var(--text-main-color);
          transition: border-bottom 0.15s ease-in-out;
          cursor: pointer;
          line-height: 29px;
          &:hover {
            border-bottom: 1px solid var(--accent-color);
          }
        }
      }
    }
  }
}

.logged {
  font-family: Montserrat;
  background-color: var(--main-color);
  color: var(--text-main-color-reverse);
  padding: 5px 10px;
  border-radius: 16px;
}
</style>
