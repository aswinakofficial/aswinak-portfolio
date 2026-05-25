import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { hireCta } from '@/lib/siteContent'

export function HireCta() {
  return (
    <section className="hire-cta-section relative overflow-hidden border-t-[5px] border-b-[5px] border-border py-16">
      {/* Dark stripes on cream (light mode) */}
      <div className="brut-stripes dark:hidden absolute inset-0 pointer-events-none" />
      {/* Light stripes on black (dark mode) */}
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent 0, transparent 18px, rgba(255,251,240,0.04) 18px, rgba(255,251,240,0.04) 22px)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <span className="hire-cta-badge inline-flex items-center gap-2 border-[3px] px-3 py-1.5 font-black text-xs uppercase tracking-widest mb-5">
              {hireCta.availabilityLabel}
            </span>
            <h2
              className="hire-cta-headline font-display font-black leading-[0.95] tracking-[-0.04em] max-w-[760px]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
            >
              {hireCta.headline}<br />{hireCta.headlineLine2}
            </h2>
            <p className="hire-cta-body text-lg font-medium leading-relaxed max-w-[580px] mt-4">
              {hireCta.description}
            </p>
          </div>

          <div className="flex flex-col gap-3.5 lg:items-end flex-shrink-0">
            <Link
              to="/contact"
              className="hire-cta-primary-btn inline-flex items-center gap-2.5 px-8 py-5 border-[4px] font-black text-lg uppercase tracking-wide hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            >
              Start a project <ArrowRight className="h-5 w-5" strokeWidth={3} />
            </Link>
            <a
              href={`mailto:${hireCta.email}`}
              className="hire-cta-email-btn inline-flex items-center justify-center px-6 py-3.5 border-[4px] bg-transparent font-black text-sm uppercase tracking-wide hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            >
              {hireCta.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
