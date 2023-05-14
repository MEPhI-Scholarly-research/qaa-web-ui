<script lang="ts">
import type { PropType } from 'vue'
import CardInputContent from '../variants/Input.vue'

type CardType = 'input' | 'select'

type PropsBase = {
  title: string
  description: string
  onSkip: (value: string) => void
  onNext: (value: string) => void
}

type InputProps = PropsBase & {
  inputType: 'string' | 'number'
}

type SelectProps = PropsBase & {
  answers: {
    title: string
    value: string
  }
}

type Props<Type> = Type extends 'input' ? InputProps : SelectProps

export default {
  name: 'card',
  components: { CardInputContent },
  props: {
    title: Object as PropType<Props<'input'>['title']>,
    description: Object as PropType<Props['description']>,
    type: Object as PropType<CardType>,
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
      <CardInputContent :value="value" :on-change="onChange" />
    </div>
    <div class="footer">
      <div class="skip">
        <button class="btn btn-transparent button-skip" @click="onLocalSkip">пропустить</button>
      </div>
      <div class="next"><button class="btn button-next" @click="onLocalNext">далее</button></div>
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
