<template>
  <button @click="onClick" class="btn">{{ title }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

type Props = {
  title: string
  onClick: () => void
  mode?: 'transparent' | 'normal'
}

export default defineComponent({
  name: 'KitButton',
  props: {
    title: Object as PropType<Props['title']>,
    onClick: Object as PropType<Props['onClick']>,
    mode: Object as PropType<Props['mode']>
  }
})
</script>

<style>
.btn {
  background-color: var(--main-color);
  color: var(--text-main-color-reverse);
  font-family: MontserratBold;
  padding: 13px 30px;
  border-radius: var(--border-radius-m);
  transition: background-color 0.15s ease-in-out;
}

.btn:hover {
  background-color: var(--main-color-hover);
}

.btn:active {
  background-color: var(--main-color-active);
}

.btn-transparent {
  background-color: transparent;
  color: var(--text-main-color);
}

.btn-transparent:hover {
  background-color: transparent;
  color: var(--text-main-color-hover);
}
</style>
