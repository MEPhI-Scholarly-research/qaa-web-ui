<script lang="ts">
import KitButton from '@/shared/uiKit/Button.vue'
import KitInput from '@/shared/uiKit/Input.vue'
import KitLink from '@/shared/uiKit/Link.vue'
import { setToken, setUserInfo } from '@/shared/utils/auth/storage'
import { apiClient } from '@/app/api'
import type { AccessTokenPayload } from '@/shared/common/types'

export default {
  name: 'AuthPage',
  components: { KitButton, KitInput, KitLink },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    onAuth() {
      apiClient
        .patch<{ token: string; payload: AccessTokenPayload }>('/login', {
          username: this.login,
          password: this.password
        })
        .then((response) => {
          setToken(response.data.token)
          setUserInfo({ displayName: 'default', login: '123' })

          const { path, query } = this.$route.query as { path: string; query: string }

          if (query === undefined) {
            window.location.replace('/')
          } else {
            const { code } = JSON.parse(query) as { code: string }
            window.location.replace(`${path}?code=${code}`)
          }
        })
        .catch((err) => {
          console.log({ err })
        })
    }
  }
}
</script>

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
            type="password"
          />
        </div>

        <div>
          <KitLink to="registration" title="Регистрация" />
        </div>

        <div class="submit">
          <KitButton title="Войти" :onClick="onAuth" />
        </div>
      </div>
    </div>
  </div>
</template>

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
  font-size: 14px;
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
