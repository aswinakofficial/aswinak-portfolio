import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '@/lib/content'
import { PostCard } from '@/components/blog/post-card'
import { buildPageMeta, buildCanonicalLink } from '@/lib/seo'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPosts(),
  head: () => ({
    meta: buildPageMeta({
      title: 'Blog',
      description: 'Articles on AI engineering, RAG pipelines, LLM orchestration, and full-stack development.',
      slug: 'blog',
    }),
    links: [buildCanonicalLink('blog')],
  }),
  component: BlogPage,
})

function BlogPage() {
  const posts = Route.useLoaderData()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
        Blog
      </div>
      <h1 className="text-5xl font-black mb-2 leading-tight">Writing</h1>
      <p className="text-muted-foreground text-xl font-medium mb-12">
        Thoughts on AI engineering, RAG, and full-stack development.
      </p>
      {posts.length === 0 ? (
        <p className="text-muted-foreground font-medium">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
