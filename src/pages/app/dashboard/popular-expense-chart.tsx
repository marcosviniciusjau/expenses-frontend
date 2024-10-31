import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { BarChart } from 'lucide-react'
import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { getPopularExpenses } from '@/api/get-popular-expenses'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularExpenseChart() {
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))
  const currentMonth = dayjs()
  const { data: popularProducts = [] } = useQuery({
    queryKey: ['metrics', 'popular-expenses', month],
    queryFn: () => getPopularExpenses(month),
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
    <Card className="col-span-2 ml-14">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos Populares no mes de {month}
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <button onClick={prevChart}>← Anterior</button>
          <button onClick={nextChart} disabled={isNextDisabled}>
            Próximo →
          </button>
        </div>
        <CardContent>
          {popularProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart style={{ fontSize: 12 }}>
                <Pie
                  data={popularProducts}
                  nameKey="product"
                  dataKey="amount"
                  cx="50%"
                  cy="50%"
                  outerRadius={86}
                  innerRadius={64}
                  strokeWidth={8}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180
                    const radius =
                      12 + innerRadius + (outerRadius - innerRadius)
                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                    const y = cy + radius * Math.sin(-midAngle * RADIAN)

                    return (
                      <text
                        x={x}
                        y={y}
                        className="fill-muted-foreground text-xs"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {popularProducts[index].title.length > 12
                          ? popularProducts[index].title
                              .substring(0, 12)
                              .concat('...')
                          : popularProducts[index].title}{' '}
                        ({value})
                      </text>
                    )
                  }}
                >
                  {popularProducts.map((_, index) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                        className="stroke-background hover:opacity-80"
                      />
                    )
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>Nenhum dado disponível para {month}</p>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
