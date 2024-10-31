import { api } from '@/lib/axios'

export interface GenerateExcelReportRequest {
  month: string
}
export async function generateExcelReport({
  month,
}: GenerateExcelReportRequest) {
  try {
    const response = await api.get('/Report/excel', {
      headers: {
        month,
      },
      responseType: 'blob',
    })
    if (response.data.size === 0) {
      throw new Error('O arquivo está vazio (0 bytes).')
    } else {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/octet-stream' }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `relatorio_${month}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Erro do servidor', error)
  }
}
