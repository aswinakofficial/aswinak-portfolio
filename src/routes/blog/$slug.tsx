import { createFileRoute, notFound } from '@tanstack/react-router'
import { Clock, ExternalLink } from 'lucide-react'
import { getPostBySlug, getPostModule } from '@/lib/content'
import { MdxComponents } from '@/components/blog/mdx-components'
import { MemoryLane, StickyMemoryLaneColumn, MobileMemoryLaneOverlay } from '@/components/blog/memory-lane'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { ScrollToTopBottomButton } from '@/components/blog/scroll-nav-button'
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

    const minutesMatch = post.readingTime?.match(/\d+/)
    const minutes = minutesMatch ? parseInt(minutesMatch[0], 10) : null
    const timeRequiredISO = minutes ? `PT${minutes}M` : undefined
    const heroImage = post.frontmatter.photos?.[0]?.src
      ? `${siteConfig.url}${post.frontmatter.photos[0].src}`
      : undefined

    return {
      meta: [
        ...buildPageMeta({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          slug: `blog/${post.slug}`,
          image: heroImage,
          type: 'article',
        }),
        { property: 'og:article:published_time', content: post.frontmatter.publishedAt },
        { property: 'og:article:author', content: siteConfig.name },
        { property: 'og:article:tag', content: post.frontmatter.tags.join(', ') },
        ...(post.frontmatter.category ? [{ property: 'og:article:section', content: post.frontmatter.category }] : []),
      ],
      links: [buildCanonicalLink(`blog/${post.slug}`)],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.publishedAt,
            dateModified: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
            url: `${siteConfig.url}/blog/${post.slug}`,
            ...(timeRequiredISO && { timeRequired: timeRequiredISO }),
            ...(post.frontmatter.category && { articleSection: post.frontmatter.category }),
            keywords: post.frontmatter.tags.join(', '),
            ...(heroImage && { image: [heroImage] }),
            about: post.frontmatter.tags.map((tag: string) => ({ '@type': 'Thing', name: tag })),
            author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
            publisher: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
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

  const isExternal = Boolean(post.frontmatter.isExternal && post.frontmatter.externalUrl)
  const externalUrl = post.frontmatter.externalUrl
  const platform = post.frontmatter.platform || 'External Platform'

  const photos = (post.frontmatter.photos || []).map((photo, i) => ({
    ...photo,
    originalIndex: i,
  }))
  const hasPhotos = photos.length > 0

  // Distribute photos between left and right sidebars to create a Z-pattern
  const leftPhotos = photos.filter((_, i) => i % 2 === 0)
  const rightPhotos = photos.filter((_, i) => i % 2 === 1)

  return (
    <>
      {!isExternal && <ReadingProgress />}
      {!isExternal && <ScrollToTopBottomButton />}
      <article>
        {/* Header */}
        <div className="border-b-[5px] border-border px-4 sm:px-8 md:px-12 pt-10 pb-10 md:pt-16 md:pb-16 brut-dotgrid">
          <div className="mx-auto max-w-[1280px]">
            {/* Breadcrumb + tags */}
            <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-7">
              <a href="/blog" className="hover:text-foreground transition-colors">← Blog</a>
              <span className="opacity-40">/</span>
              <span className="font-bold text-foreground">{post.frontmatter.category || 'Tech'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Badge className={post.frontmatter.category === 'Travel' ? 'bg-orange text-white' : 'bg-blue text-white'}>
                {post.frontmatter.category || 'Tech'}
              </Badge>
              {isExternal && (
                <Badge className="bg-black text-white border-black font-mono">
                  Originally on {platform}
                </Badge>
              )}
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

            {/* Backlink button inside Hero for External Posts */}
            {isExternal && externalUrl && (
              <div className="mb-10">
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border-[3px] border-border bg-orange text-white font-black uppercase tracking-wider text-sm neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-fit"
                >
                  Read Full Article on {platform}
                  <ExternalLink className="h-4 w-4 stroke-[3]" />
                </a>
              </div>
            )}

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
                  <div className="font-mono text-xs text-muted-foreground font-medium">AI Engineer @ EY</div>
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

        {/* MDX Content + Dual Margin Memory Lane Layout */}
        {!isExternal && (
          <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 2xl:px-12 py-16">
            <div className={hasPhotos ? 'flex flex-col xl:flex-row gap-8 2xl:gap-12 3xl:gap-16 items-start justify-between' : 'mx-auto max-w-[840px]'}>

              {/* LEFT Sticky Memory Lane Column (Desktop) */}
              {hasPhotos && leftPhotos.length > 0 && (
                <StickyMemoryLaneColumn className="hidden xl:block w-[240px] 2xl:w-[280px] 3xl:w-[320px] flex-shrink-0">
                  <MemoryLane photos={leftPhotos} side="left" />
                </StickyMemoryLaneColumn>
              )}

              {/* Main Article Content */}
              <div className="w-full max-w-[820px] 2xl:max-w-[860px] flex-1 min-w-0 mx-auto">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {PostContent ? <PostContent components={MdxComponents} /> : <p>Content not found.</p>}
                </div>

                {/* Mobile Memory Lane Trigger & Overlay */}
                {hasPhotos && <MobileMemoryLaneOverlay photos={photos} />}
              </div>

              {/* RIGHT Sticky Memory Lane Column (Desktop) */}
              {hasPhotos && rightPhotos.length > 0 && (
                <StickyMemoryLaneColumn className="hidden xl:block w-[240px] 2xl:w-[280px] 3xl:w-[320px] flex-shrink-0">
                  <MemoryLane photos={rightPhotos} side="right" />
                </StickyMemoryLaneColumn>
              )}

            </div>
          </div>
        )}
      </article>
    </>
  )
}
