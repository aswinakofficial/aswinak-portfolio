import { Link } from '@tanstack/react-router'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/project'

const CATEGORY_STRIP: Record<string, { bg: string; text: string }> = {
  Solutions: { bg: '#FF5C00', text: '#fff' },
  'Open Source': { bg: '#0047FF', text: '#fff' },
  'For Fun': { bg: '#FFE500', text: '#0A0A0A' },
}

const TILT_DEGREES = [-0.8, 0, 0.8, 0, -0.8, 0.8]

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { frontmatter, slug } = project
  const strip = CATEGORY_STRIP[frontmatter.category] ?? { bg: '#0A0A0A', text: '#fff' }
  const tilt = TILT_DEGREES[index % TILT_DEGREES.length]

  return (
    <article
      className="flex flex-col border-[4px] border-border bg-card neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all"
      style={{ transform: tilt !== 0 ? `rotate(${tilt}deg)` : undefined }}
    >
      {/* Category colour strip */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-[4px] border-border font-black text-xs uppercase tracking-[0.08em]"
        style={{ background: strip.bg, color: strip.text }}
      >
        <span>{frontmatter.category || 'Project'}</span>
        <span className="font-mono font-semibold opacity-70 text-[11px]">{new Date().getFullYear()}</span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display font-black text-xl leading-tight tracking-tight">
          {frontmatter.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground flex-1">
          {frontmatter.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] font-semibold tracking-wider border-[2.5px] border-border px-2 py-0.5 bg-background"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t-[3px] border-border mt-auto">
          <Link
            to="/projects/$slug"
            params={{ slug }}
            className="font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-secondary px-1.5 py-1 -mx-1.5 transition-colors"
          >
            Read case <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
          </Link>
          <div className="flex items-center gap-1">
            {frontmatter.demo && (
              <a
                href={frontmatter.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="flex h-8 w-8 items-center justify-center border-[2.5px] border-border hover:bg-secondary transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {frontmatter.github && (
              <a
                href={frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center border-[2.5px] border-border hover:bg-secondary transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
