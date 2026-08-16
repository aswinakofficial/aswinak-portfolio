export interface PostFrontmatter {
  title: string
  description: string
  publishedAt: string
  tags: string[]
  slug: string
  category?: 'Tech' | 'Travel' | string
  updatedAt?: string
  readingTime?: string
  isExternal?: boolean
  externalUrl?: string
  platform?: string
  photos?: Array<{
    src: string
    alt?: string
    caption?: string
    location?: string
    date?: string
    rotation?: string
    tapeColor?: 'yellow' | 'orange' | 'blue' | 'green' | 'pink' | 'purple' | 'red' | 'cyan' | 'black' | 'none'
  }>
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
}
