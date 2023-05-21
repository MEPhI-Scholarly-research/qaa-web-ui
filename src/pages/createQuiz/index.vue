<template>
  <div class="quizCreatorWrapper"></div>
</template>

<!-- 
  TODO: 
    - common
      - title
      - description
      - time_limit
    - constructor
      - list questions
    - stepper styles
    - query params
    - api integration
 -->

<script lang="ts">
export default {
  name: 'QuizCreator',
  data() {
    return {
      currentStep: 'common'
    }
  }
}
</script>

<style scoped>
.quizCreatorWrapper {
}
</style>
