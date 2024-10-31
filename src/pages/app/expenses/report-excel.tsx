import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { generateExcelReport } from '@/api/generate-excel-report'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const generateReportSchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Formato inválido. Use YYYY-MM.'),
})
type GenerateReportSchema = z.infer<typeof generateReportSchema>
export function ReportExcel() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<GenerateReportSchema>({
    resolver: zodResolver(generateReportSchema),
    defaultValues: {
      month: new Date().toISOString().slice(0, 7), // Formato YYYY-MM
    },
  })

  async function handleGenerateExcel({ month }: GenerateReportSchema) {
    try {
      await generateExcelReport({ month })
      toast.success('Relatório gerado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao gerar relatório')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Gerar relatório Excel</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <form onSubmit={handleSubmit(handleGenerateExcel)}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Mes escolhido
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="relative w-full">
                    <Input
                      type="month"
                      placeholder="Mes escolhido"
                      {...register('month')}
                      required
                    />
                  </div>
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
