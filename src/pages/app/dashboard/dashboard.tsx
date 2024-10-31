import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'

import { ReportExcel } from '../expenses/report-excel'
import { ReportPDF } from '../expenses/report-pdf'
import { MonthRevenue } from './month-revenue'
import { PopularExpenseChart } from './popular-expense-chart'

export function Dashboard() {
  const [isDetailsOpenExcel, setIsDetailsOpenExcel] = useState(false)
  const [isDetailsOpenPDF, setIsDetailsOpenPDF] = useState(false)
  return (
    <>
      <Helmet title="Dashboard" />

      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
      <div className="flex items-center gap-2">
        <Dialog open={isDetailsOpenExcel} onOpenChange={setIsDetailsOpenExcel}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="xs">
              <span>PDF</span>
            </Button>
          </DialogTrigger>
          <ReportPDF />
        </Dialog>{' '}
        <Dialog open={isDetailsOpenPDF} onOpenChange={setIsDetailsOpenPDF}>
          <DialogTrigger asChild>
            <Button variant="success" size="xs">
              <span>Excel</span>
            </Button>
          </DialogTrigger>
          <ReportExcel />
        </Dialog>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenue />
          <PopularExpenseChart />
        </div>
      </div>
    </>
  )
}
