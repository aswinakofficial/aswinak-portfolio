import { createFileRoute, notFound } from '@tanstack/react-router'
import { Clock } from 'lucide-react'
import { getPostBySlug, getPostModule } from '@/lib/content'
import { MdxComponents } from '@/components/blog/mdx-components'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { buildPageMeta, buildCanonicalLink, siteConfig } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData: post }) => {
    if (!post) return {}
    return {
      meta: [
        ...buildPageMeta({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          slug: `blog/${post.slug}`,
          type: 'article',
        }),
      ],
      links: [buildCanonicalLink(`blog/${post.slug}`)],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            author: { '@type': 'Person', name: siteConfig.name },
            datePublished: post.frontmatter.publishedAt,
            url: `${siteConfig.url}/blog/${post.slug}`,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
              { '@type': 'ListItem', position: 3, name: post.frontmatter.title },
            ],
          }),
        },
      ],
    }
  },
  notFoundComponent: () => (
    <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-black mb-2">Post not found</h1>
      <p className="text-muted-foreground">This post doesn't exist or has been removed.</p>
    </div>
  ),
  component: BlogPostPage,
})

function BlogPostPage() {
  const post = Route.useLoaderData()
  const module = getPostModule(post.slug)
  const PostContent = module?.default

  return (
    <>
      <ReadingProgress />
      <article>
        {/* Header */}
        <div className="border-b-[5px] border-border px-12 pt-16 pb-16 brut-dotgrid">
          <div className="mx-auto max-w-[1280px]">
            {/* Breadcrumb + tags */}
            <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-7">
              <a href="/blog" className="hover:text-foreground transition-colors">← Blog</a>
              <span className="opacity-40">/</span>
              <span>Engineering</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <h1
              className="font-display font-black leading-[0.95] tracking-[-0.055em] max-w-[1100px] mb-10"
              style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
            >
              {post.frontmatter.title}
            </h1>

            <p className="text-xl font-medium text-muted-foreground max-w-[680px] mb-10">
              {post.frontmatter.description}
            </p>

            {/* Author + meta */}
            <div className="flex flex-wrap items-center gap-6 border-t-[3px] border-border pt-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center border-[3px] border-border font-black text-sm text-background"
                  style={{ background: '#FF5C00' }}
                >
                  AK
                </div>
                <div>
                  <div className="font-black text-sm">Aswin AK</div>
                  <div className="font-mono text-xs text-muted-foreground font-medium">AI Engineer · @aswin</div>
                </div>
              </div>

              <span className="w-1.5 h-1.5 bg-foreground hidden sm:block" />
              <span className="font-semibold text-sm">{formatDate(post.frontmatter.publishedAt)}</span>

              <span className="w-1.5 h-1.5 bg-foreground hidden sm:block" />
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* MDX content */}
        <div className="mx-auto max-w-[880px] px-6 py-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {PostContent ? <PostContent components={MdxComponents} /> : <p>Content not found.</p>}
          </div>
        </div>
      </article>
    </>
  )
}
