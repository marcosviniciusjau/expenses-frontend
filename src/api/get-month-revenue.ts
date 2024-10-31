import dayjs from 'dayjs'

import { api } from '@/lib/axios'
export interface GetMonthRevenueResponse {
  receipt: number
  diffFromLastMonth: number
}
export async function getMonthRevenue() {
  const month = dayjs(new Date()).format('YYYY/MM')

  const response = await api.get<GetMonthRevenueResponse>(
    `/Expenses/total-amount?month=${month}`,
  )
  return response.data
}
