import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hero } from '@/lib/siteContent'

const SPARKLE = '✦'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => { setMounted(true) }, [])

  const fadeUp = mounted && !shouldReduceMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } }
    : {}

  const fadeUpDelay = mounted && !shouldReduceMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.12 } }
    : {}

  const fadeUpDelay2 = mounted && !shouldReduceMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.24 } }
    : {}

  return (
    <section className="brut-dotgrid relative overflow-hidden px-4 sm:px-8 md:px-12 pb-16 pt-12 md:pb-28 md:pt-20" style={{ maxWidth: '100%' }}>
      {/* Corner stickers */}
      <div
        className="absolute hidden xl:block top-24 right-44 border-[4px] border-border bg-blue text-white px-4 py-3 font-black text-sm uppercase leading-snug neo-shadow"
        style={{ transform: 'rotate(6deg)' }}
      >
        {hero.stickerAvailability}
      </div>
      <div
        className="absolute hidden xl:block top-52 right-14 border-[4px] border-border bg-card text-foreground px-4 py-3 font-bold text-sm leading-snug neo-shadow-sm"
        style={{ transform: 'rotate(-4deg)' }}
      >
        <div className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">currently</div>
        <div>{hero.stickerCurrent}</div>
      </div>

      <div className="mx-auto max-w-[1280px]">
        {/* Cert badge + location */}
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-8">
          <div className="brut-wiggle inline-flex items-center gap-2 border-[3px] border-border bg-secondary text-secondary-foreground px-4 py-2 font-black text-sm uppercase tracking-widest neo-shadow-sm">
            <span>{SPARKLE}</span>
            {hero.certBadge}
            <span>{SPARKLE}</span>
          </div>
          <span className="hidden sm:block font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            — {hero.location}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUpDelay}>
          <h1
            className="font-display font-black leading-tight text-foreground tracking-[-0.055em] mb-8"
            style={{ fontSize: 'clamp(60px, 9vw, 120px)' }}
          >
            Building{' '}
            <em className="hero-em">AI</em>
            {' '}that
            <br />
            <span className="hero-underline">actually</span>
            {' '}works.
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          {...fadeUpDelay}
          className="text-lg sm:text-xl font-medium text-muted-foreground max-w-[640px] mb-8 leading-relaxed"
        >
          I'm <strong className="text-foreground font-black">{hero.name}</strong> {hero.tagline}
        </motion.p>

        {/* Role pills */}
        <motion.div {...fadeUpDelay} className="flex flex-wrap gap-2.5 mb-11">
          {hero.rolePills.map(({ label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center px-3 py-1.5 border-[3px] border-border font-bold text-sm uppercase tracking-wide ${color}`}
              style={{ borderRadius: 2 }}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUpDelay2} className="flex flex-wrap items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 px-7 py-4 border-[4px] border-border bg-orange text-white font-black text-base uppercase tracking-wide neo-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          >
            View Projects <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 border-[4px] border-border bg-secondary text-secondary-foreground font-black text-base uppercase tracking-wide neo-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          >
            Hire Me <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </Link>
          <Link
            to="/contact"
            className="font-mono text-sm font-semibold underline underline-offset-4 decoration-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            or book a 20-min intro ↗
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
