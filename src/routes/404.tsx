import { createFileRoute } from '@tanstack/react-router'
import { NotFoundPage } from '@/components/layout/not-found'
import { buildPageMeta } from '@/lib/seo'

export const Route = createFileRoute('/404')({
  head: () => ({
    meta: buildPageMeta({
      title: '404 — Page Not Found',
      description: 'The page you are looking for does not exist.',
    }).concat({ name: 'robots', content: 'noindex' }),
  }),
  component: NotFoundPage,
})
