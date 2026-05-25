import { Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { siteConfig } from '@/lib/seo'
import { footer as footerContent } from '@/lib/siteContent'

export function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', color: '#FFFBF0' }}>
      <div className="mx-auto max-w-[1280px] px-12 pt-16 pb-10">
        {/* 4-column grid */}
        <div
          className="grid gap-8 pb-12"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid rgba(255,251,240,0.2)' }}
        >
          {/* Col 1: Brand + bio + socials */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="flex h-11 w-11 items-center justify-center bg-secondary text-secondary-foreground text-lg font-black"
                style={{ transform: 'rotate(-2deg)', border: '3px solid #FFFBF0' }}
              >
                AK
              </span>
              <span className="font-black text-2xl tracking-tight">Aswin.AK</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[340px] font-medium" style={{ opacity: 0.8 }}>
              {footerContent.tagline}
            </p>
            <div className="flex gap-2 mt-6">
              {[
                { label: 'GH', href: siteConfig.links.github },
                { label: 'LI', href: siteConfig.links.linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center font-black text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  style={{ border: '3px solid #FFFBF0' }}
                >
                  {s.label}
                </a>
              ))}
              <a
                href={`mailto:${footerContent.email}`}
                className="flex h-10 w-10 items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                style={{ border: '3px solid #FFFBF0' }}
              >
                <Mail className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Col 2: Sitemap */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.12em] mb-4" style={{ color: '#FFE500' }}>Sitemap</h4>
            {[
              { label: 'Home', to: '/' },
              { label: 'Projects', to: '/projects' },
              { label: 'Blog', to: '/blog' },
              { label: 'About', to: '/about' },
              { label: 'Services', to: '/services' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm font-medium py-1 transition-colors" style={{ opacity: 0.8 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#FF5C00' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.color = '' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Work */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.12em] mb-4" style={{ color: '#FFE500' }}>Work</h4>
            {['Solutions', 'For Fun', 'Open Source', 'Writing'].map((l) => (
              <a key={l} href="/projects" className="block text-sm font-medium py-1 transition-colors" style={{ opacity: 0.8 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#FF5C00' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.color = '' }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.12em] mb-4" style={{ color: '#FFE500' }}>Contact</h4>
            {[
              { label: footerContent.email, href: `mailto:${footerContent.email}` },
              { label: 'Resume.pdf ↗', href: '/cv.pdf' },
            ].map((l) => (
              <a key={l.href} href={l.href} className="block text-sm font-medium py-1 transition-colors" style={{ opacity: 0.8 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#FF5C00' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.color = '' }}
              >
                {l.label}
              </a>
            ))}
            <Link to="/contact" className="block text-sm font-medium py-1 transition-colors" style={{ opacity: 0.8 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#FF5C00' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.color = '' }}
            >
              Contact form
            </Link>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex justify-between items-center pt-7 font-mono text-xs" style={{ opacity: 0.5 }}>
          <span>© {new Date().getFullYear()} {footerContent.copyright} · All rights reserved.</span>
          <span>Built with {footerContent.builtWith}</span>
        </div>
      </div>
    </footer>
  )
}
