<script setup lang="ts">
const { getSales } = useSalesApi()
const { getLots } = useLotsApi()

const query = ref('')

const { data, status, error } = await useAsyncData('search-data', async () => {
  const [sales, lots] = await Promise.all([
    getSales(),
    getLots()
  ])

  return { sales, lots }
})

const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const sales = computed(() => data.value?.sales ?? [])
const lots = computed(() => data.value?.lots ?? [])

const saleResults = computed(() => {
  if (!normalizedQuery.value) {
    return []
  }

  return sales.value.filter(sale =>
    [sale.title, sale.description, sale.location]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery.value)
  )
})

const lotResults = computed(() => {
  if (!normalizedQuery.value) {
    return []
  }

  return lots.value.filter(lot =>
    [lot.title, lot.description, lot.category]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery.value)
  )
})

const getSaleTitle = (saleId: string) => {
  return sales.value.find(sale => sale.id === saleId)?.title ?? 'Vente'
}

useSeoMeta({
  title: 'Recherche · Auction Project',
  description: 'Recherchez des ventes et des lots.'
})
</script>

<template>
  <div>
    <SimpleHero
      title="Recherche unifiée"
      description="Retrouvez rapidement une vente ou un lot."
    />

    <section class="bottom-spacing">
      <div class="mx-auto max-w-4xl space-y-8">
        <UInput
          v-model="query"
          size="xl"
          icon="i-lucide-search"
          class="w-full"
          placeholder="Rechercher une vente, un lot, une catégorie..."
        />

        <div
          v-if="status === 'pending'"
          class="grid gap-4"
        >
          <USkeleton
            v-for="index in 4"
            :key="index"
            class="h-64 rounded-2xl bg-gray-200"
          />
        </div>

        <UAlert
          v-else-if="error"
          color="error"
          variant="soft"
          title="Impossible de charger les ventes ou les lots"
          description="Veuillez actualiser la page ou réessayer plus tard."
        />

        <div
          v-else-if="query && !saleResults.length && !lotResults.length"
          class="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500"
        >
          Aucun résultat trouvé.
        </div>

        <div
          v-else
          class="space-y-6"
        >
          <UCard
            v-for="sale in saleResults"
            :key="`sale-${sale.id}`"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-lucide-landmark"
                class="mt-1 size-5 text-green-600"
              />

              <div class="space-y-1">
                <UBadge
                  color="success"
                  variant="soft"
                >
                  Vente
                </UBadge>

                <NuxtLink
                  :to="`/sales/${sale.id}`"
                  class="block font-semibold hover:text-primary"
                >
                  {{ sale.title }}
                </NuxtLink>

                <p class="text-sm text-neutral-500">
                  {{ sale.location }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard
            v-for="lot in lotResults"
            :key="`lot-${lot.id}`"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-lucide-gavel"
                class="mt-1 size-5 text-blue-600"
              />

              <div class="space-y-1">
                <UBadge
                  color="info"
                  variant="soft"
                >
                  Lot
                </UBadge>

                <p class="font-semibold">
                  {{ lot.title }}
                </p>

                <p class="text-sm text-neutral-500">
                  {{ lot.category }}
                </p>

                <NuxtLink
                  :to="`/sales/${lot.saleId}`"
                  class="text-sm hover:text-primary"
                >
                  Voir la vente : {{ getSaleTitle(lot.saleId) }}
                </NuxtLink>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>
