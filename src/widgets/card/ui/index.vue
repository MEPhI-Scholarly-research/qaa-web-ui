<script lang="ts">
export default {
  name: 'card',
  props: ['title', 'description']
}
</script>

<template>
  <div class="card">
    <h1 class="title">{{ title }}</h1>
    <div class="desc">
      {{ description }}
    </div>
    <div class="input">
      <input type="text" class="kit-input" placeholder="Input answer..." />
    </div>
    <div class="footer">
      <div class="skip"><button class="btn btn-transparent button-skip">skip</button></div>
      <div class="next"><button class="btn button-next">next</button></div>
    </div>
  </div>
</template>
