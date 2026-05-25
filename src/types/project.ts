export interface ProjectFrontmatter {
  title: string
  description: string
  category: string
  tags: string[]
  featured: boolean
  demo: string | null
  github: string | null
  slug: string
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}
