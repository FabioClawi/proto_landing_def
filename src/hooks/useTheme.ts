import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'sincero-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored) return stored
    // Light is default — only auto-switch to dark if user's OS is dark AND no preference stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return { theme, toggle, isDark: theme === 'dark' }
}
