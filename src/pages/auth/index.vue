<template>
  <div class="container">
    <div class="wrapper">
      <h2 class="login-title">Вход</h2>

      <div class="login-form">
        <div>
          <label for="email">Логин</label>
          <KitInput
            placeholder="Введите логин"
            :value="login"
            :onChange="(value) => (login = value)"
          />
        </div>

        <div>
          <label for="password">Пароль</label>
          <KitInput
            placeholder="Введите пароль"
            :value="password"
            :onChange="(value) => (password = value)"
          />
        </div>

        <div class="submit">
          <KitButton title="Войти" :onClick="onAuth" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import KitButton from '@/shared/uiKit/Button.vue'
import KitInput from '@/shared/uiKit/Input.vue'
// import jwt from 'jsonwebtoken'
import { setToken } from '@/shared/utils/auth/storage'

export default {
  name: 'AuthPage',
  components: { KitButton, KitInput },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    onAuth() {
      /**
       * Buffer.from error: https://github.com/microsoft/TypeScript/issues/23155
       */
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      setToken(token)
    }
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Montserrat;
}

.wrapper {
  width: 400px;
  margin: auto;
  padding: 36px 48px 48px 48px;
  border: 1px solid #e9e9e9;

  border-radius: 11px;
}

.login-title {
  padding: 15px;
  font-size: 22px;
  text-align: center;
  font-family: MontserratBold;
}

.login-form {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
}

.login-form input {
  width: 100%;
  padding: 1.2rem;
  border-radius: 9px;
  border: none;
}

.login-form input:focus {
  outline: none;
}

.submit {
  width: 100%;
  margin-top: 16px;
  & > * {
    width: 100%;
  }
}
</style>
