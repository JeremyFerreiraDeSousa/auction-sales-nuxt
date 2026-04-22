export const formatCurrency = (
  value: number,
  locale = 'fr-FR',
  currency = 'EUR'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value)
}
