<script lang="ts">
import type { Socket } from 'socket.io-client'
import { apiClient } from '@/app/api'
import Card from '@/widgets/card/SelectCard.vue'
import Loader from '@/shared/uiKit/Loader.vue'
import FallbackError from '@/shared/components/FallbackError.vue'
import QuizPreview from '@/widgets/quizPreview/index.vue'
import type { AxiosError } from 'axios'

type Option = {
  title: string
  serial: number
}

type Question = {
  title: string
  description: string
  options: Option[]
}

type Data = {
  sessionToken: string
  io: Socket | undefined
  currentCard: any
  loading: boolean
  prevData: {
    quiz: { uuid: string; title: string; description: string; time_limit: number; owner: string }
  }
  questions: Question[]
  isPreview: boolean
  error: {
    notFound: boolean
    quizInactive: boolean
    other: boolean
  }
}

export default {
  name: 'Play',
  components: { Card, Loader, FallbackError, QuizPreview },
  beforeCreate() {
    apiClient
      .get<any>(`/quiz/${this.$route.query.code}`)
      .then((response) => {
        this.prevData = response.data
        console.log(this.prevData.quiz)
        this.loading = false
      })
      .catch((err: AxiosError) => {
        switch (err?.response?.status) {
          case 404:
            this.error.notFound = true
            break
          case 451:
            this.error.quizInactive = true
            break

          default:
            this.error.other = true
            break
        }

        this.loading = false
      })
  },
  methods: {
    onSkip(serial: number) {
      console.log('Skip', serial)
    },
    onNext(serial: number) {
      console.log('next', serial)
    },
    onSelect(serial: number) {
      console.log('select', serial)
    },
    onStart() {
      this.loading = true
      this.isPreview = false
      apiClient
        .get<any>(`/quiz/start/${this.prevData.quiz.uuid}`)
        .then((response) => {
          console.log({ response })
          this.loading = false
          this.questions = response.data.quiz.questions
          this.currentCard = this.questions[0]
        })
        .catch((err: AxiosError) => {
          switch (err?.response?.status) {
            case 404:
              this.error.notFound = true
              break
            case 451:
              this.error.quizInactive = true
              break

            default:
              this.error.other = true
              break
          }

          this.loading = false
        })
    }
  },
  data() {
    return {
      sessionToken: '',
      io: undefined,
      currentCard: undefined,
      loading: true,
      prevData: {},
      isPreview: true,
      error: {
        notFound: false,
        quizInactive: false,
        other: false
      }
    } as Data
  }
}
</script>

<template>
  <div class="loaderWrapper" v-if="loading"><Loader :loading="loading"></Loader></div>

  <section
    class="main"
    v-if="isPreview && !loading && !(error.notFound || error.quizInactive || error.other)"
  >
    <QuizPreview
      :title="prevData.quiz.title"
      :description="prevData.quiz.description"
      :duration="prevData.quiz.time_limit / 1000"
      :owner="prevData.quiz.owner"
      :onStart="onStart"
    ></QuizPreview>
  </section>

  <section
    class="main"
    v-if="!isPreview && !loading && !(error.notFound || error.quizInactive || error.other)"
  >
    <Card
      :title="currentCard?.title"
      :description="currentCard?.description"
      :options="currentCard.options"
      :onSelect="onSelect"
      :on-next="onNext"
      :on-skip="onSkip"
    ></Card>
  </section>

  <div
    class="errorWrapper"
    v-if="!loading && (error.notFound || error.quizInactive || error.other)"
  >
    <FallbackError title="NotFound" v-if="error.notFound"></FallbackError>
    <FallbackError title="Quiz is inactive" v-if="error.quizInactive"></FallbackError>
    <FallbackError title="Other error" v-if="error.other"></FallbackError>
  </div>
</template>

<style scoped>
.main,
.loaderWrapper,
.errorWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
