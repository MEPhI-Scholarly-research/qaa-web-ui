import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

import { SOCKET_API_PORT } from '@/app/constants'

export const getIO = () =>
  new Promise<{ socket: Socket; connected: boolean }>((resolve, reject) => {
    const socket = io(`:${SOCKET_API_PORT}`)

    socket.on('connect', () => {
      console.log({ id: socket.id })
      resolve({ socket, connected: socket.connected })
    })

    socket.on('error', () => {
      reject(new Error('Socket error'))
    })

    socket.on('disconnect', () => {
      resolve({ socket, connected: socket.connected })
    })
  })
