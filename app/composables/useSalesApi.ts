import type { CreateSalePayload, Sale } from '#shared/types/sale'
import { useApi } from '~/composables/useApi'

export const useSalesApi = () => {
  const { api } = useApi()

  const getSales = () => {
    return api<Sale[]>('/sales')
  }

  const getSaleById = (id: string) => {
    return api<Sale>(`/sales/${id}`)
  }

  const createSale = (payload: CreateSalePayload) => {
    return api<Sale>('/sales', {
      method: 'POST',
      body: payload
    })
  }

  const updateSale = (id: string, payload: CreateSalePayload) => {
    return api<Sale>(`/sales/${id}`, {
      method: 'PUT',
      body: payload
    })
  }

  const deleteSale = (id: string) => {
    return api(`/sales/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
  }
}
