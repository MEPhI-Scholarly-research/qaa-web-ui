export const getToken = () => {
  return localStorage.getItem('accessToken')
}

export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token)
}
