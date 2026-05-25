'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { getAllProjects } from '@/lib/content'

type Category = 'Solutions' | 'Open Source' | 'For Fun'

const CATEGORY_META: Record<Category, { color: string; swatch: string; blurb: string }> = {
  Solutions: {
    color: '#FF5C00',
    swatch: 'bg-orange',
    blurb: 'Client work, in production, paying the bills.',
  },
  'Open Source': {
    color: '#0047FF',
    swatch: 'bg-blue',
    blurb: 'Stuff I gave away because someone should have built it.',
  },
  'For Fun': {
    color: '#FFE500',
    swatch: 'bg-secondary',
    blurb: "Built at 1am because I couldn't sleep. Some of them ship anyway.",
  },
}

function CategoryDropdown({
  value,
  onChange,
  counts,
}: {
  value: Category
  onChange: (c: Category) => void
  counts: Record<Category, number>
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

  const categories: Category[] = ['Solutions', 'Open Source', 'For Fun']

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-3 px-5 py-3.5 border-[4px] font-black text-lg uppercase tracking-tight neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all min-w-[280px] justify-between"
        style={{ background: '#FFFBF0', color: '#0A0A0A', borderColor: '#0A0A0A' }}
      >
        <span className="flex items-center gap-3">
          <span
            className={`w-5 h-5 border-[3px] flex-shrink-0 ${CATEGORY_META[value].swatch}`}
            style={{ borderColor: '#0A0A0A' }}
          />
          <span className="flex flex-col items-start gap-0.5">
            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] opacity-55 uppercase">Showing</span>
            <span>{value}</span>
          </span>
        </span>
        <span className="font-black text-sm" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          ▼
        </span>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+6px)] right-0 min-w-[320px] border-[4px] z-20"
          style={{ background: '#1a1a1a', borderColor: '#FFFBF0', boxShadow: '6px 6px 0 0 #FFFBF0' }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { onChange(c); setOpen(false) }}
              className="flex w-full items-center gap-3 px-4 py-3.5 font-black text-sm uppercase tracking-wide border-b-[3px] last:border-b-0 transition-colors text-left"
              style={{
                borderColor: '#333',
                background: value === c ? '#FFFBF0' : 'transparent',
                color: value === c ? '#0A0A0A' : '#FFFBF0',
              }}
              onMouseEnter={e => { if (value !== c) e.currentTarget.style.background = '#2a2a2a' }}
              onMouseLeave={e => { if (value !== c) e.currentTarget.style.background = 'transparent' }}
            >
              <span
                className={`w-5 h-5 border-[3px] flex-shrink-0 ${CATEGORY_META[c].swatch}`}
                style={{ borderColor: value === c ? '#0A0A0A' : '#FFFBF0' }}
              />
              <span>{c}</span>
              <span
                className="ml-auto font-mono text-[11px] font-bold border-[2px] px-2 py-0.5"
                style={
                  value === c
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

export function FeaturedProjects() {
  const [category, setCategory] = useState<Category>('Solutions')
  const allProjects = getAllProjects()

  const counts = {
    Solutions: allProjects.filter((p) => p.frontmatter.category === 'Solutions').length,
    'Open Source': allProjects.filter((p) => p.frontmatter.category === 'Open Source').length,
    'For Fun': allProjects.filter((p) => p.frontmatter.category === 'For Fun').length,
  }

  const projects = allProjects
    .filter((p) => p.frontmatter.category === category)
    .slice(0, 3)

  const meta = CATEGORY_META[category]

  return (
    <section
      className="border-t-[5px] border-b-[5px] border-border py-28"
      style={{ background: '#0A0A0A', color: '#FFFBF0' }}
    >
      <div className="mx-auto max-w-[1280px] px-12">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: '#aaa' }}>
          § 02 — Selected Work
        </p>

        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className="font-display font-black leading-none tracking-[-0.04em] mb-4"
              style={{ fontSize: 'clamp(40px, 5vw, 56px)', color: '#FFFBF0' }}
            >
              <span
                className="inline-block w-14 h-[18px] border-[3px] border-background mr-3 align-middle"
                style={{ background: meta.color, transform: 'rotate(-2deg)' }}
              />
              Featured projects.
            </h2>
            <p className="font-mono text-sm font-semibold tracking-wide" style={{ color: '#bbb' }}>
              {meta.blurb}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <CategoryDropdown value={category} onChange={setCategory} counts={counts} />
            <Link
              to="/projects"
              className="font-mono text-xs font-semibold tracking-[0.08em] uppercase underline underline-offset-4"
              style={{ color: '#888' }}
            >
              See all projects ↗
            </Link>
          </div>
        </div>

        {/* Cards grid — keyed on category so React remounts and triggers pop-in */}
        <div key={category} className="brut-pop-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col border-[4px] neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all"
              style={{ background: '#fff', color: '#0A0A0A', borderColor: '#0A0A0A', boxShadow: `6px 6px 0 0 ${meta.color}` }}
            >
              {/* Category strip */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b-[4px] border-border font-black text-xs uppercase tracking-[0.08em]"
                style={{ background: meta.color, color: meta.color === '#FFE500' ? '#0A0A0A' : '#fff', borderColor: '#0A0A0A' }}
              >
                <span>{category}</span>
                <span className="font-mono font-semibold opacity-70 text-[11px]">
                  {new Date().getFullYear()}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3.5 flex-1">
                <h3 className="font-display font-black text-xl leading-tight tracking-tight">
                  {project.frontmatter.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#333] flex-1">
                  {project.frontmatter.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.frontmatter.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] font-semibold tracking-wider border-[2.5px] border-[#0A0A0A] px-2 py-0.5 bg-[#FFFBF0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t-[3px] border-[#0A0A0A] mt-auto">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-secondary px-1.5 py-1 -mx-1.5 transition-colors"
                  >
                    Read case <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {projects.length === 0 && (
            <div className="col-span-3 py-16 text-center border-[4px] border-dashed border-background/30 font-display font-black text-xl" style={{ color: '#FFFBF0' }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
