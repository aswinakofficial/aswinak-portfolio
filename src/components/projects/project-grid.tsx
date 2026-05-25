import { useState } from 'react'
import { ProjectCard } from './project-card'
import { ProjectFilter } from './project-filter'
import type { Project } from '@/types/project'

type Category = 'All' | 'Solutions' | 'Open Source' | 'For Fun'

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Category>('All')

  const counts = {
    All: projects.length,
    Solutions: projects.filter((p) => p.frontmatter.category === 'Solutions').length,
    'Open Source': projects.filter((p) => p.frontmatter.category === 'Open Source').length,
    'For Fun': projects.filter((p) => p.frontmatter.category === 'For Fun').length,
  }

  const filtered = selected === 'All'
    ? projects
    : projects.filter((p) => p.frontmatter.category === selected)

  return (
    <div>
      <ProjectFilter
        selected={selected}
        onSelect={setSelected}
        counts={counts}
        total={projects.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center border-[4px] border-dashed border-border font-display font-black text-xl text-muted-foreground">
            Nothing here yet. Try another filter.
          </div>
        )}
      </div>
    </div>
  )
}
