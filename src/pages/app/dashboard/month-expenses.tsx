import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { DollarSign } from 'lucide-react'
import { useState } from 'react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export function MonthExpenses() {
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))
  const currentMonth = dayjs()
  const { data: monthRevenue = [] } = useQuery({
    queryKey: ['metrics', 'month-revenue', month],
    queryFn: () => getMonthRevenue(month),
  })

  const prevChart = () => {
    setMonth((prevMonth) =>
      dayjs(prevMonth).subtract(1, 'month').format('YYYY-MM'),
    )
  }

  const nextChart = () => {
    setMonth((prevMonth) => {
      const nextMonth = dayjs(prevMonth).add(1, 'month')
      const currentMonth = dayjs()

      if (nextMonth.isAfter(currentMonth, 'month')) {
        return prevMonth
      }

      return nextMonth.format('YYYY-MM')
    })
  }
  const isNextDisabled = dayjs(month)
    .add(1, 'month')
    .isAfter(currentMonth, 'month')

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total de despesas no mês {month}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground"></DollarSign>
      </CardHeader>

      <button className="ml-4 mr-4 text-base font-semibold" onClick={prevChart}>
        ← Anterior
      </button>

      <button
        className="text-base font-semibold"
        onClick={nextChart}
        disabled={isNextDisabled}
      >
        Próximo →
      </button>
      <CardContent className="space-y-1">
        {monthRevenue !== 0 ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthRevenue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold tracking-tight">0</span>
        )}
      </CardContent>
    </Card>
  )
}
