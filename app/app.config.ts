export default defineAppConfig({
  ui: {
    pageHero: {
      slots: {
        title: 'title',
        description: 'max-w-3xl mx-auto text-base text-neutral-700 dark:text-white text-wrap',
        wrapper: 'content-stack'
      }
    },
    separator: {
      variants: {
        color: {
          neutral: {
            border: 'border-neutral-200 dark:border-neutral-900'
          }
        }
      }
    }
  }
})
