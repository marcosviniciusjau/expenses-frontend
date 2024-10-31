import { api } from '@/lib/axios'

interface GetProfileResponse {
  id: string
  companyName: string
  managerName: string
  email: string
}
export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/User')
  return response.data
}
