export const siteConfig = {
  name: 'Aswin AK',
  title: 'Aswin AK — AI Engineer & Full-Stack Developer',
  description:
    'AI Engineer specializing in RAG pipelines, Agentic AI, LLM orchestration, and full-stack development. Azure AI-102 certified.',
  url: 'https://aswin.xpar.in',
  ogImage: 'https://aswin.xpar.in/og-default.png',
  links: {
    github: 'https://github.com/aswinakofficial',
    linkedin: 'https://linkedin.com/in/aswinakofficial',
    instagram: 'https://www.instagram.com/aswin._.a_k/',
  },
}

export function buildPageMeta(options: {
  title?: string
  description?: string
  slug?: string
  image?: string
  type?: 'website' | 'article'
}) {
  const title = options.title
    ? `${options.title} — ${siteConfig.name}`
    : siteConfig.title
  const description = options.description ?? siteConfig.description
  const url = options.slug ? `${siteConfig.url}/${options.slug}` : siteConfig.url
  const image = options.image ?? siteConfig.ogImage

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:type', content: options.type ?? 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
}

export function buildCanonicalLink(slug?: string) {
  const href = slug ? `${siteConfig.url}/${slug}` : siteConfig.url
  return { rel: 'canonical', href }
}
