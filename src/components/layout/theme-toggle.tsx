import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.contains('dark')
    const next = isDark ? 'light' : 'dark'
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(next)
    document.documentElement.style.colorScheme = next
    localStorage.setItem('theme', next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex h-10 w-10 items-center justify-center border-[3px] border-border hover:bg-secondary transition-colors cursor-pointer"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
