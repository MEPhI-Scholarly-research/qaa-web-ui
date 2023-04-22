<script lang="ts">
import type { PropType } from 'vue'

type Props = {
  loading: boolean
}
export default {
  name: 'Loader',
  props: {
    loading: Object as PropType<Props['loading']>
  }
}
</script>

<template>
  <div class="spinner" v-if="loading">
    <div class="spinner__bounce spinner__bounce--1"></div>
    <div class="spinner__bounce spinner__bounce--2"></div>
    <div class="spinner__bounce spinner__bounce--3"></div>
  </div>
</template>

<style scoped>
.spinner {
  width: 70px;
  text-align: center;
}

.spinner__bounce {
  width: 18px;
  height: 18px;
  background-color: var(--main-color);
  border-radius: 100%;
  display: inline-block;
  animation: bouncedelay 1.4s infinite ease-in-out both;
  animation-delay: 0s;
}

.spinner__bounce--1 {
  animation-delay: -0.32s;
}

.spinner__bounce--2 {
  animation-delay: -0.16s;
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
