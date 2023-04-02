<script lang="ts">
import { getIO } from '@/shared/sockets'

type Response = {
  id: string
  active: boolean
}

const { socket, connected } = await getIO()

socket.emit('quiz.content', { id: undefined })

socket.on('quiz.content', (data: Response) => {
  console.log({ data })
})

export default {
  data() {
    return {
      connected: connected
    }
  }
}
</script>

<template>
  <h1>Connected: {{ connected }}</h1>
</template>
