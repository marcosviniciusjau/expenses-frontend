import axios from 'axios'
import { parseCookies } from 'nookies'

import { env } from '@/env'
const cookies = parseCookies()
const header = cookies.fromClient

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Authorization: header ? `Bearer ${header}` : '',
  },
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}
