<script setup lang="ts">
const {
  lots,
  isLoading,
  limit,
  initFirstLoad,
  hasMore,
  error,
  loadMoreLots
} = useInfiniteLots()

const intersection = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(async () => {
  await loadMoreLots()

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]

    if (entry?.isIntersecting) {
      loadMoreLots()
    }
  }, {
    root: null,
    rootMargin: '100px',
    threshold: 0
  })

  if (intersection.value) {
    observer.observe(intersection.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

useSeoMeta({
  title: 'Lots aux enchères | Auction Project',
  description: 'Parcourez les lots disponibles aux enchères et découvrez leurs estimations.'
})
</script>

<template>
  <div>
    <SimpleHero
      title="Tous les lots aux enchères"
      description="Découvrez les lots disponibles et leurs estimations."
    />

    <section class="bottom-spacing content-stack">
      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        title="Chargement impossible"
        :description="error"
      />

      <div
        v-else-if="initFirstLoad"
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <USkeleton
          v-for="index in limit"
          :key="`loading-init-${index}`"
          class="h-80 rounded-2xl bg-gray-200"
        />
      </div>

      <div
        v-else-if="lots.length"
        class="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <LotCard
          v-for="lot in lots"
          :key="lot.id"
          :lot="lot"
          show-sale-cta
        />

        <template v-if="isLoading">
          <USkeleton
            v-for="index in limit"
            :key="`loading-${index}`"
            class="min-h-[500px] rounded-2xl bg-gray-200"
          />
        </template>
      </div>

      <UCard v-else>
        <p class="text-sm">
          Aucun lot disponible pour le moment.
        </p>
      </UCard>

      <div
        v-if="hasMore && !initFirstLoad"
        ref="intersection"
        class="h-10"
      />

      <p
        v-else-if="lots.length"
        class="text-center text-sm text-neutral-500"
      >
        Tous les lots ont été chargés.
      </p>
    </section>
  </div>
</template>
