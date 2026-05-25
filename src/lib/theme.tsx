import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light',
})

function getResolved(t: Theme): 'dark' | 'light' {
  if (t === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return t
}

function applyToDOM(resolved: 'dark' | 'light') {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial: Theme =
      stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'system'
    const resolved = getResolved(initial)
    setThemeState(initial)
    setResolvedTheme(resolved)
    applyToDOM(resolved)
  }, [])

  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const resolved = getResolved('system')
      setResolvedTheme(resolved)
      applyToDOM(resolved)
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  function setTheme(next: Theme) {
    const resolved = getResolved(next)
    localStorage.setItem('theme', next)
    setThemeState(next)
    setResolvedTheme(resolved)
    applyToDOM(resolved)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
