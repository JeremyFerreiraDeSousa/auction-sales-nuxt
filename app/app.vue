<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

const title = 'Auction Project'
const description = 'Plateforme moderne de gestion de ventes aux enchères pour créer des ventes, gérer des lots et rechercher facilement l’ensemble du catalogue.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <Header />
    <UMain :ui="{ base: 'page-container' }">
      <NuxtPage />
    </UMain>
  </UApp>
</template>
