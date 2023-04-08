<script lang="ts">
import KitInput from '@/shared/uiKit/Input.vue'
import KitButton from '@/shared/uiKit/Button.vue'
import router from '@/app/routes'

export default {
  name: 'InvitePage',
  components: { KitInput, KitButton },
  data() {
    return {
      code: ''
    }
  },
  methods: {
    onChangeCode(value: string) {
      this.code = value
    },
    onEnter() {
      console.log(this.code)
      router.push({ name: 'play', query: { code: this.code } })
    }
  }
}
</script>

<template>
  <div class="invite">
    <span class="inviteDesc">Введи уникальный код для старта квиза </span>
    <div class="inviteInput">
      <KitInput :value="code" :onChange="onChangeCode" placeholder="Здесь укажите код..." />
      <KitButton title="Начать" :onClick="onEnter" mode="normal" />
    </div>
  </div>
</template>

<style lang="scss">
.invite {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  margin-top: -100px; // хоть и ровно по середине весь контент, но что-то смотрится не очень
}

.inviteDesc {
  font-family: MontserratBold;
  font-size: 24px;
  margin: 64px;
  width: 500px;
  text-align: center;
}

.inviteInput {
  display: flex;
  gap: 16px;
  width: 600px;
}
</style>
