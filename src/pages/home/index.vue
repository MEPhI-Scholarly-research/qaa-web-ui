<script lang="ts">
import { getIO } from '@/shared/sockets'

type Response = {
  id: string
  active: boolean
}
export default {
  name: 'Home',
  async mounted() {
    const handleConnect = () => {
      this.connected = true
    }

    const handleDisconnect = () => {
      this.connected = false
    }

    const socket = getIO(handleConnect, handleDisconnect)

    socket.emit('quiz.content', { id: '1234' })

    socket.on('quiz.content', (data: Response) => {
      console.log({ data })
    })
  },
  methods: {
    increment() {
      this.counter++
    }
  },
  data() {
    return {
      counter: 0,
      connected: false
    }
  }
}
</script>

<template>
  {{ counter }}
  <button @click="increment">inc</button>
  <span>connected: {{ connected }}</span>
</template>
