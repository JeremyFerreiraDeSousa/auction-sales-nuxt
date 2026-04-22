<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <UPageHero
    :title="title"
    :description="description"
    :ui="{
      root: 'top-spacing bottom-spacing',
      container: 'py-0 sm:py-0 lg:py-0 px-0 sm:px-0 lg:px-0',
      description: 'text-wrap'
    }"
  />
</template>
