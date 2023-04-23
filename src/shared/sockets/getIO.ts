import { io } from 'socket.io-client'

import { SOCKET_API_PORT } from '@/app/constants'

export const getIO = (onConnect?: () => void, onDisconnect?: () => void) => {
  const socket = io(`:${SOCKET_API_PORT}`)

  socket.on('connect', () => {
    onConnect && onConnect()
  })

  socket.on('disconnect', () => {
    onDisconnect && onDisconnect()
  })

  return socket
}
