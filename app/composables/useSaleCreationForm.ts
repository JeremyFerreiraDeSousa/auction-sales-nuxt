import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreateLotPayload, LotDraft } from '#shared/types/lot'
import type { SaleCreationSchema } from '~/schemas/saleCreation'

const createEmptyLot = (saleOrder = 1): LotDraft => ({
  saleOrder,
  title: '',
  description: '',
  category: '',
  lowEstimate: 0,
  highEstimate: 0,
  imageUrl: ''
})

export const useSaleCreationForm = () => {
  const { createSale } = useSalesApi()
  const { createLot } = useLotsApi()

  const formState = reactive<SaleCreationSchema>({
    title: '',
    description: '',
    status: 'upcoming',
    location: '',
    lots: [createEmptyLot(1)]
  })

  const submitError = ref<string | null>(null)
  const isSubmitting = ref(false)

  const addLot = () => {
    formState.lots.push(createEmptyLot(formState.lots.length + 1))
  }

  const removeLot = (index: number) => {
    formState.lots.splice(index, 1)

    formState.lots = formState.lots.map((lot, lotIndex) => ({
      ...lot,
      saleOrder: lotIndex + 1
    }))
  }

  const updateSale = <K extends keyof Omit<SaleCreationSchema, 'lots'>>(
    payload: { field: K, value: SaleCreationSchema[K] }
  ) => {
    formState[payload.field] = payload.value
  }

  const updateLot = <K extends keyof LotDraft>(
    index: number,
    payload: { field: K, value: LotDraft[K] }
  ) => {
    const lot = formState.lots[index]

    if (!lot) {
      return
    }

    lot[payload.field] = payload.value
  }

  const handleSubmit = async (event: FormSubmitEvent<SaleCreationSchema>) => {
    submitError.value = null
    isSubmitting.value = true

    try {
      const { lots, ...salePayload } = event.data

      const createdSale = await createSale(salePayload)

      const lotPayloads: CreateLotPayload[] = lots.map(lot => ({
        ...lot,
        saleId: createdSale.id
      }))

      await Promise.all(lotPayloads.map(payload => createLot(payload)))

      await navigateTo(`/sales/${createdSale.id}`)
    } catch {
      submitError.value = 'Une erreur est survenue lors de la création de la vente.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    formState,
    submitError,
    isSubmitting,
    addLot,
    removeLot,
    updateSale,
    updateLot,
    handleSubmit
  }
}
