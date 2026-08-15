import type { Post, PostFrontmatter } from '@/types/post'
import type { Project, ProjectFrontmatter } from '@/types/project'

function calcReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function formatReadingTime(customReadingTime?: string, rawContent?: string): string {
  if (customReadingTime && customReadingTime.trim()) {
    const trimmed = customReadingTime.trim()
    if (/^\d+$/.test(trimmed)) {
      return `${trimmed} min read`
    }
    return trimmed
  }
  return calcReadingTime(rawContent || '')
}

// Eager glob — MDX files bundled at build time, available as a keyed record
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postModules = import.meta.glob('/src/content/blog/*.mdx', { eager: true }) as Record<string, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projectModules = import.meta.glob('/src/content/projects/*.mdx', { eager: true }) as Record<string, any>

// Serializable post metadata — safe to return from loaders
export type PostMeta = Omit<Post, 'module'>

// Serializable project metadata — safe to return from loaders
export type ProjectMeta = Omit<Project, 'module'>

export function getAllPosts(): PostMeta[] {
  return Object.entries(postModules)
    .map(([path, module]) => {
      const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''
      const rawContent = typeof module.rawContent === 'string' ? module.rawContent : ''
      const frontmatter = module.frontmatter as PostFrontmatter
      return {
        slug,
        frontmatter,
        readingTime: formatReadingTime(frontmatter?.readingTime, rawContent),
      }
    })
    .filter((p) => p.frontmatter?.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    )
}

export function getPostBySlug(slug: string): PostMeta | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}

export function getPostsByCategory(category: string): PostMeta[] {
  const posts = getAllPosts()
  if (!category || category === 'All') return posts
  return posts.filter((p) => (p.frontmatter.category || 'Tech').toLowerCase() === category.toLowerCase())
}

export function getAllProjects(): ProjectMeta[] {
  return Object.entries(projectModules)
    .map(([path, module]) => {
      const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''
      return {
        slug,
        frontmatter: module.frontmatter as ProjectFrontmatter,
      }
    })
    .filter((p) => p.frontmatter?.title)
}

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.frontmatter.featured)
}

// Return the MDX component for a given slug — NOT for use in loaders
export function getPostModule(slug: string) {
  const key = `/src/content/blog/${slug}.mdx`
  return postModules[key] ?? null
}

export function getProjectModule(slug: string) {
  const key = `/src/content/projects/${slug}.mdx`
  return projectModules[key] ?? null
}
