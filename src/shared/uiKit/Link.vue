<script lang="ts">
import type { PropType } from 'vue'

type Props = {
  to: string
  title: string
}

export default {
  name: 'KitLink',
  props: {
    to: Object as PropType<Props['to']>,
    title: Object as PropType<Props['title']>
  }
}
</script>

<template>
  <router-link :to="{ name: to }"
    ><span class="link">{{ title }}</span></router-link
  >
</template>

<style scoped>
.link {
  font-family: MontserratLight;
  color: rgb(47, 66, 163);
}

.link:hover {
  font-family: MontserratLight;
  color: rgb(20, 42, 156);
}
</style>
