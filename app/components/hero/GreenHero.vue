<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Voir les ventes',
    to: '/sales',
    color: 'neutral',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>

<template>
  <UPageHero
    title="Pilotez vos ventes aux enchères simplement"
    description="Créez de nouvelles ventes, organisez leurs lots et consultez l’ensemble des enchères depuis une interface claire et moderne."
    :links="links"
    :ui="{
      root: 'top-tiny-spacing bottom-spacing',
      container: 'max-w-auto bg-green-500 dark:bg-green-900 rounded-3xl py-12 sm:py-16 lg:py-20'
    }"
  />
</template>
