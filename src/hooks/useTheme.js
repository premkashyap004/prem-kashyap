import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or default to system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved) return saved

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', newTheme)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-color-scheme', theme)
    }
  }, [theme])

  return { theme, toggleTheme }
}