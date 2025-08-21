import React, { useState, useEffect } from 'react'

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`loading-screen ${!isVisible ? 'hidden' : ''}`}>
      <div className="loader"></div>
    </div>
  )
}

export default LoadingScreen