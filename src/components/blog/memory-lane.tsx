'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { X, Pin, Camera, Images } from 'lucide-react'

export function StickyMemoryLaneColumn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stickyTop, setStickyTop] = useState<string>('7rem')

  useEffect(() => {
    const updateStickyTop = () => {
      if (!containerRef.current) return
      const elHeight = containerRef.current.offsetHeight
      const vh = window.innerHeight
      const topMargin = 112 // 7rem (112px)
      const bottomMargin = 32 // 2rem (32px)

      if (elHeight > vh - topMargin) {
        const calculatedTop = vh - elHeight - bottomMargin
        setStickyTop(`${calculatedTop}px`)
      } else {
        setStickyTop(`${topMargin}px`)
      }
    }

    updateStickyTop()

    const resizeObserver = new ResizeObserver(updateStickyTop)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    window.addEventListener('resize', updateStickyTop)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStickyTop)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'sticky', top: stickyTop }}
    >
      {children}
    </div>
  )
}

export interface MemoryPhoto {
  src: string
  alt?: string
  caption?: string
  location?: string
  date?: string
  rotation?: string
  tapeColor?: 'yellow' | 'orange' | 'blue' | 'green' | 'pink' | 'purple' | 'red' | 'cyan' | 'black' | 'none'
  originalIndex?: number
}

interface MemoryLaneProps {
  photos?: MemoryPhoto[]
  className?: string
  side?: 'left' | 'right' | 'both'
  stagger?: boolean
}



const ROTATIONS = ['-5deg', '4.5deg', '-4deg', '5deg', '-3.5deg', '4deg']
const SWAY_DURATIONS = ['8.5s', '10.2s', '9.0s', '11.5s', '9.8s', '12.0s']
const SWAY_DELAYS = ['0s', '1.5s', '3.0s', '0.8s', '2.2s', '4.0s']

const TAPES: Array<'yellow' | 'orange' | 'blue' | 'green' | 'pink' | 'purple' | 'red' | 'cyan' | 'black'> = [
  'yellow',
  'orange',
  'blue',
  'green',
  'pink',
  'purple',
  'red',
  'cyan',
  'black',
]

const TAPE_CLASSES: Record<string, string> = {
  yellow: 'bg-secondary text-foreground',
  orange: 'bg-orange text-white',
  blue: 'bg-blue text-white',
  green: 'bg-[#00D26A] text-black',
  pink: 'bg-[#FF007A] text-white',
  purple: 'bg-[#7000FF] text-white',
  red: 'bg-[#FF2E2E] text-white',
  cyan: 'bg-[#00E5FF] text-black',
  black: 'bg-foreground text-background',
}

// Vertical offsets to create organic Z-pattern gaps between left and right sidebars
const Z_OFFSETS_LEFT = ['mt-0', 'mt-28', 'mt-36', 'mt-32']
const Z_OFFSETS_RIGHT = ['mt-24', 'mt-32', 'mt-40', 'mt-36']

