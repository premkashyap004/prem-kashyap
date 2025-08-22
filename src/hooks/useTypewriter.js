import { useState, useEffect, useRef } from 'react'

export const useTypewriter = (
    texts,
    speed = 100,       // typing speed
    deleteSpeed = 50,  // deleting speed
    pause = 2000       // pause after full word before deleting/typing next
) => {
    const [displayText, setDisplayText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        const type = () => {
            const currentText = texts[textIndex]

            if (isDeleting) {
                setDisplayText(currentText.substring(0, charIndex - 1))
                setCharIndex(prev => prev - 1)

                if (charIndex === 0) {
                    setIsDeleting(false)
                    setTextIndex((prev) => (prev + 1) % texts.length)
                    timeoutRef.current = setTimeout(type, pause) // pause before typing new word
                    return
                }
                timeoutRef.current = setTimeout(type, deleteSpeed)
            } else {
                setDisplayText(currentText.substring(0, charIndex + 1))
                setCharIndex(prev => prev + 1)

                if (charIndex === currentText.length) {
                    setIsDeleting(true)
                    timeoutRef.current = setTimeout(type, pause) // pause after typing word
                    return
                }
                timeoutRef.current = setTimeout(type, speed)
            }
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(type, speed)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [texts, speed, deleteSpeed, pause])

    return displayText
}
