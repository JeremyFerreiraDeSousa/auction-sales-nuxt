<script setup lang="ts">
import type { Sale } from '#shared/types/sale'
import { useSalesApi } from '~/composables/useSalesApi'

const { getSales } = useSalesApi()

const {
  data: sales,
  status,
  error
} = await useAsyncData<Sale[]>('sales', () => getSales())

const orderedSales = computed(() => {
  return [...(sales.value ?? [])].sort((a, b) => {
    if (a.status === b.status) {
      return Number(b.id) - Number(a.id)
    }

    return a.status === 'live' ? -1 : 1
  })
})

useSeoMeta({
  title: 'Ventes aux enchères | Auction Project',
  description: 'Explorez les ventes en cours et à venir, puis parcourez les lots associés.'
})
</script>

<template>
  <div>
    <SimpleHero
      title="Découvrez toutes les ventes aux enchères"
      description=" Explorez les ventes en cours et à venir, puis parcourez les lots associés."
    />
    <section class="bottom-spacing content-stack">
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
        title="Impossible de charger les ventes"
        description="Veuillez actualiser la page ou réessayer plus tard."
      />

      <div
        v-else-if="orderedSales?.length"
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <SaleCard
          v-for="sale in orderedSales"
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
  </div>
</template>
