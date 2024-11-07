import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { editExpense } from '@/api/edit-expense'
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

const expenseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number().positive(),
  date: z.string(),
  paymentType: z.number().int().min(0).max(3),
})
type ExpenseSchema = z.infer<typeof expenseSchema>
export function EditExpense({ expenseId, open }: ExpenseDetailsProps) {
  const { data: expense } = useQuery({
    queryKey: ['expense', expenseId],
    queryFn: () => getExpenseDetails({ expenseId }),
    enabled: open,
  })
  const date = dayjs(expense?.date).format('YYYY-MM-DD')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
  })

  useEffect(() => {
    if (expense) {
      setValue('title', expense.title)
      setValue('description', expense.description ?? '')
      setValue('amount', expense.amount)
      setValue('date', date)
      setValue('paymentType', expense.paymentType)
    }
  }, [expense, setValue])

  async function handleEditExpense({
    title,
    description,
    amount,
    date,
    paymentType,
  }: ExpenseSchema) {
    try {
      const id = expenseId
      await editExpense({ id, title, description, amount, date, paymentType })

      toast.success('Despesa editada com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao editar a despesa')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Despesa: {expenseId}</DialogTitle>
        <DialogDescription>Detalhes da despesa</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form onSubmit={handleSubmit(handleEditExpense)}>
          {expense && (
            <div className="space-y-6">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Tipo de pagamento
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <Select
                        onValueChange={(value) => {
                          const paymentTypeKey = Object.keys(
                            paymentTypeMap,
                          ).find((key) => paymentTypeMap[Number(key)] === value)
                          setValue('paymentType', Number(paymentTypeKey))
                        }}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={paymentTypeMap[expense.paymentType]}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(paymentTypeMap).map(
                            ([key, paymentType]) => (
                              <SelectItem key={key} value={paymentType}>
                                {paymentType}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Título
                    </TableCell>
                    <div className="relative w-full">
                      <Input
                        type="text"
                        placeholder="Título despesa"
                        {...register('title')}
                      />
                    </div>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Descrição
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <Input
                        type="text"
                        placeholder="Descrição despesa"
                        {...register('description')}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Data da despesa
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <Input
                        type="date"
                        placeholder="data"
                        {...register('date')}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total da despesa</TableCell>
                    <TableCell className="text-right font-medium">
                      <Input
                        type="number"
                        step="0.01"
                        {...register('amount', { valueAsNumber: true })}
                      />
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              className="w-32 justify-center"
              disabled={isSubmitting}
            >
              Editar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
