import type { AccessTokenPayload } from '@/shared/common/types'

export const getToken = () => {
  return localStorage.getItem('accessToken')
}

export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token)
}

export const clearToken = () => {
  localStorage.removeItem('accessToken')
}

export const setUserInfo = (userInfo: AccessTokenPayload) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export const clearUserInfo = () => {
  localStorage.removeItem('userInfo')
}

export const getUserInfo = (): AccessTokenPayload | undefined => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo === null) {
    return undefined
  }
  return JSON.parse(userInfo) as AccessTokenPayload
}
