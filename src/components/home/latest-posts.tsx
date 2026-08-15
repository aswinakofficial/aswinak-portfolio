'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'

type BlogCategory = 'All' | 'Tech' | 'Travel'

const CATEGORY_META: Record<BlogCategory, { color: string; swatch: string; blurb: string }> = {
  All: {
    color: '#FFE500',
    swatch: 'bg-secondary',
    blurb: 'Engineering articles, AI experiments, and travel journals.',
  },
  Tech: {
    color: '#0047FF',
    swatch: 'bg-blue',
    blurb: 'Deep dives on RAG pipelines, AI agents, and production systems.',
  },
  Travel: {
    color: '#FF5C00',
    swatch: 'bg-orange',
    blurb: 'Travel logs, trekking experiences, and road trip stories.',
  },
}

function CategoryDropdown({
  selected,
  onSelect,
  counts,
}: {
  selected: BlogCategory
  onSelect: (c: BlogCategory) => void
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
        className="inline-flex items-center gap-3 px-5 py-3 border-[4px] border-foreground font-black text-sm uppercase tracking-tight neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-full sm:min-w-[240px] justify-between bg-card text-foreground"
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

export function LatestPosts() {
  const [category, setCategory] = useState<BlogCategory>('All')
  const allPosts = getAllPosts()

  if (allPosts.length === 0) return null

  const counts: Record<BlogCategory, number> = {
    All: allPosts.length,
    Tech: allPosts.filter((p) => (p.frontmatter.category || 'Tech') === 'Tech').length,
    Travel: allPosts.filter((p) => p.frontmatter.category === 'Travel').length,
  }

  const posts = allPosts
    .filter((p) => {
      if (category === 'All') return true
      return (p.frontmatter.category || 'Tech') === category
    })
    .slice(0, 3)

  const meta = CATEGORY_META[category]

  return (
    <section className="border-t-[4px] border-border py-16 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-12">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-4">
          § 03 — Writing & Journals
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display font-black leading-none tracking-[-0.04em] mb-3" style={{ fontSize: 'clamp(32px, 7vw, 56px)' }}>
              <span
                className="inline-block w-14 h-[18px] border-[3px] border-border mr-3 align-middle transition-colors"
                style={{ background: meta.color, transform: 'rotate(-2deg)' }}
              />
              Latest from the blog.
            </h2>
            <p className="font-mono text-sm font-semibold tracking-wide text-muted-foreground">
              {meta.blurb}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <CategoryDropdown selected={category} onSelect={setCategory} counts={counts} />
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.08em] uppercase underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              All Articles & Journals <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
            </Link>
          </div>
        </div>

        <div key={category} className="brut-pop-in grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const catName = post.frontmatter.category || 'Tech'
            const catBg = catName === 'Travel' ? 'bg-orange text-white' : 'bg-blue text-white'

            return (
              <article
                key={post.slug}
                className="border-[4px] border-border bg-card neo-shadow p-6 flex flex-col gap-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all"
              >
                {/* Category + Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center border-[2.5px] border-border px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${catBg}`}>
                    {catName}
                  </span>
                  {post.frontmatter.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center border-[2.5px] border-border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide bg-background text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
                  <h3 className="font-display font-black text-xl leading-tight tracking-tight group-hover:text-orange transition-colors">
                    {post.frontmatter.title}
                  </h3>
                </Link>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed flex-1">
                  {post.frontmatter.description}
                </p>

                <div className="flex items-center justify-between border-t-[3px] border-border pt-4 mt-auto">
                  <div className="flex items-center gap-3 font-mono text-xs font-semibold text-muted-foreground">
                    <span>{formatDate(post.frontmatter.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="font-black text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-secondary px-1.5 py-1 -mr-1.5 transition-colors"
                  >
                    Read <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
                  </Link>
                </div>
              </article>
            )
          })}

          {posts.length === 0 && (
            <div className="col-span-3 py-16 text-center border-[4px] border-dashed border-border/30 font-display font-black text-xl">
              No posts in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
