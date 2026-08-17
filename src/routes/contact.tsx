import { createFileRoute } from '@tanstack/react-router'
import { Mail, Linkedin, Github, Instagram } from 'lucide-react'
import { buildPageMeta, buildCanonicalLink, siteConfig } from '@/lib/seo'
import { footer as footerContent } from '@/lib/siteContent'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: buildPageMeta({
      title: 'Contact',
      description: 'Get in touch with Aswin AK — AI engineer & full-stack developer open to new roles and opportunities.',
      slug: 'contact',
    }),
    links: [buildCanonicalLink('contact')],
  }),
  component: ContactPage,
})

function ContactPage() {
  const contactEmail = footerContent.email || 'aswin@xpar.in'

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
        Contact
      </div>
      <h1 className="text-5xl font-black mb-4 leading-tight">Get in touch</h1>
      <p className="text-muted-foreground text-xl font-medium mb-12 max-w-xl mx-auto">
        Looking for my next opportunity. Whether you're a recruiter or an engineering team, feel free to reach out directly through any of the channels below.
      </p>

      <div className="max-w-md mx-auto space-y-4 text-left">
        <a
          href={`mailto:${contactEmail}`}
          className="flex items-center gap-4 border-4 border-border p-4 bg-background neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg hover:bg-orange hover:text-white transition-all font-black text-lg"
        >
          <Mail className="h-6 w-6 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">Email Me</div>
            <span>{contactEmail}</span>
          </div>
        </a>

        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-4 border-border p-4 bg-background neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg hover:bg-blue hover:text-white transition-all font-black text-lg"
        >
          <Linkedin className="h-6 w-6 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">LinkedIn</div>
            <span>linkedin.com/in/aswinakofficial</span>
          </div>
        </a>

        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-4 border-border p-4 bg-background neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg hover:bg-foreground hover:text-background transition-all font-black text-lg"
        >
          <Github className="h-6 w-6 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">GitHub</div>
            <span>github.com/aswinakofficial</span>
          </div>
        </a>

        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-4 border-border p-4 bg-background neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg hover:bg-[#E4405F] hover:text-white transition-all font-black text-lg"
        >
          <Instagram className="h-6 w-6 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">Instagram</div>
            <span>instagram.com/aswin._.a_k</span>
          </div>
        </a>
      </div>
    </div>
  )
}
