export const SALE_STATUSES = ['upcoming', 'live'] as const

export type SaleStatus = typeof SALE_STATUSES[number]

export interface Sale {
  id: string
  title: string
  description: string
  status: SaleStatus
  location: string
}

export type CreateSalePayload = Omit<Sale, 'id'>
