import { Link } from '@tanstack/react-router'
import { Clock, ArrowUpRight, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/post'

const CATEGORY_COLORS: Record<string, string> = {
  Tech: 'bg-blue text-white',
  Travel: 'bg-orange text-white',
}

const PLATFORM_COLORS: Record<string, string> = {
  Medium: 'bg-black text-white border-black',
  'Hackster.io': 'bg-[#00979C] text-white border-[#00979C]',
  'Dev.to': 'bg-[#0A0A0A] text-white border-black',
  Substack: 'bg-[#FF6719] text-white border-[#FF6719]',
  LinkedIn: 'bg-[#0A66C2] text-white border-[#0A66C2]',
}

export function PostCard({ post }: { post: Post }) {
  const category = post.frontmatter.category || 'Tech'
  const categoryColor = CATEGORY_COLORS[category] ?? 'bg-primary text-primary-foreground'
  
  const isExternal = Boolean(post.frontmatter.isExternal && post.frontmatter.externalUrl)
  const externalUrl = post.frontmatter.externalUrl
  const platform = post.frontmatter.platform || 'External'
  const platformColor = PLATFORM_COLORS[platform] ?? 'bg-foreground text-background border-border'

  return (
    <article className="border-[4px] border-border bg-card neo-shadow p-6 flex flex-col gap-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all">
      {/* Category, Platform & Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center border-[2.5px] border-border px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${categoryColor}`}>
          {category}
        </span>
        {isExternal && (
          <span className={`inline-flex items-center gap-1 border-[2.5px] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${platformColor}`}>
            {platform}
            <ExternalLink className="h-3 w-3 inline-block stroke-[3]" />
          </span>
        )}
        {post.frontmatter.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center border-[2.5px] border-border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide bg-background text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {isExternal && externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-2"
        >
          <h3 className="font-display font-black text-xl leading-tight tracking-tight group-hover:text-orange transition-colors">
            {post.frontmatter.title}
          </h3>
          <ExternalLink className="h-4 w-4 flex-shrink-0 mt-1 text-muted-foreground group-hover:text-orange transition-colors" />
        </a>
      ) : (
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
          <h3 className="font-display font-black text-xl leading-tight tracking-tight group-hover:text-orange transition-colors">
            {post.frontmatter.title}
          </h3>
        </Link>
      )}

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

        {isExternal && externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-secondary px-1.5 py-1 -mr-1.5 transition-colors text-foreground"
          >
            Read on {platform} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
          </a>
        ) : (
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="font-black text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-secondary px-1.5 py-1 -mr-1.5 transition-colors text-foreground"
          >
            Read <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
          </Link>
        )}
      </div>
    </article>
  )
}
