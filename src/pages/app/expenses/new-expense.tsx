import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { createExpense } from '@/api/create-expense'
import { paymentTypeMap } from '@/components/payment-type'
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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const expenseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number().positive(),
  paymentType: z.number().int().min(0).max(3),
})
type ExpenseSchema = z.infer<typeof expenseSchema>
export function NewExpense() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: 1,
      paymentType: 0,
    },
  })

  async function handleCreateExpense({
    title,
    description,
    amount,
    paymentType,
  }: ExpenseSchema) {
    try {
      await createExpense({ title, description, amount, paymentType })

      toast.success('Despesa criada com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar despesa')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>despesa:</DialogTitle>
        <DialogDescription>Detalhes do despesa</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form onSubmit={handleSubmit(handleCreateExpense)}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Título despesa
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Título despesa"
                      {...register('title')}
                      required
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Descrição da despesa
                </TableCell>
                <TableCell className="flex justify-end">
                  <Input
                    type="text"
                    placeholder="Descrição da despesa"
                    {...register('description')}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Total da despesa
                </TableCell>
                <TableCell className="flex justify-end">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Total da despesa"
                    {...register('amount', { valueAsNumber: true })}
                    required
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Tipo de pagamento
                </TableCell>
                <TableCell className="flex justify-end">
                  <Select
                    onValueChange={(value) => {
                      const paymentTypeKey = Object.keys(paymentTypeMap).find(
                        (key) => paymentTypeMap[Number(key)] === value,
                      )
                      setValue('paymentType', Number(paymentTypeKey))
                    }}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um item" />
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
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              className="w-32 justify-center"
              disabled={isSubmitting}
            >
              Finalizar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
