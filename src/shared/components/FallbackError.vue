<script lang="ts">
export default {
  name: 'NotFound',
  props: ['title']
}
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <h1><span class="ascii">(╯°□°）╯︵ ┻━┻</span></h1>
    <router-link :to="{ name: 'home' }">Go back</router-link>
  </div>
</template>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-family: MontserratBold;
  }
  a {
    color: black;
  }
}
</style>
