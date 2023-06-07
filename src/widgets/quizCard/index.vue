<script lang="ts">
import type { PropType } from 'vue'

type QuizCardProps = {
  title: string
  description: string
  duration: number // in milliseconds
  owner: string
  uuid: string
}

export default {
  name: 'QuizCard',
  props: {
    title: Object as PropType<QuizCardProps['title']>,
    description: Object as PropType<QuizCardProps['description']>,
    duration: Object as PropType<QuizCardProps['duration']>,
    owner: Object as PropType<QuizCardProps['owner']>,
    uuid: Object as PropType<QuizCardProps['owner']>
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
  <router-link :to="{ name: 'play', query: { code: uuid } }" class="quizCard">
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
  </router-link>
</template>

<style scoped lang="scss">
.quizCard {
  display: block;
  max-width: 500px;
  padding: 24px 32px;
  border: 1px solid #e9e9e9;
  border-radius: 11px;
  color: var(--text-main-color);
  &:hover {
    background-color: #eaecee;
  }
}

.titleText {
  font-family: MontserratBold;
  font-size: 28px;
  margin-bottom: 16px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.desc {
  font-family: MontserratLight;
  font-style: italic;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
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
