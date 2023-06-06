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
import type { Socket } from 'socket.io-client'
import { decodeToken } from '@/shared/utils'

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
    quiz: {
      uuid: string
      title: string
      description: string
      time_limit: number
      owner: string
    }
  }
  lastAnswer: string
  previousAnswers: { question: string; answers: string[] }[]
  socket: Socket | undefined
  sessionId: string | undefined
  isEnding: boolean
  isFinished: boolean
  questions: Question[]
  isPreview: boolean
  timer: number
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
        console.log(this.lastAnswer)
        this.lastAnswer = this.previousAnswers[this.currentCardIndex + 1]?.answers[0] || ''
        console.log(this.lastAnswer)
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
    onSelect(next: string, prev: string) {
      console.log({ next, prev })
      this.sendMessage?.('answer', { question: this.currentCard.uuid, answer: next })
      prev && this.sendMessage?.('delete-answer', { question: this.currentCard.uuid, answer: prev })
    },
    onFinish() {
      this.sendMessage?.('finish', { token: this.sessionToken })
      this.socket?.disconnect()
      this.isFinished = true
      this.$router.push({ name: 'individualResults', params: { sessionId: this.sessionId } })
    },
    onStart() {
      this.loading = true
      this.isPreview = false
      apiClient
        .patch<any>(`/quiz/${this.prevData.quiz.uuid}/start`)
        .then((response) => {
          console.log({ response })
          this.loading = false
          this.questions = response.data.quiz.questions
          this.currentCard = this.questions[0] // можно ставить уже решенный
          // console.log({ data: response.data })
          this.previousAnswers = response.data.answers
          this.lastAnswer = this.previousAnswers?.[0]?.answers?.[0]
          this.sessionToken = response.data.token
          this.sessionId = decodeToken(response.data.token)['session-uuid'] as string
          const { sendIOMessage, socket } = getIO(this.sessionToken, (socket) =>
            console.log(socket)
          )

          // Обработка времени
          socket.on('message', (message) => {
            const parsedMessage = JSON.parse(message) as { type: string; left: number }
            if (parsedMessage.type === 'time') {
              if (parsedMessage.left === 0) {
                this.isFinished = true
              }
              this.timer = parsedMessage.left
            }
          })
          this.sendMessage = sendIOMessage
          this.socket = socket
        })
        .catch((err: AxiosError) => {
          console.log({ err })
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
      isFinished: false,
      timer: 0,
      socket: undefined,
      lastAnswer: '',
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

  <div class="finished" v-if="isFinished">finished!!</div>

  <!-- fixed timer -->
  <Timer
    :time_limit="timer"
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
      :defaultValue="lastAnswer"
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
