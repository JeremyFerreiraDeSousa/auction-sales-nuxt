<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Toutes les ventes',
    to: '/sales',
    icon: 'i-lucide-list',
    active: route.path === '/sales'
  },
  {
    label: 'Créer une vente',
    to: '/sales/create',
    icon: 'i-lucide-plus',
    active: route.path === '/sales/create'
  },
  {
    label: 'Rechercher',
    to: '/search',
    icon: 'i-lucide-search',
    active: route.path === '/search'
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      Auction Project
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip
        text="Open on GitHub"
        :kbds="['meta', 'G']"
      >
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/JeremyFerreiraDeSousa/auction-sales-nuxt"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
