import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { generatePDFReport } from '@/api/generate-pdf-report'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const generateReportSchema = z.object({
  month: z.string(),
})
type GenerateReportSchema = z.infer<typeof generateReportSchema>
export function ReportPDF() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<GenerateReportSchema>({
    resolver: zodResolver(generateReportSchema),
    defaultValues: {
      month: '2024-10',
    },
  })

  async function handleGeneratePDF({ month }: GenerateReportSchema) {
    try {
      await generatePDFReport({ month })
      toast.success('despesa criado com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar despesa')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Gerar relatório PDF</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <form onSubmit={handleSubmit(handleGeneratePDF)}>
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
