<script lang="ts">
import type { PropType } from 'vue'
import KitInput from '@/shared/uiKit/Input.vue'

type Props = {
  title: string
  description: string
  onSkip: (value: string) => void
  onNext: (value: string) => void
}

export default {
  name: 'card',
  components: { KitInput },
  props: {
    title: Object as PropType<Props['title']>,
    description: Object as PropType<Props['description']>,
    onSkip: Object as PropType<Props['onSkip']>,
    onNext: Object as PropType<Props['onNext']>
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onChange(value: string) {
      this.value = value
    },
    onLocalSkip() {
      this.onSkip && this.onSkip(this.value)
    },
    onLocalNext() {
      this.onNext && this.onNext(this.value)
    }
  }
}
</script>

<template>
  <div class="card">
    <h1 class="title">{{ title }}</h1>
    <div class="desc">
      {{ description }}
    </div>
    <div class="cardInput">
      <KitInput :value="value" :on-change="onChange" placeholder="Ваш ответ:"></KitInput>
    </div>
    <div class="footer">
      <div class="skip">
        <button class="btn btn-transparent button-skip" @click="onLocalSkip">skip</button>
      </div>
      <div class="next"><button class="btn button-next" @click="onLocalNext">next</button></div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: var(--border-radius-l);
  box-shadow: 0 0 30px 10px #33333323;
  padding: 24px 32px;
  max-width: 800px;
  min-width: 500px;
}

.card .footer {
  display: flex;
  width: 100%;
  justify-content: end;
}

.card .title {
  font-family: MontserratBold;
  font-size: 24px;
  color: var(--text-main-color);
  margin-bottom: 16px;
}

.card .desc {
  font-family: Montserrat;
  letter-spacing: 0.5px;
}

.cardInput {
  margin: 24px 0;
}
</style>
