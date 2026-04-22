export interface Lot {
  id: string
  saleId: string
  saleOrder: number
  title: string
  description: string
  category: string
  lowEstimate: number
  highEstimate: number
  imageUrl: string
}

export type CreateLotPayload = Omit<Lot, 'id'>
export type LotDraft = Omit<Lot, 'id' | 'saleId'>
