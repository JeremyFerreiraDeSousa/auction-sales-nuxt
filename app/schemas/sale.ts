import { z } from 'zod'
import { SALE_STATUSES } from '#shared/types/sale'

export const saleSchema = z.object({
  title: z.string().trim().min(1, 'Le titre est requis.'),
  description: z.string().trim().min(10, 'La description doit contenir au moins 10 caractères.'),
  status: z.enum(SALE_STATUSES, {
    message: 'Le statut est requis.'
  }),
  location: z.string().trim().min(1, 'Le lieu est requis.')
})

export type SaleFormSchema = z.output<typeof saleSchema>

export const saleStatusOptions = [
  { label: 'À venir', value: 'upcoming' },
  { label: 'En cours', value: 'live' }
]
