import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export function OrdersAmount() {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount'],
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          despesas no mes
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground"></Utensils>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthOrdersAmount.diffFromLastMonth}
                  </span>{' '}
                </>
              )}
              em relação ao mes passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
