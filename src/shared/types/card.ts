export type CardType = 'input' | 'select'

type CardBase = {
  title: string
  description: string
}

export type Card = CardBase

export type CardPayload = {
  payload: Card
  meta?: Record<string, string>
}
