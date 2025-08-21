import React from 'react'

const BackToTop = ({ show, onClick }) => {
  if (!show) return null

  return (
    <button
      className={`back-to-top ${show ? 'visible' : ''}`}
      onClick={onClick}
      aria-label="Back to top"
      id="back-to-top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"/>
      </svg>
    </button>
  )
}

export default BackToTop