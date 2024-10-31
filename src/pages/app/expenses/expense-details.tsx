import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getExpenseDetails } from '@/api/get-expense-details'
import { OrderStatus } from '@/components/order-status'
import { PaymentType } from '@/components/payment-type'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui/table'

export interface ExpenseDetailsProps {
  expenseId: number
  open: boolean
}

export function ExpenseDetails({ expenseId, open }: ExpenseDetailsProps) {
  const { data: expense } = useQuery({
    queryKey: ['expense', expenseId],
    queryFn: () => getExpenseDetails({ expenseId }),
    enabled: open,
  })
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Despesa: {expenseId}</DialogTitle>
        <DialogDescription>Detalhes da despesa</DialogDescription>
      </DialogHeader>
      {expense && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Tipo de pagamento
                </TableCell>
                <TableCell className="flex justify-end">
                  <PaymentType paymentType={expense.paymentType} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Título</TableCell>
                <TableCell className="flex justify-end">
                  {expense.title}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Descrição
                </TableCell>
                <TableCell className="flex justify-end">
                  {expense.description ?? 'Não informado'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(expense.date, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total da despesa</TableCell>
                <TableCell className="text-right font-medium">
                  {expense.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
