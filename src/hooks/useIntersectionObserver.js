import { useEffect, useRef } from 'react'

export const useIntersectionObserver = (options = {}) => {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    })

    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.transform = 'translateY(20px)'
      ref.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return ref
}