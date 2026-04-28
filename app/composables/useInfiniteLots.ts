import type { Lot } from '#shared/types/lot'

export const useInfiniteLots = () => {
  const { getPaginatedLots } = useLotsApi()

  const lots = ref<Lot[]>([])
  const page = ref(1)
  const limit = 4

  const isLoading = ref(false)
  const initFirstLoad = ref(true)
  const hasMore = ref(true)
  const error = ref<string | null>(null)

  const loadMoreLots = async () => {
    if (isLoading.value || !hasMore.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const newLots = await getPaginatedLots(page.value, limit)

      lots.value.push(...newLots)

      page.value += 1
      hasMore.value = newLots.length === limit
    } catch {
      error.value = 'Impossible de charger les lots.'
    } finally {
      isLoading.value = false
      initFirstLoad.value = false
    }
  }

  return {
    lots,
    isLoading,
    initFirstLoad,
    hasMore,
    error,
    limit,
    loadMoreLots
  }
}
