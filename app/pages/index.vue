<script setup lang="ts">
const { getSales } = useSalesApi()
const { getLots } = useLotsApi()

const {
  data,
  status,
  error
} = await useAsyncData('home-data', async () => {
  const [sales, lots] = await Promise.all([
    getSales(),
    getLots()
  ])

  return { sales, lots }
})

const sales = computed(() => data.value?.sales ?? [])
const lots = computed(() => data.value?.lots ?? [])

const liveSales = computed(() => {
  return [...(sales.value ?? [])]
    .sort((a, b) => {
      if (a.status === b.status) {
        return Number(b.id) - Number(a.id)
      }

      return a.status === 'live' ? -1 : 1
    })
    .slice(0, 3)
})

const featuredLots = computed(() => {
  return [...lots.value]
    .sort((a, b) => b.highEstimate - a.highEstimate)
    .slice(0, 3)
})

useSeoMeta({
  title: 'Ventes aux enchères',
  description: 'Explorez les ventes en cours et à venir, puis parcourez les lots associés.'
})
</script>

<template>
  <div>
    <GreenHero />
    <section class="bottom-spacing content-stack">
      <header class="text-stack text-center">
        <h2 class="second-title">
          Découvrez les ventes aux enchères en direct
        </h2>

        <p class="max-w-2xl mx-auto text-base leading-6">
          Explorez les ventes en cours, puis parcourez les lots associés.
        </p>
      </header>

      <div
        v-if="status === 'pending'"
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <USkeleton
          v-for="index in 6"
          :key="index"
          class="h-64 rounded-2xl bg-gray-200"
        />
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        title="Impossible de charger les ventes et les lots"
        description="Veuillez actualiser la page ou réessayer plus tard."
      />

      <div
        v-else-if="liveSales.length"
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <SaleCard
          v-for="sale in liveSales"
          :key="sale.id"
          :sale="sale"
        />
      </div>

      <UCard v-else>
        <p class="text-sm">
          Pas de ventes pour le moment.
        </p>
      </UCard>
    </section>
    <section
      v-if="featuredLots.length"
      class="bottom-spacing content-stack"
    >
      <header class="text-stack text-center">
        <h2 class="second-title">
          Lots en vedette
        </h2>

        <p class="max-w-2xl mx-auto text-base leading-6">
          Découvrez une sélection de lots actuellement disponibles.
        </p>
      </header>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <LotCard
          v-for="lot in featuredLots"
          :key="lot.id"
          :lot="lot"
        />
      </div>
    </section>
  </div>
</template>
