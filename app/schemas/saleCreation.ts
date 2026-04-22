import { saleSchema } from '~/schemas/sale'
import { lotsSchema } from '~/schemas/lot'
import type { z } from 'zod'

export const saleCreationSchema = saleSchema.extend({
  lots: lotsSchema
})

export type SaleCreationSchema = z.output<typeof saleCreationSchema>
