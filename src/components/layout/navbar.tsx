import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
] as const

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[4px] border-border bg-background">
      <div className="mx-auto flex h-[66px] max-w-[1280px] items-center px-4 sm:px-8 md:px-12">
        {/* Logomark + wordmark */}
        <Link to="/" className="mr-8 flex items-center gap-2.5 shrink-0">
          <span
            className="flex h-9 w-9 items-center justify-center bg-foreground text-background text-sm font-black"
            style={{ transform: 'rotate(-2deg)' }}
          >
            AK
          </span>
          <span className="font-black text-xl tracking-tight">
            Aswin<span className="opacity-50">.</span>AK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 items-center gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 text-sm font-bold border-[3px] border-transparent hover:border-border hover:bg-secondary hover:text-secondary-foreground transition-all [&.active]:border-border [&.active]:bg-foreground [&.active]:text-background"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />

          {/* Hire Me CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-wide bg-orange text-white border-[3px] border-border neo-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow transition-all"
          >
            Hire Me
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center h-10 w-10 border-[3px] border-border hover:bg-secondary transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 border-l-[4px] border-border bg-background">
              <nav className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-2.5 text-base font-bold border-[3px] border-transparent hover:border-border hover:bg-secondary hover:text-secondary-foreground transition-all [&.active]:border-border [&.active]:bg-foreground [&.active]:text-background"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="mt-4 flex items-center justify-center px-4 py-3 text-sm font-black uppercase tracking-wide bg-orange text-white border-[3px] border-border neo-shadow-sm"
                >
                  Hire Me
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
