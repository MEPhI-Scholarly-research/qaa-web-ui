<script lang="ts">
import type { Socket } from 'socket.io-client'
import { apiClient } from '@/app/api'
import { getIO } from '@/shared/sockets'
import Card from '@/widgets/card/ui/index.vue'
import type { Card as CardType } from '@/shared/types'
import { getNextCard } from '@/shared/sockets'
import Loader from '@/shared/uiKit/Loader.vue'
import FallbackError from '@/shared/components/FallbackError.vue'
import type { AxiosError } from 'axios'

type Data = {
  sessionToken: string
  io: Socket | undefined
  currentCard: CardType | undefined
  loading: boolean
  error: {
    notFound: boolean
    quizInactive: boolean
    other: boolean
  }
}

export default {
  name: 'Play',
  components: { Card, Loader, FallbackError },
  beforeCreate() {
    apiClient
      .get<{ sessionToken: string }>(`/quiz/get_session_token?code=${this.$route.query.code}`)
      .then((response) => {
        this.sessionToken = response.data.sessionToken
        localStorage.setItem('sessionToken', response.data.sessionToken)
        this.io = getIO()
        getNextCard(this?.io as any).then((data) => {
          this.currentCard = data.payload
          this.loading = false
        })
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
    onSkip(value: string) {
      console.log('Skip', value)
    },
    onNext(value: string) {
      console.log('next', value)
    }
  },
  data() {
    return {
      sessionToken: '',
      io: undefined,
      currentCard: undefined,
      loading: true,
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

  <section class="main" v-if="!loading && !(error.notFound || error.quizInactive || error.other)">
    <Card
      :title="currentCard?.title"
      :description="currentCard?.description"
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
