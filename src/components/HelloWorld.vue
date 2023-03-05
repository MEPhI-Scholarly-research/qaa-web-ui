<script lang="ts">
import { API_URL } from '@/constants'

type Response = {
  status: 'ok' | 'not_allowed'
}

let response: Response
try {
  response = await fetch(`${API_URL}/api/health`).then((res) => res.json())
} catch (e) {
  response = {
    status: 'not_allowed'
  }
}

const health = response.status

export default {
  data() {
    return {
      statusHealth: health
    }
  }
}
</script>

<template>
  <div class="greetings">API status: {{ statusHealth }}</div>
</template>
