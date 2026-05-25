import { createFileRoute, notFound } from '@tanstack/react-router'
import { getProjectBySlug, getProjectModule } from '@/lib/content'
import { MdxComponents } from '@/components/blog/mdx-components'
import { buildPageMeta, siteConfig } from '@/lib/seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) throw notFound()
    // Return only serializable data — not the MDX module
    return project
  },
  head: ({ loaderData: project }) => {
    if (!project) return {}
    return {
      meta: [
        ...buildPageMeta({
          title: project.frontmatter.title,
          description: project.frontmatter.description,
          slug: `projects/${project.slug}`,
        }),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.frontmatter.title,
            description: project.frontmatter.description,
            author: { '@type': 'Person', name: siteConfig.name },
            url: `${siteConfig.url}/projects/${project.slug}`,
          }),
        },
      ],
    }
  },
  notFoundComponent: () => (
    <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-2">Project not found</h1>
      <p className="text-muted-foreground">This project doesn't exist or has been removed.</p>
    </div>
  ),
  component: ProjectPage,
})

function ProjectPage() {
  const project = Route.useLoaderData()
  const module = getProjectModule(project.slug)
  const ProjectContent = module?.default

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">{project.frontmatter.title}</h1>
        <p className="text-muted-foreground text-xl font-medium mb-6">{project.frontmatter.description}</p>
        <div className="flex gap-3 border-t-2 border-border pt-5">
          {project.frontmatter.demo && (
            <Button asChild variant="outline" size="sm">
              <a href={project.frontmatter.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.frontmatter.github && (
            <Button asChild variant="secondary" size="sm">
              <a href={project.frontmatter.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {ProjectContent ? <ProjectContent components={MdxComponents} /> : <p>Content not found.</p>}
      </div>
    </article>
  )
}
