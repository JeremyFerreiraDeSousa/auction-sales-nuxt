<script setup lang="ts">
import type { Sale } from '#shared/types/sale'

type Variant = 'card' | 'header'

defineProps<{
  sale: Sale
  variant: Variant
}>()
</script>

<template>
  <div class="text-stack">
    <div class="flex items-start justify-between">
      <div class="text-stack">
        <p v-if="variant === 'card'">
          {{ sale.location }}
        </p>

        <SaleStatusBadge
          v-else
          :status="sale.status"
        />

        <h1
          v-if="variant === 'header'"
          class="title"
        >
          {{ sale.title }}
        </h1>
        <h3
          v-else
          class="third-title"
        >
          {{ sale.title }}
        </h3>
      </div>

      <SaleStatusBadge
        v-if="variant === 'card'"
        :status="sale.status"
      />
    </div>

    <p class="leading-7">
      {{ sale.description }}
    </p>

    <p v-if="variant === 'header'">
      Lieu : {{ sale.location }}
    </p>
  </div>
</template>
