import { useState, useEffect } from 'react'

export const useScrollEffects = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      // Back to top button visibility
      setShowBackToTop(window.pageYOffset > 300)

      // Active section highlighting
      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 100

      sections.forEach(section => {
        const top = section.offsetTop
        const bottom = top + section.offsetHeight
        const id = section.getAttribute('id')

        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(id)
        }
      })

      // Update navbar background on scroll
      const navbar = document.getElementById('navbar')
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.background = 'rgba(var(--color-surface-rgb, 38, 40, 40), 0.95)'
        } else {
          navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)'
        }
      }
    }

    const debouncedScroll = debounce(handleScroll, 10)
    window.addEventListener('scroll', debouncedScroll)

    return () => {
      window.removeEventListener('scroll', debouncedScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return { showBackToTop, activeSection, scrollToTop }
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}