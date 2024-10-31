import { api } from '@/lib/axios'

export interface RegisterCompanyBody {
  companyName: string
  managerName: string
  email: string
  password: string
}
export async function registerCompany({
  companyName,
  managerName,
  email,
  password,
}: RegisterCompanyBody) {
  await api.post('/User', { companyName, managerName, email, password })
}
