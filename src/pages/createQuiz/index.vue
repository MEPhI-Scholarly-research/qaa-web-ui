<template>
  <div class="quizCreatorWrapper">
    <div class="quizCreator">
      <div class="createContent">
        <Constructor v-if="currentStep === 'constructor'" />
        <Common v-if="currentStep === 'common'" />
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
  steps: {value: string}[]
}

export default {
  name: 'QuizCreate',
  components: {Constructor, Common},
  data() {
    return {
      currentStep: 'common',
      questions: [],
      steps: [
        {value: 'common'},
        {value: 'constructor'},
      ]
    } as Data
  }
}
</script>

<style scoped lang="scss">
@import './styles.module.scss';
</style>
