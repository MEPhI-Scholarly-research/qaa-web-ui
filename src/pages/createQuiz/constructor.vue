<template>
  <div class="constructor">
    <QuestionsSidebar
      :onChangeQuestion="(index) => (currentQuestion = index)"
      :questions="questions"
      :currentQuestionIndex="currentQuestion"
      :onAddQuestion="
        () =>
          questions.push({
            title: 'New question',
            options: [],
            correctOptionIndex: 0,
            description: ''
          })
      "
    />
    <div class="quizMaker">
      <h1 class="quizMakerTitle">Question {{ currentQuestion + 1 }}</h1>
      <KitInput
        :value="questions[currentQuestion].title"
        :onChange="(value) => (questions[currentQuestion].title = value)"
      />

      <div class="optionList">
        <span>Ответы:</span>
        <ul>
          <li v-for="(option, index) in questions[currentQuestion].options" :key="index">
            <label
              ><input
                type="radio"
                :name="`name${currentQuestion}`"
                :checked="questions[currentQuestion].correctOptionIndex === index"
                @change="() => (questions[currentQuestion].correctOptionIndex = index)"
              />
              <KitInput
                :value="option.title"
                :onChange="(value) => (questions[currentQuestion].options[index].title = value)"
              />
            </label>
          </li>
        </ul>
        <KitButton
          :onClick="() => questions[currentQuestion].options.push({ title: '' })"
          title="Добавить ответ"
        />
      </div>
      <div class="footer">
        <KitButton :onClick="create" title="Создать квиз" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type Option = {
  title: string
}

type Question = {
  title: string
  description: string
  correctOptionIndex: number
  options: Option[]
}

type Data = {
  questions: Question[]
  currentQuestion: number
}

import QuestionsSidebar from './QuestionsSidebar.vue'
import KitInput from '@/shared/uiKit/Input.vue'
import KitButton from '@/shared/uiKit/Button.vue'
import type { PropType } from 'vue'
import { apiClient } from '@/app/api'
import router from '@/app/routes'

export default {
  name: 'Constructor',
  components: { QuestionsSidebar, KitInput, KitButton },
  data() {
    return {
      questions: [
        {
          title: 'Hello1',
          description: '1231',
          correctOptionIndex: 1,
          options: [{ title: '123' }, { title: 'sfasd' }, { title: '12sdfsdf3' }]
        },
        { title: 'Hello2', description: '1231', correctOptionIndex: 0, options: [{ title: '123' }] }
      ],
      currentQuestion: 0
    } as Data
  },
  props: {
    commonData: Object as PropType<{ title: string; description: string; timeLimit: number }>
  },
  methods: {
    create() {
      apiClient
        .post('/quiz', {
          quiz: {
            type: 1,
            title: this.commonData?.title,
            description: this.commonData?.description,
            time_limit: (this.commonData?.timeLimit || 0) * 60 * 1000,
            questions: this.questions.map((question, qSerial) => ({
              type: 1,
              serial: qSerial,
              title: question.title,
              description: question.description,
              options: question.options.map((option, serial) => ({
                title: option.title,
                serial,
                is_correct: serial === question.correctOptionIndex
              }))
            }))
          }
        })
        .then(() => {
          router.push({ name: 'quizList' })
        })
      console.log({ commonData: this.commonData, questions: this.questions })
    }
  }
}
</script>
