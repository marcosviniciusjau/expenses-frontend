import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getExpenses } from '@/api/get-expenses'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ExpenseTableFilters } from './expense-table-filters'
import { ExpenseTableRow } from './expense-table-row'

export function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('expenseId')
  const title = searchParams.get('title')
  const paymentType = searchParams.get('paymentType')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['expenses', pageIndex, orderId, title, paymentType],
    queryFn: () => getExpenses(),
  })
  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())
      return state
    })
  }
  return (
    <>
      <Helmet title="expenses" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Despesas</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <ExpenseTableFilters />
                <TableRow>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado em</TableHead>
                  <TableHead className="w-[140px]">Tipo de pagamento</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-[100px]">Total</TableHead>
                  <TableHead className="w-[32px]"></TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result &&
                  result.expenses.map((expense) => (
                    <ExpenseTableRow key={expense.id} expense={expense} />
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
