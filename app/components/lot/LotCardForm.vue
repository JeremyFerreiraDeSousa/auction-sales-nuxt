<script setup lang="ts">
import type { LotDraft } from '#shared/types/lot'

const props = defineProps<{
  lot: LotDraft
  index: number
  canRemove?: boolean
}>()

const emit = defineEmits<{
  remove: []
  update: [payload: {
    field: keyof LotDraft
    value: string | number
  }]
}>()

const updateTextField = (field: keyof LotDraft, value: string | number) => {
  emit('update', {
    field,
    value: String(value ?? '')
  })
}

const updateNumberField = (field: keyof LotDraft, value: string | number) => {
  const parsedValue = typeof value === 'number' ? value : Number(value)

  emit('update', {
    field,
    value: Number.isFinite(parsedValue) ? parsedValue : 0
  })
}

const hasImagePreview = computed(() => props.lot.imageUrl.trim().length > 0)
</script>

<template>
  <UCard>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-800 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-start gap-4">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-sm font-bold text-green-700 ring-1 ring-green-100 dark:bg-green-950 dark:text-green-300 dark:ring-green-900">
            {{ index + 1 }}
          </div>

          <div class="space-y-1">
            <p class="text-sm font-medium">
              Lot {{ index + 1 }}
            </p>
            <h2 class="third-title">
              Informations du lot
            </h2>
          </div>
        </div>

        <UButton
          v-if="canRemove"
          color="error"
          variant="ghost"
          icon="i-lucide-trash-2"
          aria-label="Supprimer ce lot"
          class="self-start"
          @click="emit('remove')"
        />
      </div>

      <div class="grid gap-6 lg:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
        <div class="flex flex-col gap-6">
          <UFormField
            :name="`lots.${index}.title`"
            label="Titre"
            size="lg"
            required
          >
            <UInput
              :model-value="lot.title"
              placeholder="Ex. Bague solitaire diamant 3 carats"
              class="w-full"
              @update:model-value="updateTextField('title', $event)"
            />
          </UFormField>

          <UFormField
            :name="`lots.${index}.category`"
            label="Catégorie"
            size="lg"
            required
          >
            <UInput
              :model-value="lot.category"
              placeholder="Ex. Bijoux"
              class="w-full"
              @update:model-value="updateTextField('category', $event)"
            />
          </UFormField>

          <UFormField
            :name="`lots.${index}.description`"
            label="Description"
            size="lg"
            required
          >
            <UTextarea
              :model-value="lot.description"
              :rows="4"
              placeholder="Décrivez le lot…"
              class="w-full"
              @update:model-value="updateTextField('description', $event)"
            />
          </UFormField>

          <UFormField
            :name="`lots.${index}.imageUrl`"
            label="URL de l’image"
            size="lg"
            required
          >
            <UInput
              :model-value="lot.imageUrl"
              type="url"
              icon="i-lucide-link"
              placeholder="https://images.unsplash.com/..."
              class="w-full"
              @update:model-value="updateTextField('imageUrl', $event)"
            />
          </UFormField>
        </div>

        <aside class="flex flex-col">
          <div class="flex min-h-72 flex-1 overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200 dark:bg-slate-950 dark:ring-neutral-800">
            <NuxtImg
              v-if="hasImagePreview"
              :src="lot.imageUrl"
              :alt="lot.title || `Aperçu du lot ${index + 1}`"
              fit="inside"
              class="h-full min-h-72 w-full object-contain"
            />

            <div
              v-else
              class="flex min-h-72 w-full flex-col items-center justify-center gap-3 px-6 text-center"
            >
              <div class="flex size-12 items-center justify-center rounded-2xl bg-white text-neutral-400 shadow-sm dark:bg-slate-900 dark:text-neutral-500">
                <UIcon
                  name="i-lucide-image"
                  class="size-6"
                />
              </div>
              <p class="text-sm text-neutral-500">
                L’aperçu apparaîtra quand une image sera renseignée.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div class="rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-100 dark:bg-slate-950 dark:ring-neutral-800">
        <div class="mb-4 flex items-center gap-2">
          <UIcon
            name="i-lucide-gavel"
            class="size-5 text-green-600 dark:text-green-400"
          />
          <p class="text-sm font-semibold text-neutral-800 dark:text-white">
            Ordre et estimations
          </p>
        </div>

        <div class="grid gap-6 lg:gap-10 md:grid-cols-3">
          <UFormField
            :name="`lots.${index}.saleOrder`"
            label="Ordre dans la vente"
            required
          >
            <UInput
              :model-value="lot.saleOrder"
              type="number"
              min="1"
              class="w-full"
              @update:model-value="updateNumberField('saleOrder', $event)"
            />
          </UFormField>

          <UFormField
            :name="`lots.${index}.lowEstimate`"
            label="Estimation basse (€)"
            required
          >
            <UInput
              :model-value="lot.lowEstimate"
              type="number"
              min="0"
              class="w-full"
              @update:model-value="updateNumberField('lowEstimate', $event)"
            />
          </UFormField>

          <UFormField
            :name="`lots.${index}.highEstimate`"
            label="Estimation haute (€)"
            required
          >
            <UInput
              :model-value="lot.highEstimate"
              type="number"
              min="0"
              class="w-full"
              @update:model-value="updateNumberField('highEstimate', $event)"
            />
          </UFormField>
        </div>
      </div>
    </div>
  </UCard>
</template>
