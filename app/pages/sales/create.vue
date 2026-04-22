<script setup lang="ts">
import { saleStatusOptions } from '~/schemas/sale'
import { saleCreationSchema } from '~/schemas/saleCreation'

const {
  formState,
  submitError,
  isSubmitting,
  addLot,
  removeLot,
  updateSale,
  updateLot,
  handleSubmit
} = useSaleCreationForm()

useSeoMeta({
  title: 'Créer une vente | Auction Project',
  description: 'Créez une nouvelle vente aux enchères et ses lots associés.'
})
</script>

<template>
  <div>
    <SimpleHero
      title="Création d'une vente"
      description="Ajoutez une nouvelle vente et renseignez les lots associés avant de l’enregistrer."
    />

    <section class="bottom-spacing">
      <UForm
        :schema="saleCreationSchema"
        :state="formState"
        class="content-stack"
        @submit="handleSubmit"
      >
        <SaleCardForm
          :sale-form="formState"
          :status-options="saleStatusOptions"
          @update="updateSale"
        />

        <div class="space-y-6">
          <LotCardForm
            v-for="(lot, index) in formState.lots"
            :key="`${index}-${lot.saleOrder}`"
            :lot="lot"
            :index="index"
            :can-remove="formState.lots.length > 1"
            @remove="removeLot(index)"
            @update="updateLot(index, $event)"
          />

          <div class="flex justify-center">
            <UButton
              type="button"
              variant="soft"
              icon="i-lucide-plus"
              @click="addLot"
            >
              Ajouter un lot
            </UButton>
          </div>
        </div>

        <UAlert
          v-if="submitError"
          color="error"
          variant="soft"
          title="Création impossible"
          :description="submitError"
        />

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <UButton
            to="/"
            variant="ghost"
            color="neutral"
          >
            Annuler
          </UButton>

          <UButton
            type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            trailing-icon="i-lucide-check"
          >
            Créer la vente
          </UButton>
        </div>
      </UForm>
    </section>
  </div>
</template>
