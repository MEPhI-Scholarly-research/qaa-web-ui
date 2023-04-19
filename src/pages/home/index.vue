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
  <section class="main">
    <h1 class="title">Hello there, two square (red and green) will be here:)</h1>
  </section>
</template>

<style>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: MontserratBold;
  font-size: 24px;
}
</style>
