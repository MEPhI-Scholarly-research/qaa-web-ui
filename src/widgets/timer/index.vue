<template>
  <div class="timer">
    <h2>
      Оставшиеся время:
      <div class="time">
        <div class="minutes">{{ minutes }}</div>
        <div class="seconds">{{ seconds }}</div>
      </div>
    </h2>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

type Props = {
  time_limit: number // in milliseconds
}

export default {
  name: 'Timer',
  beforeMount() {
    this.timer = setInterval(() => {
      const seconds = (this.time_limit || 0) / 1000
      this.minutes = Math.floor(seconds / 60)
      this.seconds = seconds % 60
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  props: {
    time_limit: Object as PropType<Props['time_limit']>
  },
  data() {
    return {
      timer: 0,
      minutes: 0,
      seconds: 0
    }
  }
}
</script>
