import { createFileRoute } from '@tanstack/react-router'
import { Mail, Linkedin, Github } from 'lucide-react'
import { ContactForm } from '@/components/contact/contact-form'
import { buildPageMeta, siteConfig } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: buildPageMeta({
      title: 'Contact',
      description: 'Get in touch with Aswin AK for AI engineering projects, freelance work, or collaboration.',
      slug: 'contact',
    }),
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
        Contact
      </div>
      <h1 className="text-5xl font-black mb-2 leading-tight">Get in touch</h1>
      <p className="text-muted-foreground text-xl font-medium mb-12">
        Open to freelance contracts, consulting, and collaboration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-black mb-6 border-b-2 border-border pb-3">Send a message</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-xl font-black mb-6 border-b-2 border-border pb-3">Other ways to reach me</h2>
          <div className="space-y-3">
            <a
              href={`mailto:007aswinak007@gmail.com`}
              className="flex items-center gap-3 border-2 border-border p-3 neo-shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow hover:bg-accent hover:text-accent-foreground transition-all font-medium"
            >
              <Mail className="h-5 w-5 flex-shrink-0" />
              <span>007aswinak007@gmail.com</span>
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-border p-3 neo-shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow hover:bg-accent hover:text-accent-foreground transition-all font-medium"
            >
              <Linkedin className="h-5 w-5 flex-shrink-0" />
              <span>linkedin.com/in/aswinakofficial</span>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-border p-3 neo-shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow hover:bg-accent hover:text-accent-foreground transition-all font-medium"
            >
              <Github className="h-5 w-5 flex-shrink-0" />
              <span>github.com/aswinakofficial</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
