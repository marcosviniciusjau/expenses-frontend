import { api } from '@/lib/axios'

export interface GetOrdersDetailsParams {
  expenseId: string
}
export interface GetOrderDetailsResponse {
  title: string
  expenseId: number
  createdAt: Date
  paymentType: 'cash' | 'credit_card' | 'debit_card' | 'eletronic'
  amount: number
  description: string
}
export async function getExpenseDetails({ expenseId }: GetOrdersDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/Expenses/${expenseId}`,
  )
  return response.data
}
