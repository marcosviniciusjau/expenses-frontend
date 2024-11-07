import { api } from '@/lib/axios'
export async function deleteExpense(id: number) {
  try {
    await api.delete(`/Expenses/${id}`)
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}
