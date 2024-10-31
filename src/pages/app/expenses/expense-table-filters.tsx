import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { paymentTypeMap } from '@/components/payment-type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { NewExpense } from './new-expense'

const expenseFiltersSchema = z.object({
  expenseId: z.string().optional(),
  title: z.string().optional(),
  paymentType: z.number().int().min(0).max(3),
})

type ExpenseFiltersSchema = z.infer<typeof expenseFiltersSchema>

export function ExpenseTableFilters() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const expenseId = searchParams.get('expenseId')
  const title = searchParams.get('title')
  const paymentType = searchParams.get('paymentType')

  const { register, handleSubmit, control, reset } =
    useForm<ExpenseFiltersSchema>({
      resolver: zodResolver(expenseFiltersSchema),
      defaultValues: {
        expenseId: expenseId ?? '',
        title: title ?? '',
        paymentType: paymentType ? Number(paymentType) : 0,
      },
    })

  function handleFilter({
    title,
    expenseId,
    paymentType,
  }: ExpenseFiltersSchema) {
    setSearchParams((state) => {
      if (expenseId) {
        state.set('expenseId', expenseId)
      } else {
        state.delete('expenseId')
      }

      if (title) {
        state.set('title', title)
      } else {
        state.delete('title')
      }

      if (paymentType) {
        state.set('paymentType', paymentType.toString())
      } else {
        state.delete('paymentType')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('expenseId')
      state.delete('title')
      state.delete('paymentType')
      state.set('page', '1')

      return state
    })

    reset({
      expenseId: '',
      title: '',
      paymentType: paymentType ? Number(paymentType) : 0,
    })
  }

  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <DialogTrigger asChild>
        <Button variant="success" size="xs">
          <span>Nova despesa</span>
        </Button>
      </DialogTrigger>
      <NewExpense />
    </Dialog>
  )
}
