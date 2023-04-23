import type { Socket } from 'socket.io-client'

import { event_quiz_get_next_card } from '@/shared/common/socket'
import { getToken } from '@/shared/utils/auth/storage'
import type { CardPayload } from '@/shared/common/types'

export const getNextCard = (io?: Socket | undefined) => {
  io?.emit(event_quiz_get_next_card, {
    sessionToken: localStorage.getItem('sessionToken'),
    accessToken: getToken()
  })

  return new Promise<CardPayload>((resolve) => {
    io?.on(event_quiz_get_next_card, (data: CardPayload) => {
      resolve(data)
    })
  })
}
