<template>
  <input class="kit-input" :value="value" @change="onChangeValue" :placeholder="placeholder" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

interface InputEvent extends Event {
  target: HTMLInputElement
}

export default defineComponent({
  name: 'KitInput',
  props: {
    value: Object as PropType<Props['value']>,
    onChange: Object as PropType<Props['onChange']>,
    placeholder: Object as PropType<Props['placeholder']>
  },
  methods: {
    onChangeValue(e: Event) {
      const value = (e as InputEvent).target.value
      this.onChange && this.onChange(value)
    }
  }
})
</script>

<style>
.kit-input {
  background-color: rgb(232, 240, 254);
  padding: 1.2rem;
  font-family: Montserrat;
  color: var(--text-main-color);
  border-radius: var(--border-radius-l);
  width: 100%;
  height: 55px;
}
</style>
