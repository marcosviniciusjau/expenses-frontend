import { setCookie } from 'nookies'

import { api } from '@/lib/axios'
export interface SignInBody {
  email: string
  password: string
}
export async function signIn({ email, password }: SignInBody) {
  const response = await api.post('/Login', { email, password })
  const token = response.data.token
  setCookie(null, 'fromClient', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
