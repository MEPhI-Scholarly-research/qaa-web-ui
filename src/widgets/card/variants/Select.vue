<script lang="ts">
import KitInput from '@/shared/uiKit/Input.vue'

export default {
  name: 'CardInputContent',
  props: ['value', 'onChange'],
  components: { KitInput }
}
</script>

<template>
  <KitInput :value="value" :on-change="onChange" placeholder="Ваш ответ:"></KitInput>
</template>
