import { api } from '@/lib/axios'
export interface GetMonthRevenueResponse {
  receipt: number
}
export async function getMonthRevenue(month: string) {
  const response = await api.get<GetMonthRevenueResponse>(
    '/Expenses/total-amount',
    {
      headers: {
        month,
      },
    },
  )
  return response.data
}
