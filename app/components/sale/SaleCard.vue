<script setup lang="ts">
import type { Sale } from '#shared/types/sale'

defineProps<{
  sale: Sale
}>()
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
      <SaleOverview
        :sale="sale"
        variant="card"
      />

      <div class="mx-auto mt-auto pt-3">
        <UButton
          :to="`/sales/${sale.id}`"
          trailing-icon="i-lucide-arrow-right"
          title="Voir la vente"
          color="primary"
          variant="outline"
          size="xl"
        >
          Voir la vente
        </UButton>
      </div>
    </div>
  </UCard>
</template>
