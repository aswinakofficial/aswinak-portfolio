'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ScrollToTopBottomButton({ className }: { className?: string }) {
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight

      // Show button after scrolling past 150px
      if (currentScrollY > 150) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // If near the bottom (within 250px), force direction to 'up' (Scroll to Top)
      if (maxScrollY - currentScrollY < 250) {
        setDirection('up')
      } else if (currentScrollY > lastScrollY + 10) {
        // Scrolling down -> Scroll to Bottom
        setDirection('down')
      } else if (currentScrollY < lastScrollY - 10) {
        // Scrolling up -> Scroll to Top
        setDirection('up')
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollClick = () => {
    if (direction === 'down') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleScrollClick}
      aria-label={direction === 'down' ? 'Scroll to bottom' : 'Scroll to top'}
      title={direction === 'down' ? 'Scroll to bottom' : 'Scroll to top'}
      className={cn(
        'fixed bottom-6 left-6 z-40 bg-card border-[3.5px] border-border text-foreground neo-shadow-lg p-3.5 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:translate-x-[1px] active:translate-y-[1px] brut-pop-in flex items-center justify-center cursor-pointer',
        className
      )}
    >
      {direction === 'down' ? (
        <ArrowDown className="w-5 h-5 text-orange" strokeWidth={3} />
      ) : (
        <ArrowUp className="w-5 h-5 text-blue" strokeWidth={3} />
      )}
    </button>
  )
}
