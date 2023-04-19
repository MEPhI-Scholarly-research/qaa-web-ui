<script lang="ts">
import Card from '@/widgets/card/ui/index.vue'

export default {
  name: 'About',
  components: { Card },
  methods: {
    onSkip(value: string) {
      console.log('Skip', value)
    },
    onNext(value: string) {
      console.log('next', value)
    }
  }
}
</script>

<template>
  <section class="main">
    <Card title="hello" description="What do you known?" :on-next="onNext" :on-skip="onSkip"></Card>
  </section>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
