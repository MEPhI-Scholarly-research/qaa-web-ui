<script lang="ts">
import type { PropType } from 'vue'

type Props = {
  onFinish: () => void
}

export default {
  name: 'EndingTest',
  props: {
    onFinish: Object as PropType<Props['onFinish']>
  }
}
</script>

<template>
  <div class="endingTestBlock">
    <h2 class="title">Вы уверены, что хотите закончить тест?</h2>
    <div class="footer">
      <div class="start"><button class="btn button-next" @click="onFinish">Закончить</button></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.endingTestBlock {
  max-width: 500px;
  padding: 24px 32px;
  border: 1px solid #e9e9e9;
  border-radius: 11px;
  .title {
    font-family: MontserratBold;
    font-size: 24px;
  }
  .footer {
    margin-top: 24px;
    display: flex;
    justify-content: end;
  }
}
</style>