export function MemoryPhotoCard({
  photo,
  index,
  onOpen,
  extraClass,
}: {
  photo: MemoryPhoto
  index: number
  onOpen: (p: MemoryPhoto) => void
  extraClass?: string
}) {
  const displayIndex = photo.originalIndex !== undefined ? photo.originalIndex : index
  const rot = photo.rotation || ROTATIONS[displayIndex % ROTATIONS.length]
  const tape = photo.tapeColor || TAPES[displayIndex % TAPES.length]

  const tapeBg = TAPE_CLASSES[tape] || TAPE_CLASSES.yellow
  const rotNum = parseFloat(rot.replace('deg', '')) || 0
  const swayDuration = SWAY_DURATIONS[displayIndex % SWAY_DURATIONS.length]
  const swayDelay = SWAY_DELAYS[displayIndex % SWAY_DELAYS.length]

  return (
    <div
      onClick={() => onOpen(photo)}
      className={cn(
        'relative group cursor-pointer transition-transform duration-300 ease-out hover:z-30',
        extraClass
      )}
      style={
        {
          '--sway-min': `${rotNum - 0.4}deg`,
          '--sway-max': `${rotNum + 0.4}deg`,
          animation: `memoryWindSway ${swayDuration} ease-in-out ${swayDelay} infinite alternate`,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.animationPlayState = 'paused'
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.07)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.animationPlayState = 'running'
        e.currentTarget.style.transform = ''
      }}
    >
      {/* Tape Accent */}
      {tape !== 'none' && (
        <div
          className={cn(
            'absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 border-[2px] border-border font-mono text-[9px] font-black uppercase tracking-widest neo-shadow-sm pointer-events-none select-none',
            tapeBg
          )}
          style={{ transform: 'rotate(-2deg)' }}
        >
          <Pin className="w-2.5 h-2.5 inline mr-1" />
          SNAP #{displayIndex + 1}
        </div>
      )}

      {/* Polaroid Frame */}
      <div className="border-[3.5px] border-border bg-card p-3 neo-shadow hover:neo-shadow-lg transition-shadow">
        {/* Photo Container */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden border-[2px] border-border">
          <img
            src={photo.src}
            alt={photo.alt || photo.caption || `Memory photo ${displayIndex + 1}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Caption & Metadata */}
        {(photo.caption || photo.location || photo.date) && (
          <div className="pt-2.5 text-center font-mono text-[11px] font-bold text-foreground leading-snug">
            {photo.caption && <p className="line-clamp-2">{photo.caption}</p>}
            {(photo.location || photo.date) && (
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">
                {photo.location} {photo.location && photo.date ? '•' : ''} {photo.date}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function CurvedConnectorLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'absolute left-1/2 -translate-x-1/2 w-12 text-foreground dark:text-white pointer-events-none z-0 opacity-80',
        className
      )}
      style={{
        animation: 'connectorWaveSway 10s ease-in-out infinite alternate',
      }}
      viewBox="0 0 40 1000"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M 20 0 C 40 125, 0 250, 20 375 C 40 500, 0 625, 20 750 C 40 875, 0 1000, 20 1000"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MemoryLane({
  photos = [],
  className,
  side,
  stagger = true,
}: MemoryLaneProps) {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null)

  if (!photos || photos.length === 0) return null

  const offsets = side === 'left' ? Z_OFFSETS_LEFT : Z_OFFSETS_RIGHT

  return (
    <>
      <aside className={cn('space-y-12', className)}>
        {/* Collage Snaps with Z-pattern offsets & curved connector line */}
        <div className="relative flex flex-col gap-12">
          {photos.length > 1 && (
            <CurvedConnectorLine className="top-8 bottom-8 h-[calc(100%-4rem)]" />
          )}
          {photos.map((photo, index) => {
            const gapClass = stagger ? offsets[index % offsets.length] : ''
            return (
              <MemoryPhotoCard
                key={index}
                photo={photo}
                index={index}
                extraClass={gapClass}
                onOpen={setActivePhoto}
              />
            )
          })}
        </div>
      </aside>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative border-[5px] border-border bg-card p-4 sm:p-6 max-w-2xl w-full neo-shadow-xl brut-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-4 -right-4 p-2 bg-orange text-white border-[3px] border-border font-black neo-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>

            <div className="relative aspect-[16/10] sm:aspect-video bg-muted overflow-hidden border-[3px] border-border mb-4">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt || activePhoto.caption || 'Expanded photo'}
                className="w-full h-full object-cover"
              />
            </div>

            {activePhoto.caption && (
              <p className="font-mono text-sm font-bold text-foreground mb-1">{activePhoto.caption}</p>
            )}
            {(activePhoto.location || activePhoto.date) && (
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {activePhoto.location} {activePhoto.location && activePhoto.date ? '•' : ''} {activePhoto.date}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export function MobileMemoryLaneOverlay({ photos = [] }: { photos?: MemoryPhoto[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null)

  if (!photos || photos.length === 0) return null

  return (
    <>
      {/* Floating Trigger Button (Mobile Only) */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-orange text-white border-[3.5px] border-border neo-shadow-lg px-4 py-3 font-mono text-xs font-black uppercase tracking-wider hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:translate-x-[1px] active:translate-y-[1px]"
          aria-label="Open Memory Lane"
        >
          <Camera className="w-4 h-4 text-white" strokeWidth={2.5} />
          <span>Memory Lane ({photos.length})</span>
        </button>
      </div>

      {/* Full-Screen Overlay Modal with Smooth Scroll */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto brut-pop-in">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b-[4px] border-border px-6 py-4 flex items-center justify-between neo-shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange text-white border-[2.5px] border-border">
                <Images className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-display font-black text-base uppercase tracking-tight text-foreground">Memory Lane</h2>
                <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase">{photos.length} Captured Snaps</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-orange text-white border-[2.5px] border-border font-black neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              aria-label="Close Memory Lane"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>

          {/* Photo Gallery Stream */}
          <div className="relative px-4 py-10 max-w-[300px] sm:max-w-sm mx-auto space-y-14 pb-24">
            {photos.length > 1 && (
              <CurvedConnectorLine className="top-14 bottom-24 h-[calc(100%-9rem)]" />
            )}
            {photos.map((photo, index) => (
              <MemoryPhotoCard
                key={index}
                photo={photo}
                index={index}
                onOpen={setActivePhoto}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal when photo clicked inside mobile overlay */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative border-[5px] border-border bg-card p-4 sm:p-6 max-w-2xl w-full neo-shadow-xl brut-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-4 -right-4 p-2 bg-orange text-white border-[3px] border-border font-black neo-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>

            <div className="relative aspect-[4/3] bg-muted overflow-hidden border-[3px] border-border mb-4">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt || activePhoto.caption || 'Expanded photo'}
                className="w-full h-full object-cover"
              />
            </div>

            {activePhoto.caption && (
              <p className="font-mono text-sm font-bold text-foreground mb-1">{activePhoto.caption}</p>
            )}
            {(activePhoto.location || activePhoto.date) && (
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {activePhoto.location} {activePhoto.location && activePhoto.date ? '•' : ''} {activePhoto.date}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
