import { Socket, io } from 'socket.io-client'

import { SOCKET_API_PORT } from '@/app/constants'

export const getIO = (
  sesstionToken: string,
  onConnect?: (socket: Socket) => void,
  onDisconnect?: () => void
) => {
  const socket = io(`:${SOCKET_API_PORT}`)
  console.log({ socket })

  socket.on('connect', () => {
    onConnect && onConnect(socket)
  })

  socket.emit('message', JSON.stringify({ type: 'connection', token: sesstionToken }))

  socket.on('message', (data) => {
    console.log({ data })
  })

  socket.on('disconnect', () => {
    onDisconnect && onDisconnect()
  })

  const sendIOMessage = <T>(type: string, data: Record<string, T>) => {
    socket.emit('message', JSON.stringify({ type, ...data }))
  }

  return { socket, sendIOMessage }
}
