import { paymentTypeMap } from '@/components/payment-type'
import { api } from '@/lib/axios'
export interface GetOrdersDetailsParams {
  expenseId: string
}
export interface GetOrderDetailsResponse {
  title: string
  expenseId: number
  date: Date
  paymentType: keyof typeof paymentTypeMap
  amount: number
  description: string
}
export async function getExpenseDetails({ expenseId }: GetOrdersDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/Expenses/${expenseId}`,
  )
  return response.data
}
