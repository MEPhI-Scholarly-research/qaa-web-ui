import { getToken } from './storage'

export const isAuth = (): boolean => {
  return Boolean(getToken()?.length && getToken() !== 'undefined')
}
