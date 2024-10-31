import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export function MonthRevenue() {
  const [monthRevenue, setMonthRevenue] = useState(0)
  async function monthRevenueFunction() {
    const response = await getMonthRevenue()
    setMonthRevenue(response)
  }
  useEffect(() => {
    monthRevenueFunction()
  }, [])
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total no mes
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground"></DollarSign>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthRevenue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </>
        )}
      </CardContent>
    </Card>
  )
}
