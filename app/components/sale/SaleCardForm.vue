<script setup lang="ts">
import type { SaleFormSchema } from '~/schemas/sale'

defineProps<{
  saleForm: SaleFormSchema
  statusOptions: { label: string, value: string }[]
}>()

const emit = defineEmits<{
  update: [payload: {
    field: keyof SaleFormSchema
    value: SaleFormSchema[keyof SaleFormSchema]
  }]
}>()

const updateField = (field: keyof SaleFormSchema, value: string | number) => {
  emit('update', {
    field,
    value: String(value ?? '')
  })
}
</script>

<template>
  <UCard>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-800 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-start gap-4">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700 ring-1 ring-green-100 dark:bg-green-950 dark:text-green-300 dark:ring-green-900">
            <UIcon
              name="i-lucide-landmark"
              class="size-5"
            />
          </div>

          <div class="space-y-1">
            <p class="text-sm font-medium">
              Vente
            </p>
            <h2 class="third-title">
              Informations de la vente
            </h2>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div class="flex flex-col gap-6">
          <UFormField
            label="Titre"
            name="title"
            size="lg"
            required
          >
            <UInput
              :model-value="saleForm.title"
              placeholder="Ex. Art contemporain et design du XXe siècle"
              class="w-full"
              @update:model-value="updateField('title', $event)"
            />
          </UFormField>

          <UFormField
            label="Lieu"
            name="location"
            size="lg"
            required
          >
            <UInput
              :model-value="saleForm.location"
              icon="i-lucide-map-pin"
              placeholder="Ex. Paris"
              class="w-full"
              @update:model-value="updateField('location', $event)"
            />
          </UFormField>
        </div>

        <div class="rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-100 dark:bg-slate-950 dark:ring-neutral-800">
          <div class="mb-4 flex items-center gap-2">
            <UIcon
              name="i-lucide-badge-check"
              class="size-5 text-green-600 dark:text-green-400"
            />
            <p class="text-sm font-semibold text-neutral-800 dark:text-white">
              Statut
            </p>
          </div>

          <UFormField
            label="Statut de la vente"
            name="status"
            required
          >
            <USelect
              :model-value="saleForm.status"
              :items="statusOptions"
              value-key="value"
              placeholder="Sélectionner un statut"
              class="w-full"
              @update:model-value="updateField('status', $event)"
            />
          </UFormField>
        </div>
      </div>

      <div class="rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-100 dark:bg-slate-950 dark:ring-neutral-800">
        <div class="mb-4 flex items-center gap-2">
          <UIcon
            name="i-lucide-file-text"
            class="size-5 text-green-600 dark:text-green-400"
          />
          <p class="text-sm font-semibold text-neutral-800 dark:text-white">
            Présentation
          </p>
        </div>

        <UFormField
          label="Description"
          name="description"
          required
        >
          <UTextarea
            :model-value="saleForm.description"
            :rows="5"
            placeholder="Décrivez la vente…"
            class="w-full"
            @update:model-value="updateField('description', $event)"
          />
        </UFormField>
      </div>
    </div>
  </UCard>
</template>
