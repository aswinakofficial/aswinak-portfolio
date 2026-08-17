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
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.instagram],
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            name: 'Microsoft Certified: Azure AI Engineer Associate',
            credentialCategory: 'professional certification',
            recognizedBy: { '@type': 'Organization', name: 'Microsoft' },
            url: 'https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/',
          },
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: siteConfig.title,
          url: siteConfig.url,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '.hero-tagline', '.hire-cta-headline'],
          },
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
