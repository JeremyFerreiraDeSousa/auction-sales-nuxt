<script setup lang="ts">
import type { Lot } from '#shared/types/lot'
import { formatCurrency } from '~/utils/formatCurrency'

const props = defineProps<{
  lot: Lot
}>()

const formattedEstimate = computed(() => {
  return `${formatCurrency(props.lot.lowEstimate)} - ${formatCurrency(props.lot.highEstimate)}`
})
</script>

<template>
  <UCard
    class="interactive-card h-full"
    :ui="{
      root: 'flex flex-col',
      body: 'flex flex-1 flex-col'
    }"
  >
    <div class="flex h-full flex-col gap-5">
      <NuxtImg
        :src="lot.imageUrl"
        :alt="lot.title"
        width="800"
        height="520"
        class="h-56 w-full rounded-xl object-cover"
      />

      <div class="flex flex-1 flex-col gap-4">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1">
            <p class="text-sm font-medium">
              Lot {{ lot.saleOrder }}
            </p>

            <h2 class="text-lg font-semibold tracking-tight text-neutral-900">
              {{ lot.title }}
            </h2>
          </div>

          <UBadge color="neutral">
            {{ lot.category }}
          </UBadge>
        </div>

        <p>
          {{ lot.description }}
        </p>

        <div class="mt-auto rounded-xl bg-neutral-100 p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.2em]">
            Estimation
          </p>

          <p class="mt-2 text-sm font-semibold text-neutral-900">
            {{ formattedEstimate }}
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>
