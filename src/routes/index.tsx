import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/home/hero'
import { Skills } from '@/components/home/skills'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { LatestPosts } from '@/components/home/latest-posts'
import { HireCta } from '@/components/home/hire-cta'
import { buildPageMeta, buildCanonicalLink, siteConfig } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...buildPageMeta({}),
      {
        name: 'keywords',
        content: 'AI Engineer, RAG, LangChain, Azure, Full-Stack Developer, Agentic AI',
      },
    ],
    links: [buildCanonicalLink()],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.name,
          jobTitle: 'AI Engineer & Full-Stack Developer',
          url: siteConfig.url,
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
        }),
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <FeaturedProjects />
      <LatestPosts />
      <HireCta />
    </>
  )
}
