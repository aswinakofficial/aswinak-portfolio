import { Award } from 'lucide-react'
import { certifications } from '@/lib/siteContent'

export function Certifications() {
  return (
    <section className="border-t-2 border-border py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-black mb-10">Certifications</h2>
        <div className="flex flex-wrap gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.code}
              className="flex-shrink-0 w-full sm:w-auto sm:min-w-[320px] border-2 border-border bg-card neo-shadow flex items-center gap-4 p-5"
            >
              <div className="border-2 border-border bg-secondary p-3 flex-shrink-0">
                <Award className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-black text-sm">{cert.name}</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
