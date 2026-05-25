export interface PostFrontmatter {
  title: string
  description: string
  publishedAt: string
  tags: string[]
  slug: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
}
