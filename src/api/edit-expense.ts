import { paymentTypeMap } from '@/components/payment-type'
import { api } from '@/lib/axios'

export interface ExpensesRequest {
  id: number
  title: string
  description: string | undefined
  amount: number
  date: Date
  paymentType: keyof typeof paymentTypeMap
}
export async function editExpense({
  id,
  title,
  description,
  amount,
  date,
  paymentType,
}: ExpensesRequest) {
  try {
    const response = await api.put(`/Expenses/${id}`, {
      title,
      description,
      amount,
      date,
      paymentType,
    })
    return response.data
  } catch (error) {
    console.error('Erro do servidor', error)
  }
}
