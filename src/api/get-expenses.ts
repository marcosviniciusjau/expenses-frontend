import { api } from '@/lib/axios'

export interface GetExpensesQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}
export interface GetExpensesResponse {
  expenses: {
    title: string
    id: number
    date: Date
    paymentType: number
    amount: number
    description: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getExpenses() {
  const response = await api.get<GetExpensesResponse>('/Expenses')
  return response.data
}
