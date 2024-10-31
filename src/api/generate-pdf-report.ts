import { api } from '@/lib/axios'

export interface GeneratePDFReportRequest {
  month: string
}
export async function generatePDFReport({ month }: GeneratePDFReportRequest) {
  try {
    const response = await api.get('/Report/pdf', {
      headers: {
        month,
      },
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/pdf' }),
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `relatorio_${month}.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Erro do servidor', error)
  }
}
