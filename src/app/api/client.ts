import axios from 'axios'
import { API_URL } from '@/app/constants'
import { getToken } from '@/shared/utils/auth/storage'
// import router from '../routes'

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use((request) => {
  const currentAccessToken = getToken()

  if (currentAccessToken) {
    request.headers.token = currentAccessToken
  }

  return request
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      // router.push({ name: 'auth' })
      // const refreshToken = localStorage.getItem('refreshToken');
      // if (refreshToken) {
      //   return axios
      //     .post(
      //       '/auth/refresh',
      //       { refreshToken },
      //       {
      //         baseURL: config.apiUrl,
      //         headers: { Authorization: `Bearer ${getAccessToken()}` },
      //       },
      //     )
      //     .then((response) => {
      //       setAccessToken(response.data.access_token);
      //       return apiClient(originalRequest);
      //     })
      //     .catch((e) => {
      //       store.dispatch(
      //         enqueueSnackbar({
      //           message: e.response.data,
      //           options: {
      //             variant: 'error',
      //           },
      //         }),
      //       );
      //       store.dispatch(logout());
      //     });
      // }
    }
    return Promise.reject(error)
  }
)

export default apiClient
