import React, { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import portfolioData from '../data/portfolio.json'

const Contact = () => {
  const ref = useIntersectionObserver()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus({ type: '', message: '' })

    // Validation
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your name' })
      return
    }

    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address' })
      return
    }

    if (!validateEmail(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }

    if (!formData.subject.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter a subject' })
      return
    }

    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your message' })
      return
    }

    if (formData.message.length < 10) {
      setSubmitStatus({ type: 'error', message: 'Message must be at least 10 characters long' })
      return
    }

    // Simulate form submission
    setIsSubmitting(true)

    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Thank you for your message! I will get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together!</h3>
            <p>
              I'm always interested in discussing new opportunities, innovative
              projects, and collaborations in AI/ML and software development.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href={`mailto:${portfolioData.personal.email}`}>{portfolioData.personal.email}</a>
              </div>
            </div>

            <a href="/assets/Resume.pdf" download className="btn btn--outline">
              📄 Download Resume
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
            {submitStatus.message && (
              <div 
                className={`alert ${submitStatus.type === 'error' ? 'alert-error' : 'alert-success'}`}
                style={{
                  padding: '12px',
                  marginBottom: '16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: submitStatus.type === 'error' ? 'var(--color-error)' : 'var(--color-success)',
                  color: 'white'
                }}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full-width"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact