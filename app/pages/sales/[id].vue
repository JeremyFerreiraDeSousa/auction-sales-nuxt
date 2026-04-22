<script setup lang="ts">
import type { Lot } from '#shared/types/lot'
import type { Sale } from '#shared/types/sale'

const route = useRoute()
const saleId = route.params.id as string

const { getSaleById } = useSalesApi()
const { getLotsBySaleId } = useLotsApi()

const {
  data: sale,
  status: saleStatus,
  error: saleError
} = await useAsyncData<Sale>(`sale-${saleId}`, () => getSaleById(saleId))

const {
  data: lots,
  status: lotsStatus,
  error: lotsError
} = await useAsyncData<Lot[]>(`sale-lots-${saleId}`, () => getLotsBySaleId(saleId))

const orderedLots = computed(() => {
  return [...(lots.value ?? [])].sort((a, b) => a.saleOrder - b.saleOrder)
})

useSeoMeta({
  title: sale.value ? `${sale.value.title} | Auction Project` : 'Détail de la vente | Auction Project',
  description: sale.value?.description
})
</script>

<template>
  <div>
    <div class="top-tiny-spacing pb-10">
      <NuxtLink
        to="/sales"
        class="inline-link"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="size-4"
        />
        Retour aux ventes
      </NuxtLink>
    </div>
    <section class="bottom-spacing">
      <div>
        <UAlert
          v-if="saleError"
          color="error"
          variant="soft"
          title="Impossible de charger cette vente"
          description="Une erreur est survenue lors du chargement des informations de la vente."
        />

        <div
          v-else-if="saleStatus === 'pending'"
          class="space-y-4"
        >
          <USkeleton class="h-5 w-28 rounded-lg bg-gray-200" />
          <USkeleton class="h-10 w-2/3 rounded-lg bg-gray-200" />
          <USkeleton class="h-24 w-full rounded-2xl bg-gray-200" />
        </div>

        <div
          v-else-if="sale"
          class="space-y-6 lg:space-y-10"
        >
          <SaleOverview
            :sale="sale"
            variant="header"
          />

          <USeparator color="neutral" />

          <div class="content-stack">
            <div class="text-stack">
              <h2 class="second-title">
                Lots
              </h2>

              <p>
                Découvrez les lots associés à cette vente.
              </p>
            </div>

            <UAlert
              v-if="lotsError"
              color="error"
              variant="soft"
              title="Impossible de charger les lots"
              description="Une erreur est survenue lors du chargement des lots de cette vente."
            />

            <div
              v-else-if="lotsStatus === 'pending'"
              class="grid gap-6 lg:grid-cols-2"
            >
              <USkeleton
                v-for="index in 2"
                :key="index"
                class="h-136 rounded-2xl"
              />
            </div>

            <div
              v-else-if="orderedLots.length"
              class="grid gap-6 lg:grid-cols-2"
            >
              <LotCard
                v-for="lot in orderedLots"
                :key="lot.id"
                :lot="lot"
              />
            </div>

            <UCard
              v-else
              class="interactive-card"
            >
              <p class="text-sm text-neutral-600">
                Aucun lot n’est disponible pour cette vente.
              </p>
            </UCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
