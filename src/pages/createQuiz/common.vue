<template>
  <div class="commonWrapper">
    <h1 class="title">Общее</h1>
    <div class="commonContent">
      <KitInput
        placeholder="Название квиза"
        :value="title"
        :onChange="(value) => (title = value)"
      />
      <KitInput
        placeholder="Описание квиза"
        :value="description"
        :onChange="(value) => (description = value)"
      />

      <KitInput
        placeholder="Продолжительность в минутах"
        :value="String(timeLimit)"
        :onChange="(value) => (timeLimit = Number(value))"
      />
    </div>

    <div class="footer">
      <KitButton
        :onClick="() => onForward && onForward({ title, description, timeLimit })"
        title="Дальше"
      />
    </div>
  </div>
</template>

<script lang="ts">
import KitInput from '@/shared/uiKit/Input.vue'
import KitButton from '@/shared/uiKit/Button.vue'
import type { PropType } from 'vue'

export default {
  name: 'Common',
  components: { KitInput, KitButton },
  data() {
    return {
      title: '',
      description: '',
      timeLimit: 0
    }
  },
  props: {
    onForward: Object as PropType<
      (data: { title: string; description: string; timeLimit: number }) => void
    >
  }
}
</script>

<style scoped lang="scss">
.commonWrapper {
  padding: 24px 16px;
}
.title {
  font-family: MontserratBold;
  margin-bottom: 24px;
}

.commonContent {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer {
  margin-top: 24px;
  display: flex;
  justify-content: end;
}
</style>
