import { useState, useEffect } from 'react'

export const useTypewriter = (texts, speed = 150) => {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const type = () => {
      const currentText = texts[textIndex]

      if (isDeleting) {
        setDisplayText(currentText.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)

        if (charIndex === 0) {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
          setTimeout(type, 500)
          return
        }
        setTimeout(type, 75)
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)

        if (charIndex === currentText.length) {
          setIsDeleting(true)
          setTimeout(type, 2000)
          return
        }
        setTimeout(type, speed)
      }
    }

    const timeout = setTimeout(type, 1000)
    return () => clearTimeout(timeout)
  }, [texts, charIndex, isDeleting, textIndex, speed])

  return displayText
}