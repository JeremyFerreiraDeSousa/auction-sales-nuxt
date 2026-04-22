<script setup lang="ts">
import type { SaleStatus } from '#shared/types/sale'

const props = defineProps<{
  status: SaleStatus
}>()

const color = computed(() => {
  return props.status === 'live' ? 'success' : 'warning'
})

const label = computed(() => {
  return props.status === 'live' ? 'Vente live' : 'À venir'
})
</script>

<template>
  <UBadge
    :label="label"
    :color="color"
  />
</template>
