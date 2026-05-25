import { createFileRoute } from '@tanstack/react-router'
import { getAllProjects } from '@/lib/content'
import { ProjectGrid } from '@/components/projects/project-grid'
import { buildPageMeta } from '@/lib/seo'

export const Route = createFileRoute('/projects/')({
  loader: () => getAllProjects(),
  head: () => ({
    meta: buildPageMeta({
      title: 'Projects',
      description: 'AI systems, RAG pipelines, and full-stack applications built by Aswin AK.',
      slug: 'projects',
    }),
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const projects = Route.useLoaderData()

  return (
    <div>
      {/* Page header */}
      <section className="border-b-[4px] border-border px-12 pb-16 pt-20" style={{ backgroundImage: 'linear-gradient(to right, rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }}>
        <div className="mx-auto max-w-[1280px]">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-5">
            ▸ /projects · {projects.length} total · 2023 — present
          </p>
          <h1
            className="font-display font-black leading-[0.95] tracking-[-0.055em] max-w-[980px] mb-6"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            Every shippable thing<br />
            I've put my{' '}
            <em
              className="not-italic px-3 inline-block"
              style={{ background: '#FF5C00', color: '#fff', transform: 'rotate(-1deg)', display: 'inline-block' }}
            >
              name on
            </em>
            .
          </h1>
          <p className="text-lg font-medium text-muted-foreground max-w-[640px] leading-relaxed">
            Filter by category. Solutions = client work. Open Source = stuff I gave away. For Fun = things I built at 1am because I couldn't sleep.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-12 py-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}
