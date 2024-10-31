import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import { ArrowRight, Search, Table, Trash, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { GetExpensesResponse } from '@/api/get-expenses'
import { OrderStatus } from '@/components/order-status'
import { PaymentType } from '@/components/payment-type'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'

import { ExpenseDetails } from './expense-details'
export interface ExpenseTableRowProps {
  expense: {
    title: string
    id: number
    date: Date
    paymentType: number
    amount: number
    description: string
  }
}
export function ExpenseTableRow({ expense }: ExpenseTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [willDelete, setWillDelete] = useState(false)

  async function deleteExpense(id: number) {
    try {
      const response = await api.delete(`/Expenses/${id}`)
      console.log(response.data)
      setIsLoading(true)
      toast.success('Despesa excluída com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao excluir despesa')
    }
  }
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do despesa</span>
            </Button>
          </DialogTrigger>
          <ExpenseDetails open={isDetailsOpen} expenseId={expense.id} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {expense.id}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {dayjs(expense.date).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell>
        <PaymentType paymentType={expense.paymentType} />
      </TableCell>
      <TableCell className="font-medium">{expense.title}</TableCell>
      <TableCell className="font-medium">
        {expense.amount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    </TableRow>
  )
}
