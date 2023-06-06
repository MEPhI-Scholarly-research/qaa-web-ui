<template>
  <div class="quizWrapper">
    <QuizCard
      v-for="quiz in quizzes"
      :key="quiz.uuid"
      :title="quiz.title"
      :description="quiz.description"
      :owner="quiz.owner"
      :uuid="quiz.uuid"
      :duration="quiz.time_limit / 1000"
    />
  </div>
</template>

<script lang="ts">
import QuizCard from '@/widgets/quizCard/index.vue'
import { apiClient } from '@/app/api'

type QuizPreviewCard = {
  uuid: string
  title: string
  description: string
  time_limit: number // in milliseconds
  owner: string
}

export default {
  name: 'QuizList',
  components: { QuizCard },
  mounted() {
    console.log(this.$route.params)
    apiClient
      .get<{ quizzes: QuizPreviewCard[] }>(`/quizzes?limit=10000&offset=0`)
      .then((response) => {
        this.quizzes = response.data.quizzes
      })
  },
  data() {
    return {
      quizzes: [] as QuizPreviewCard[]
    }
  }
}
</script>

<style lang="scss" scoped>
.quizWrapper {
  padding: 32px;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  width: calc(100vw - 68px);
  grid-template-columns: 25% 25% 25% 25%;
}
</style>
