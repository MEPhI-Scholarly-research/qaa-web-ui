import CryptoJS from 'crypto-js'

export const decodeToken = (token: string | undefined): Record<string, unknown> => {
  if (token === undefined) {
    return {}
  }

  const temp = token.substring(token.indexOf('.') + 1)
  const bodybase64 = temp.substring(0, temp.indexOf('.'))
  return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(bodybase64)))
}
