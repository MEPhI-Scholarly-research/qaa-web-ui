<script lang="ts">
import type { PropType } from 'vue'

type QuizPreviewProps = {
  title: string
  description: string
  duration: number // in milliseconds
  owner: string
  onStart: () => void
}

export default {
  name: 'QuizPreview',
  props: {
    title: Object as PropType<QuizPreviewProps['title']>,
    description: Object as PropType<QuizPreviewProps['description']>,
    duration: Object as PropType<QuizPreviewProps['duration']>,
    owner: Object as PropType<QuizPreviewProps['owner']>,
    onStart: Object as PropType<QuizPreviewProps['onStart']>
  },
  methods: {
    getRenderDuration(duration: number | undefined) {
      if (duration === undefined) {
        return ''
      }

      const minutes = Math.floor(duration / 60)
      const seconds = duration % 60

      if (seconds === 0) {
        return `${minutes} мин`
      }

      return `${minutes} мин ${seconds} сек`
    }
  }
}
</script>

<template>
  <div class="quizPreview">
    <div class="info">
      <div class="title">
        <h2 class="titleText">{{ title }}</h2>
      </div>
      <div class="desc">
        {{ description }}
      </div>
      <div class="addInfo">
        <div class="informationRow">
          <span>Продолжительность: </span
          ><span class="infoRowContent">{{ getRenderDuration(duration) }}</span>
        </div>
        <div class="informationRow">
          <span>Создатель: </span><span class="infoRowContent">{{ owner }}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="start"><button class="btn button-next" @click="onStart">Начать</button></div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Montserrat';
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  align-items: center;
}

.quizPreview {
  max-width: 500px;
  padding: 24px 32px;
  border: 1px solid #e9e9e9;
  border-radius: 11px;
}

.quizPreview .title .titleText {
  font-family: MontserratBold;
  font-size: 28px;
  margin-bottom: 16px;
  color: #333;
}

.desc {
  font-family: MontserratLight;
  font-style: italic;
}

.informationRow {
  font-family: MontserratLight;
  color: #929292;
  font-size: 16px;
}

.infoRowContent {
  font-family: MontserratLight;
  font-style: italic;
}

.addInfo {
  display: flex;
  gap: 4px;
  flex-direction: column;
  margin-top: 16px;
}

.footer {
  margin-top: 24px;
  display: flex;
  justify-content: end;
}
</style>
