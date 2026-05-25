import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buildPageMeta, buildCanonicalLink, siteConfig } from '@/lib/seo'
import { faqs } from '@/lib/siteContent'
import { useState } from 'react'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      ...buildPageMeta({
        title: 'Services',
        description: 'AI engineering services — RAG systems, Agentic AI, LLM orchestration, and full-stack development.',
        slug: 'services',
      }),
      { name: 'keywords', content: 'RAG system design, agentic AI workflows, LLM orchestration, AI engineering consulting, LangChain, N8N' },
    ],
    links: [buildCanonicalLink('services')],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: `${siteConfig.name} — AI Engineering Services`,
          url: `${siteConfig.url}/services`,
          description: 'AI engineering services including RAG system design, Agentic AI workflows, LLM orchestration, and full-stack development.',
          provider: {
            '@type': 'Person',
            name: siteConfig.name,
            url: siteConfig.url,
          },
          serviceType: ['RAG System Design', 'Agentic AI Workflows', 'LLM Orchestration', 'Full-Stack Development'],
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
})

const services = [
  {
    title: 'RAG System Design',
    description: 'End-to-end retrieval-augmented generation pipelines that handle millions of documents.',
    features: ['Document ingestion pipeline', 'Vector database setup', 'LLM orchestration', 'Evaluation & testing'],
  },
  {
    title: 'Agentic AI Workflows',
    description: 'Multi-agent systems and automated workflows using LangChain, N8N, and custom tooling.',
    features: ['Tool-augmented agents', 'Multi-step reasoning', 'Human-in-the-loop design', 'N8N automation'],
  },
  {
    title: 'Full-Stack AI Apps',
    description: 'Production-ready web applications with AI features — React frontend + Python/Node.js backend.',
    features: ['Modern React UI', 'FastAPI / Node.js backend', 'Azure deployment', 'CI/CD setup'],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b-2 border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left font-black text-base hover:text-secondary-foreground transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  )
}

function ServicesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
        Services
      </div>
      <h1 className="text-5xl font-black mb-2 leading-tight">What I Build</h1>
      <p className="text-muted-foreground text-xl font-medium mb-12">
        Open to freelance contracts and consulting engagements.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg transition-all">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-secondary-foreground bg-secondary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-black mb-6 border-b-2 border-border pb-3">Frequently Asked Questions</h2>
        <div className="border-2 border-border neo-shadow px-6">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </div>
  )
}
