<template>
  <div class="createSidebar">
    <ul class="questionList">
      <li
        :class="`questionListItem ${currentQuestionIndex === index ? 'active' : 'noactive'}`"
        v-for="(question, index) in questions"
        :key="question.title"
        @click="() => onChangeQuestion && onChangeQuestion(index)"
      >
        {{ question.title }}
      </li>
    </ul>
    <KitButton title="+" :onClick="() => onAddQuestion && onAddQuestion()" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import KitButton from '@/shared/uiKit/Button.vue'

type Question = {
  title: string
}

export default {
  name: 'QuestionsSidebar',
  components: { KitButton },
  props: {
    questions: Object as PropType<Question[]>,
    currentQuestionIndex: Object as PropType<number>,
    onChangeQuestion: Object as PropType<(index: number) => void>,
    onAddQuestion: Object as PropType<() => void>
  }
}
</script>

<style lang="scss">
@import './styles.module.scss';
</style>
