<template>
  <div class="quizCreatorWrapper">
    <div class="quizCreator">
      <div class="createContent">
        <Constructor v-if="currentStep === 'constructor'" :commonData="commonData"/>
        <Common v-if="currentStep === 'common'" :onForward="onForward"/>
      </div>
      <div class="stepper">
        <ul>
          <li :class="`stepperItem ${step.value === currentStep ? 'active' : 'noactive'}`" v-for="step in steps" :key="step.value" @click="() => (currentStep = step.value as 'common' | 'constructor')"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Constructor from './constructor.vue'
import Common from './common.vue'
import type { PropType } from 'vue'

type Option = {
  title: string
  isCorrect: boolean
}

type Question = {
  title: string
  description: string
  options: Option[]
}

type Data = {
  currentStep: 'common' | 'constructor'
  questions: Question[],
  commonData: {title: string, description: string, timeLimit: number}
  steps: {value: string}[]
}

export default {
  name: 'QuizCreate',
  components: {Constructor, Common},
  data() {
    return {
      currentStep: 'common',
      questions: [],
      commonData: {title: '', description: '', timeLimit: 0},
      steps: [
        {value: 'common'},
        {value: 'constructor'},
      ]
    } as Data
  },
  methods: {
    onForward(data: any){
      this.commonData = data
      this.currentStep = 'constructor'
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles.module.scss';
</style>
