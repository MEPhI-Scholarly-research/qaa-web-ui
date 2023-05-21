<script lang="ts">
import { apiClient } from '@/app/api'
import Card from '@/widgets/card/SelectCard.vue'
import Loader from '@/shared/uiKit/Loader.vue'
import FallbackError from '@/shared/components/FallbackError.vue'
import QuizPreview from '@/widgets/quizPreview/index.vue'
import EndingTest from '@/widgets/endingTest/index.vue'
import Timer from '@/widgets/timer/index.vue'
import type { AxiosError } from 'axios'
import { getIO } from '@/shared/sockets'

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
  sendMessage: ReturnType<typeof getIO>['sendIOMessage'] | undefined
  currentCard: any
  currentCardIndex: number
  loading: boolean
  prevData: {
    quiz: { uuid: string; title: string; description: string; time_limit: number; owner: string }
  }
  isEnding: boolean
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
  components: { Card, Loader, FallbackError, QuizPreview, EndingTest, Timer },
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
    nextCard() {
      if (this.currentCardIndex === this.questions.length - 1) {
        this.isEnding = true
      } else {
        this.currentCard = this.questions[this.currentCardIndex + 1]
        this.currentCardIndex++
      }
    },
    onSkip(uuid: string) {
      console.log('Skip', uuid)
      this.nextCard()
    },
    onNext(uuid: string) {
      console.log('next', uuid)
      this.nextCard()
    },
    onSelect(uuid: string) {
      console.log('select', uuid)
      this.sendMessage?.('answer', { question: this.currentCard.uuid, answer: uuid })
    },
    onFinish() {
      this.sendMessage?.('finish', { token: this.sessionToken })
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
          this.sessionToken = response.data.token
          const { sendIOMessage } = getIO(this.sessionToken, (socket) => console.log(socket))
          this.sendMessage = sendIOMessage
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
      sendMessage: undefined,
      currentCard: undefined,
      currentCardIndex: 0,
      loading: true,
      prevData: {},
      isPreview: true,
      isEnding: false,
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
  <!-- loader -->
  <div class="loaderWrapper" v-if="loading"><Loader :loading="loading"></Loader></div>

  <!-- fixed timer -->
  <Timer
    :time_limit="prevData.quiz.time_limit"
    v-if="
      !isEnding && !isPreview && !loading && !(error.notFound || error.quizInactive || error.other)
    "
  ></Timer>

  <!-- preview quiz
    TODO: move to component
  -->
  <section
    class="main"
    v-if="
      !isEnding && isPreview && !loading && !(error.notFound || error.quizInactive || error.other)
    "
  >
    <QuizPreview
      :title="prevData.quiz.title"
      :description="prevData.quiz.description"
      :duration="prevData.quiz.time_limit / 1000"
      :owner="prevData.quiz.owner"
      :onStart="onStart"
    ></QuizPreview>
  </section>

  <!-- ending test -->
  <section
    class="main"
    v-if="isEnding && !loading && !(error.notFound || error.quizInactive || error.other)"
  >
    <EndingTest :onFinish="onFinish"></EndingTest>
  </section>

  <!-- quiz cards -->
  <section
    class="main"
    v-if="
      !isEnding && !isPreview && !loading && !(error.notFound || error.quizInactive || error.other)
    "
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

  <!-- display errors -->
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
