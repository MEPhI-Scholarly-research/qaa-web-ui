<script lang="ts">
import { apiClient } from '@/app/api'
import type { PropType } from 'vue'
import FallbackError from '@/shared/components/FallbackError.vue'

export interface SessionResult {
  uuid: string
  user: string
  start: string
  score: number
  quiz: Quiz
}

export interface Quiz {
  uuid: string
  owner: string
  type: number
  title: string
  description: string
  time_limit: number
  questions: Question[]
}

export interface Question {
  uuid: string
  type: number
  title: string
  description: string
  serial: number
  options: Option[]
}

export interface Option {
  uuid: string
  title: string
  serial: number
  is_correct: boolean
  selected: boolean
}

type ResultRow = {
  index: number
  title: string
  userAnswer: string
  rightAnswer: string
  isCorrect: boolean
}

type Props = {
  results: SessionResult
}

type Data = {
  rows: ResultRow[]
  isNotFound: boolean
}

const converter = (results: { session: SessionResult }): ResultRow[] => {
  return results.session.quiz.questions.map((question, index) => {
    const userAnswer = question.options.reduce((prev, curr) => {
      if (curr.selected) {
        return curr.title
      }
      return prev
    }, 'No answer')

    const rightAnswer = question.options.reduce((prev, curr) => {
      if (curr.is_correct) {
        return curr.title
      }
      return prev
    }, 'No answer')

    const isCorrect = question.options.some((option) => option.is_correct && option.selected)
    return {
      index,
      title: question.title,
      userAnswer,
      rightAnswer,
      isCorrect: isCorrect
    }
  })
}

export default {
  name: 'UserResults',
  components: { FallbackError },
  props: {
    results: Object as PropType<Props['results']>
  },
  mounted() {
    console.log(this.$route.params)
    apiClient
      .get(`/quiz/session/${this.$route.params.sessionId}`)
      .then((response) => {
        const results = response.data
        this.rows = converter(results)
      })
      .catch(() => {
        this.isNotFound = true
      })
  },
  data() {
    return {
      rows: [],
      isNotFound: false
    } as Data
  }
}
</script>

<template>
  <div class="errorWrapper" v-if="isNotFound">
    <FallbackError title="NotFound"></FallbackError>
  </div>

  <div class="tableWrapper" v-if="!isNotFound">
    <table>
      <thead>
        <tr class="table-headers">
          <th>#</th>
          <th>Title</th>
          <th>Your answer</th>
          <th>Right answer</th>
          <th>Correct</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.index">
          <td class="isOverflow">{{ row.index }}</td>
          <td class="isOverflow">{{ row.title }}</td>
          <td class="isOverflow">{{ row.userAnswer }}</td>
          <td class="isOverflow">{{ row.rightAnswer }}</td>
          <td class="isOverflow">{{ row.isCorrect ? 'yes' : 'no' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
$mainColor: rgb(34, 20, 184);
.tableWrapper {
  padding: 24px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  overflow: hidden;
  font-family: Montserrat;
  border-radius: 12px;

  thead {
    color: var(--text-main-color-reverse);
  }

  td,
  th {
    border-top: 1px solid #ecf0f1;
    border-bottom: 1px solid #ecf0f1;
    padding: 16px 12px;
  }

  td {
    border-left: 1px solid #ecf0f1;
    border-right: 1px solid #ecf0f1;
  }

  .isOverflow {
    text-overflow: ellipsis;
  }

  th {
    background-color: $mainColor;
  }
}

.errorWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
