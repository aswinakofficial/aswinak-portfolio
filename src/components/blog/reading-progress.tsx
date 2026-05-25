import { useState, useEffect } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-2 border-b-[3px] border-border"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div
        className="h-full border-r-[3px] border-border transition-none"
        style={{ width: `${progress}%`, background: '#FF5C00' }}
      />
    </div>
  )
}
