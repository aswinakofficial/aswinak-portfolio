'use client'

import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'

export interface BlogImageProps {
  src: string
  alt?: string
  caption?: string
  badge?: string
  rotation?: '-3deg' | '-2deg' | '-1deg' | '0deg' | '1deg' | '2deg' | '3deg' | string
  tapeColor?: 'yellow' | 'orange' | 'blue' | 'green' | 'pink' | 'purple' | 'red' | 'cyan' | 'black' | 'none'
  className?: string
  aspectRatio?: 'square' | 'video' | 'auto'
}

const TAPE_STYLES: Record<string, string> = {
  yellow: 'bg-secondary text-foreground border-border',
  orange: 'bg-orange text-white border-foreground',
  blue: 'bg-blue text-white border-foreground',
  green: 'bg-[#00D26A] text-black border-foreground',
  pink: 'bg-[#FF007A] text-white border-foreground',
  purple: 'bg-[#7000FF] text-white border-foreground',
  red: 'bg-[#FF2E2E] text-white border-foreground',
  cyan: 'bg-[#00E5FF] text-black border-foreground',
  black: 'bg-foreground text-background border-border',
  none: 'hidden',
}

export function BlogImage({
  src,
  alt = '',
  caption,
  badge,
  rotation = '0deg',
  tapeColor = 'yellow',
  className,
  aspectRatio = 'auto',
}: BlogImageProps) {
  const tapeClass = TAPE_STYLES[tapeColor] ?? TAPE_STYLES.yellow

  return (
    <figure
      className={cn('relative my-8 group', className)}
      style={{ transform: rotation !== '0deg' ? `rotate(${rotation})` : undefined }}
    >
      {/* Neobrutalist Tape Sticker Accent */}
      {tapeColor !== 'none' && (
        <div
          className={cn(
            'absolute -top-3.5 left-6 z-10 px-4 py-1 border-[2.5px] font-mono text-[10px] font-black uppercase tracking-widest neo-shadow-sm select-none',
            tapeClass
          )}
          style={{ transform: 'rotate(-4deg)' }}
        >
          {badge || 'PHOTO'}
        </div>
      )}

      {/* Frame Container */}
      <div className="border-[4px] border-border bg-card neo-shadow-lg overflow-hidden transition-all duration-200 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:neo-shadow-xl">
        <div
          className={cn(
            'relative overflow-hidden bg-muted flex items-center justify-center',
            aspectRatio === 'square' && 'aspect-square',
            aspectRatio === 'video' && 'aspect-video'
          )}
        >
          <img
            src={src}
            alt={alt || caption || 'Blog image'}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            onError={(e) => {
              // Fallback placeholder if image link is broken
              const target = e.currentTarget
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.classList.add('py-12', 'px-6')
                const fallback = document.createElement('div')
                fallback.className = 'flex flex-col items-center gap-2 text-muted-foreground font-mono text-xs font-bold'
                fallback.innerHTML = `<svg class="w-8 h-8 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>${alt || 'Image Preview'}</span>`
                parent.appendChild(fallback)
              }
            }}
          />
        </div>

        {/* Caption bar */}
        {caption && (
          <figcaption className="border-t-[3px] border-border bg-card px-4 py-3 font-mono text-xs font-bold text-foreground flex items-center gap-2.5">
            <Camera className="w-4 h-4 text-orange flex-shrink-0" strokeWidth={2.5} />
            <span className="flex-1 leading-snug">{caption}</span>
          </figcaption>
        )}
      </div>
    </figure>
  )
}
