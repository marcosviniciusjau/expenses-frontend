import { useMutation, useQueryClient } from '@tanstack/react-query'
import exp from 'constants'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import { ArrowRight, Pencil, Search, Table, Trash, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { GetExpensesResponse } from '@/api/get-expenses'
import { ExpenseStatus } from '@/components/expense-status'
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

import { DeleteExpense } from './delete-expense'
import { EditExpense } from './edit-expense'
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
  const [willUpdate, setWillUpdate] = useState(false)
  const [willDelete, setWillDelete] = useState(false)
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {expense.id}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {dayjs(expense.date).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell>
        <PaymentType paymentType={expense.paymentType} />
      </TableCell>
      <TableCell className="font-medium">{expense.title}</TableCell>{' '}
      <TableCell className="font-medium">{expense.description}</TableCell>
      <TableCell className="font-medium">
        {expense.amount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
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
      <TableCell>
        <Dialog open={willUpdate} onOpenChange={setWillUpdate}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Pencil className="h-3 w-3" />
              <span className="sr-only">Detalhes do despesa</span>
            </Button>
          </DialogTrigger>
          <EditExpense open={willUpdate} expenseId={expense.id} />
        </Dialog>
      </TableCell>
      <TableCell>
        <Dialog open={willDelete} onOpenChange={setWillDelete}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Trash className="h-3 w-3" style={{ color: 'red' }} />
              <span className="sr-only">Detalhes do despesa</span>
            </Button>
          </DialogTrigger>
          <DeleteExpense open={willDelete} expenseId={expense.id} />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
