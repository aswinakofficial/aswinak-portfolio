import { Link } from '@tanstack/react-router'
import { Clock, ArrowUpRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/post'

const TAG_COLORS: Record<string, string> = {
  RAG: 'bg-orange text-white',
  Agents: 'bg-blue text-white',
  LangChain: 'bg-orange text-white',
  LangGraph: 'bg-blue text-white',
  Career: 'bg-secondary text-secondary-foreground',
  Notes: 'bg-secondary text-secondary-foreground',
}

export function PostCard({ post }: { post: Post }) {
  const primaryTag = post.frontmatter.tags[0]
  const tagColor = TAG_COLORS[primaryTag] ?? 'bg-card text-foreground'

  return (
    <article className="border-[4px] border-border bg-card neo-shadow p-6 flex flex-col gap-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.frontmatter.tags.slice(0, 2).map((tag, i) => (
          <span
            key={tag}
            className={`inline-flex items-center border-[2.5px] border-border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${i === 0 ? tagColor : 'bg-background text-foreground'}`}
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
}
