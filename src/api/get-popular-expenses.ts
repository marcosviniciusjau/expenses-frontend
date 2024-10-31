import dayjs from 'dayjs'

import { api } from '@/lib/axios'

export type GetPopularExpensesResponse = {
  title: string
  amount: number
}[]
export async function getPopularExpenses(month: string) {
  const response = await api.get<GetPopularExpensesResponse>(
    '/Expenses/titles_by_month',
    {
      headers: {
        month,
      },
    },
  )
  return response.data
}
