<template>
  <div class="timer">
    <h2 class="title">Осталось времени:</h2>
    <div class="time">
      <div class="minutes">{{ Math.floor(timer / 60) }} мин</div>
      <div class="seconds">{{ timer % 60 }} сек</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

type Props = {
  time_limit: number // in milliseconds
}

export default {
  name: 'Timer',
  props: {
    time_limit: Object as PropType<Props['time_limit']>
  },
  data() {
    return {
      timer: 0
    }
  },
  watch: {
    time_limit: function (prev, next) {
      this.timer = Math.floor(next / 1000)
    }
  }
}
</script>

<style scoped>
.timer {
  position: absolute;
  left: 32px;
  top: 70px;
  width: 225px;
  height: 100px;
  padding: 16px 12px;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 11px;
  color: var(--text-main-color);
}
.title {
  font-family: MontserratBold;
  font-size: 14px;
}

.time {
  display: flex;
  gap: 12px;
  font-family: MontserratBlack;
  margin-top: 4px;
  color: var(--text-main-color);
}
</style>
