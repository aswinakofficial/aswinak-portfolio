import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
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
    <section className="brut-dotgrid relative overflow-hidden px-4 sm:px-8 md:px-12 pb-8 pt-8 md:pb-16 md:pt-12 lg:pb-20 lg:pt-16" style={{ maxWidth: '100%' }}>
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 sm:grid-cols-12 landscape:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Bio & Actions */}
        <div className="col-span-1 sm:col-span-7 landscape:col-span-7">
          {/* Cert badge + location */}
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-5">
            <div className="brut-wiggle inline-flex items-center gap-2 border-[3px] border-border bg-secondary text-secondary-foreground px-4 py-1.5 font-black text-sm uppercase tracking-widest neo-shadow-sm">
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
              className="font-display font-black leading-tight text-foreground tracking-[-0.055em] mb-5"
              style={{ fontSize: 'clamp(46px, 6.2vw, 84px)' }}
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
            className="text-base sm:text-lg font-medium text-muted-foreground max-w-[640px] mb-5 leading-relaxed"
          >
            Hey, I'm <strong className="text-foreground font-black">{hero.name}</strong> {hero.tagline}
          </motion.p>

          {/* Role pills */}
          <motion.div {...fadeUpDelay} className="flex flex-wrap gap-2.5 mb-6">
            {hero.rolePills.map(({ label, color }) => (
              <span
                key={label}
                className={`inline-flex items-center px-2.5 py-1 border-[3px] border-border font-bold text-xs uppercase tracking-wide ${color}`}
                style={{ borderRadius: 2 }}
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUpDelay2} className="flex flex-wrap items-center gap-6 mt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 border-[4px] border-border bg-orange text-white font-black text-sm sm:text-base uppercase tracking-wide neo-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            >
              View Projects <ArrowRight className="h-5 w-5" strokeWidth={3} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 border-[4px] border-border bg-secondary text-secondary-foreground font-black text-sm sm:text-base uppercase tracking-wide neo-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            >
              Work With Me <ArrowRight className="h-5 w-5" strokeWidth={3} />
            </Link>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 font-mono text-sm sm:text-base font-black uppercase tracking-wider text-foreground hover:text-orange transition-colors border-b-[4px] border-dashed border-foreground hover:border-orange py-1 px-0.5"
            >
              <FileText className="h-4 w-4" /> View Resume
            </Link>
          </motion.div>
        </div>

        {/* Right column: Photo Card (now visible on all landscape/tablets/desktops, hidden on portrait mobile) */}
        <motion.div
          {...fadeUpDelay2}
          className="hidden landscape:flex sm:flex sm:col-span-5 landscape:col-span-5 relative justify-center items-start pt-6 sm:pt-12 mt-8 sm:mt-0"
        >
          <div
            className="relative border-[6px] border-border bg-yellow neo-shadow max-w-[260px] sm:max-w-[290px] w-full aspect-[4/5] transition-all duration-300 hover:rotate-0 select-none cursor-pointer"
            style={{ transform: 'rotate(-3deg)' }}
          >
            {/* Inner container to clip the photo cutout to the frame bounds */}
            <div className="w-full h-full overflow-hidden flex items-end justify-center">
              <img
                src="/aswin.png"
                alt="Aswin AK"
                className="max-h-full max-w-full object-contain object-bottom select-none pointer-events-none"
              />
            </div>

            {/* Overlaid stickers floating strictly outside the frame boundaries (hidden on xs mobile to prevent horizontal scroll overflow) */}
            <motion.div
              className="absolute -top-10 -left-12 hidden sm:block border-[4px] border-border bg-blue text-white px-3 py-2 font-black text-xs uppercase neo-shadow truncate max-w-[220px] pointer-events-none font-sans"
              animate={{ rotate: [-6, -3, -7, -5] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
            >
              💼 {hero.stickerAvailability}
            </motion.div>

            <motion.div
              className="absolute bottom-20 -right-24 hidden sm:block border-[4px] border-border bg-orange text-white px-3 py-2 font-black text-xs uppercase neo-shadow truncate max-w-[180px] pointer-events-none"
              animate={{ rotate: [4, 8, 3, 5] }}
              transition={{ repeat: Infinity, duration: 5.1, ease: "easeInOut" }}
            >
              🚀 {hero.stickerCurrent}
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 hidden sm:block border-[4px] border-border bg-card text-foreground px-3 py-2 font-black text-xs uppercase neo-shadow pointer-events-none"
              animate={{ rotate: [-4, -1, -5, -3] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
            >
              🤖 RAG Architect
            </motion.div>

            <motion.div
              className="absolute top-1/3 -right-20 hidden sm:block border-[4px] border-border bg-green text-black dark:text-white px-3 py-2 font-black text-xs uppercase neo-shadow pointer-events-none"
              animate={{ rotate: [8, 5, 10, 7] }}
              transition={{ repeat: Infinity, duration: 4.7, ease: "easeInOut" }}
            >
              ⚡ AI Builder
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
