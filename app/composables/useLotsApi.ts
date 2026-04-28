import type { CreateLotPayload, Lot } from '#shared/types/lot'
import { useApi } from '~/composables/useApi'

export const useLotsApi = () => {
  const { api } = useApi()

  const getLots = () => {
    return api<Lot[]>('/lots')
  }

  const getPaginatedLots = (page: number, limit: number) => {
    return api<Lot[]>('/lots', {
      query: {
        _page: page,
        _limit: limit
      }
    })
  }

  const getLotById = (id: string) => {
    return api<Lot>(`/lots/${id}`)
  }

  const getLotsBySaleId = (saleId: string) => {
    return api<Lot[]>('/lots', {
      query: { saleId }
    })
  }

  const createLot = (payload: CreateLotPayload) => {
    return api<Lot>('/lots', {
      method: 'POST',
      body: payload
    })
  }

  return {
    getLots,
    getPaginatedLots,
    getLotById,
    getLotsBySaleId,
    createLot
  }
}
