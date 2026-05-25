import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'

const TAG_COLORS: Record<string, string> = {
  RAG: 'bg-orange text-white',
  Agents: 'bg-blue text-white',
  LangChain: 'bg-orange text-white',
  LangGraph: 'bg-blue text-white',
  Career: 'bg-secondary text-secondary-foreground',
  Notes: 'bg-secondary text-secondary-foreground',
}

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="border-t-[4px] border-border py-16 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-12">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-4">
          § 03 — Writing
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <h2 className="font-display font-black leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(32px, 7vw, 56px)' }}>
            <span
              className="inline-block w-14 h-[18px] border-[3px] border-border mr-3 align-middle bg-blue"
              style={{ transform: 'rotate(-2deg)' }}
            />
            Latest from the blog.
          </h2>
          <Link
            to="/blog"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 px-4 py-2.5 border-[3px] border-border bg-card font-black text-xs uppercase tracking-wide neo-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Archive <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const primaryTag = post.frontmatter.tags[0]
            const tagColor = TAG_COLORS[primaryTag] ?? 'bg-card text-foreground border-border'

            return (
              <article
                key={post.slug}
                className="border-[4px] border-border bg-card neo-shadow p-6 flex flex-col gap-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center border-[2.5px] border-border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${i === 0 ? tagColor : 'bg-card text-foreground'}`}
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
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
