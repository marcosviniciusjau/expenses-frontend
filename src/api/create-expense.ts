import { date } from 'zod'

import { paymentTypeMap } from '@/components/payment-type'
import { api } from '@/lib/axios'

export interface ExpensesRequest {
  title: string
  description: string | undefined
  amount: number
  date: Date
  paymentType: keyof typeof paymentTypeMap
}
export async function createExpense({
  title,
  description,
  amount,
  paymentType,
}: ExpensesRequest) {
  try {
    const response = await api.post('/Expenses', {
      title,
      description,
      amount,
      date: new Date(),
      paymentType,
    })
    return response.data
  } catch (error) {
    console.error('Erro do servidor', error)
  }
}
