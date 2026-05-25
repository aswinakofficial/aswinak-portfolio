import { createFileRoute } from '@tanstack/react-router'
import { buildPageMeta, buildCanonicalLink, siteConfig } from '@/lib/seo'
import { about } from '@/lib/siteContent'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: buildPageMeta({
      title: 'About',
      description: 'Learn more about Aswin AK — AI Engineer, Full-Stack Developer, and Azure AI-102 certified professional.',
      slug: 'about',
    }),
    links: [buildCanonicalLink('about')],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.name,
          jobTitle: 'AI Engineer & Full-Stack Developer',
          url: siteConfig.url,
          description: 'AI Engineer specializing in RAG pipelines, Agentic AI, and LLM orchestration. Azure AI-102 certified.',
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
        }),
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
        About
      </div>
      <h1 className="text-5xl font-black mb-4 leading-tight">{about.headline}</h1>
      <p className="text-muted-foreground text-xl font-medium mb-12">
        {about.subheadline}
      </p>

      <section className="mb-12 border-2 border-border p-6 neo-shadow prose prose-neutral dark:prose-invert max-w-none">
        {about.bio.map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed">{paragraph}</p>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 border-b-2 border-border pb-3">Experience</h2>
        <div className="space-y-0 divide-y-2 divide-border border-2 border-border neo-shadow">
          {about.experience.map((entry) => (
            <div key={entry.title} className="flex gap-4 p-5">
              <div className="flex-shrink-0 w-3 h-3 bg-secondary border-2 border-border mt-1.5" />
              <div>
                <h3 className="font-black">{entry.title}</h3>
                <p className="text-sm text-muted-foreground font-medium">{entry.period}</p>
                <p className="mt-1 text-muted-foreground text-sm">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
