import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { buildPageMeta } from '@/lib/seo'

export const Route = createFileRoute('/404')({
  head: () => ({
    meta: buildPageMeta({
      title: '404 — Page Not Found',
      description: 'The page you are looking for does not exist.',
    }),
  }),
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-32 text-center">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-6 py-3 text-6xl font-black neo-shadow mb-6">
        404
      </div>
      <h1 className="text-3xl font-black mb-2">Page not found</h1>
      <p className="text-muted-foreground font-medium mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  )
}
