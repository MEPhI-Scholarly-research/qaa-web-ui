<template>
  <div class="quizCreatorWrapper">
    <div class="quizCreator"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'QuizCreate',
  data() {
    return {
      currentStep: 'common'
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles.module.scss';
</style>
