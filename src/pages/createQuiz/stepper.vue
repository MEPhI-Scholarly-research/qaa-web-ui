<template>
  <div class="steps">
    <div
      class="step"
      v-for="(step, index) in steps"
      @click="() => onChangeStep && onChangeStep(step.value)"
      :key="step.value"
    >
      <div class="index">{{ index }}</div>
      <div class="label">{{ step.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

type Props = {
  steps: {
    title: string
    value: string
  }[]
  onChangeStep: (step: string) => void
}

export default {
  name: 'Stepper',
  props: {
    steps: Object as PropType<Props['steps']>,
    onChangeStep: Object as PropType<Props['onChangeStep']>
  }
}
</script>
