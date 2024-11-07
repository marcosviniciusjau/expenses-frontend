import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { deleteExpense } from '@/api/delete-expense'
import { getExpenseDetails } from '@/api/get-expense-details'
import { PaymentType, paymentTypeMap } from '@/components/payment-type'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

export function DeleteExpense({ expenseId }: ExpenseDetailsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  async function handleDeleteExpense() {
    try {
      const id = expenseId

      setIsSubmitting(true)
      await deleteExpense(id)
      toast.success('Despesa excluída com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar despesa')
    }
  }

  if (!open) return null
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Despesa: {expenseId}</DialogTitle>
      </DialogHeader>
      <Button
        disabled={isSubmitting}
        variant="default"
        size="sm"
        onClick={handleDeleteExpense}
      >
        Excluir
      </Button>

      <Button variant="ghost" size="sm">
        Cancelar
      </Button>
    </DialogContent>
  )
}
