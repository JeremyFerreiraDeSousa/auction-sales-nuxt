import { z } from 'zod'

export const lotSchema = z.object({
  saleOrder: z.number().int().min(1, 'L’ordre du lot doit être supérieur ou égal à 1.'),
  title: z.string().trim().min(1, 'Le titre est requis.'),
  description: z.string().trim().min(1, 'La description est requise.'),
  category: z.string().trim().min(1, 'La catégorie est requise.'),
  lowEstimate: z.number().min(1, 'L’estimation basse doit être positive.'),
  highEstimate: z.number().min(1, 'L’estimation haute doit être positive.'),
  imageUrl: z.url('L’URL de l’image doit être valide.')
}).refine(
  lot => lot.highEstimate >= lot.lowEstimate,
  {
    message: 'L’estimation haute doit être supérieure ou égale à l’estimation basse.',
    path: ['highEstimate']
  }
)

export const lotsSchema = z.array(lotSchema).min(1, 'Au moins un lot est requis.')
