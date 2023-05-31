<script lang="ts">
import { type PropType } from 'vue'

type Option = {
  title: string
  serial: number
  uuid: string
}

type Props = {
  title: string
  description: string
  options: Option[]
  defaultValue: string
  onSelect: (uuid: string) => void
  onSkip: (uuid: string) => void
  onNext: (uuid: string) => void
}

export default {
  name: 'card',
  props: {
    title: Object as PropType<Props['title']>,
    description: Object as PropType<Props['description']>,
    options: Object as PropType<Props['options']>,
    defaultValue: Object as PropType<Props['defaultValue']>,
    onSelect: Object as PropType<Props['onSelect']>,
    onSkip: Object as PropType<Props['onSkip']>,
    onNext: Object as PropType<Props['onNext']>
  },
  data() {
    return {
      value: this.defaultValue || ''
    }
  },
  methods: {
    onChange(uuid: string) {
      this.value = uuid
      this.onSelect && this.onSelect(uuid)
    },
    onLocalSkip() {
      this.onSkip && this.onSkip(this.value)
    },
    onLocalNext() {
      this.onNext && this.onNext(this.value)
    }
  },
  watch: {
    defaultValue: function (prev, curr) {
      this.value = prev
    }
  }
}
</script>

<template>
  <div class="card">
    <h1 class="title">{{ title }}</h1>
    <div class="desc">
      {{ description }}
    </div>
    <div class="cardInput">
      <ul>
        <li v-for="option in options" :key="option.uuid" class="option">
          <label :class="`optionLabel ${option.uuid === value ? 'active' : 'noActive'}`"
            ><input
              type="radio"
              name="ans"
              @change="() => onChange(option.uuid)"
              :checked="option.uuid === value"
            />{{ option.title }}</label
          >
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="skip">
        <button class="btn btn-transparent button-skip" @click="onLocalSkip">пропустить</button>
      </div>
      <div class="next"><button class="btn button-next" @click="onLocalNext">далее</button></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: var(--border-radius-l);
  box-shadow: 0 0 30px 10px #33333323;
  padding: 24px 32px;
  max-width: 800px;
  min-width: 500px;
}

.card .footer {
  display: flex;
  width: 100%;
  justify-content: end;
}

.card .title {
  font-family: MontserratBold;
  font-size: 24px;
  color: var(--text-main-color);
  margin-bottom: 16px;
}

.card .desc {
  font-family: Montserrat;
  letter-spacing: 0.5px;
}

.cardInput {
  margin: 24px 0;
}

.option {
  margin-bottom: 4px;
  &Label {
    font-family: Montserrat;
    display: flex;
    align-items: center;
    background-color: var(--main-color);
    color: var(--text-main-color-reverse);
    border-radius: 10px;
    padding: 8px;
    gap: 4px;
    transition: all 0.15s ease-in-out;
    &:hover {
      background-color: var(--main-color-hover);
    }
  }
}

.active {
  background-color: var(--accent-color);
  &:hover {
    background-color: var(--accent-color-hover);
  }
}
</style>
