'use client'

import { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '@/lib/content'
import { PostCard } from '@/components/blog/post-card'
import { buildPageMeta, buildCanonicalLink } from '@/lib/seo'
import type { PostMeta } from '@/lib/content'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPosts(),
  head: () => ({
    meta: buildPageMeta({
      title: 'Blog & Articles',
      description: 'Articles on AI engineering, technical architecture, and real-world travel journals.',
      slug: 'blog',
    }),
    links: [buildCanonicalLink('blog')],
  }),
  component: BlogPage,
})

type BlogCategory = 'All' | 'Tech' | 'Travel'

const CATEGORY_META: Record<BlogCategory, { color: string; swatch: string; blurb: string }> = {
  All: {
    color: '#FFE500',
    swatch: 'bg-secondary',
    blurb: 'All articles, engineering notes, and personal travel journals.',
  },
  Tech: {
    color: '#0047FF',
    swatch: 'bg-blue',
    blurb: 'Technical deep dives on AI engineering, RAG pipelines, LLMs, and architecture.',
  },
  Travel: {
    color: '#FF5C00',
    swatch: 'bg-orange',
    blurb: 'Personal travel logs, trekking adventures, road trips, and practical travel guides.',
  },
}

function CategoryDropdown({
  selected,
  onSelect,
  counts,
}: {
  selected: BlogCategory
  onSelect: (cat: BlogCategory) => void
  counts: Record<BlogCategory, number>
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const categories: BlogCategory[] = ['All', 'Tech', 'Travel']

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-3 px-5 py-3.5 border-[4px] border-foreground font-black text-sm uppercase tracking-tight neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-full sm:min-w-[240px] justify-between bg-card text-foreground"
      >
        <span className="flex items-center gap-3">
          <span
            className={`w-4 h-4 border-[2.5px] border-foreground flex-shrink-0 ${CATEGORY_META[selected].swatch}`}
          />
          <span className="flex flex-col items-start gap-0.5">
            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] opacity-60 uppercase">Category</span>
            <span>{selected}</span>
          </span>
        </span>
        <span className="font-black text-xs" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          ▼
        </span>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+6px)] left-0 sm:left-auto right-0 w-full sm:min-w-[260px] border-[4px] z-30 shadow-lg"
          style={{ background: '#1a1a1a', borderColor: '#FFFBF0', boxShadow: '6px 6px 0 0 #FFFBF0' }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { onSelect(c); setOpen(false) }}
              className="flex w-full items-center gap-3 px-4 py-3 font-black text-xs uppercase tracking-wide border-b-[3px] last:border-b-0 transition-colors text-left"
              style={{
                borderColor: '#333',
                background: selected === c ? '#FFFBF0' : 'transparent',
                color: selected === c ? '#0A0A0A' : '#FFFBF0',
              }}
              onMouseEnter={e => { if (selected !== c) e.currentTarget.style.background = '#2a2a2a' }}
              onMouseLeave={e => { if (selected !== c) e.currentTarget.style.background = 'transparent' }}
            >
              <span
                className={`w-4 h-4 border-[2.5px] flex-shrink-0 ${CATEGORY_META[c].swatch}`}
                style={{ borderColor: selected === c ? '#0A0A0A' : '#FFFBF0' }}
              />
              <span>{c}</span>
              <span
                className="ml-auto font-mono text-[11px] font-bold border-[2px] px-2 py-0.5"
                style={
                  selected === c
                    ? { background: '#FF5C00', color: '#fff', borderColor: '#FF5C00' }
                    : { background: 'transparent', color: '#FFFBF0', borderColor: '#555' }
                }
              >
                {counts[c]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BlogPage() {
  const posts: PostMeta[] = Route.useLoaderData()
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All')

  const counts: Record<BlogCategory, number> = {
    All: posts.length,
    Tech: posts.filter((p) => (p.frontmatter.category || 'Tech') === 'Tech').length,
    Travel: posts.filter((p) => p.frontmatter.category === 'Travel').length,
  }

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'All') return true
    return (p.frontmatter.category || 'Tech') === selectedCategory
  })

  const meta = CATEGORY_META[selectedCategory]

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-12 py-16">
      {/* Header section */}
      <div className="border-b-[4px] border-border pb-10 mb-10">
        <div className="inline-block border-[3px] border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
          Writing & Journals
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-display font-black leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(40px, 7vw, 64px)' }}>
              <span
                className="inline-block w-12 h-[16px] border-[3px] border-border mr-3 align-middle transition-colors"
                style={{ background: meta.color, transform: 'rotate(-2deg)' }}
              />
              Blog & Articles
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-[680px]">
              {meta.blurb}
            </p>
          </div>

          {/* Category Dropdown & Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CategoryDropdown selected={selectedCategory} onSelect={setSelectedCategory} counts={counts} />

            {/* Quick Filter Pills on Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {(['All', 'Tech', 'Travel'] as BlogCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2.5 border-[3px] border-border font-black text-xs uppercase tracking-wider transition-all neo-shadow-sm flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-foreground text-background'
                      : 'bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 border-[1.5px] ${
                    selectedCategory === cat ? 'bg-orange text-white border-background' : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {counts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center border-[4px] border-dashed border-border/40 font-display font-black text-2xl">
          No posts found in category "{selectedCategory}".
        </div>
      ) : (
        <div key={selectedCategory} className="brut-pop-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
