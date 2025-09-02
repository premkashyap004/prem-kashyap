import React, { useState, useEffect } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import portfolioData from '../data/portfolio.json'
import emailService from '../services/emailService'

// FormField component moved outside to prevent recreation on every render
const FormField = ({ 
    type = "text", 
    name, 
    label, 
    placeholder = "", 
    required = false, 
    rows = null, 
    icon = null, 
    value, 
    onChange, 
    hasError 
}) => {
    const fieldClasses = `form-field ${hasError ? "has-error" : ""}`.trim()
    const InputComponent = rows ? "textarea" : "input"

    return (
        <div className={fieldClasses}>
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="required-asterisk">*</span>}
            </label>

            <div className="input-wrapper">
                {icon && <div className="input-icon">{icon}</div>}
                
                <InputComponent
                    type={rows ? undefined : type}
                    id={name}
                    name={name}
                    className="form-input"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows || undefined}
                    required={required}
                    aria-invalid={!!hasError}
                    aria-describedby={hasError ? `${name}-error` : undefined}
                />
            </div>

            {hasError && (
                <div className="field-error" id={`${name}-error`} role="alert">
                    <span className="error-icon">⚠</span>
                    {hasError}
                </div>
            )}
        </div>
    )
}

const Contact = () => {
    const ref = useIntersectionObserver()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })
    const [fieldErrors, setFieldErrors] = useState({})
    
    // Initialize EmailJS on component mount
    useEffect(() => {
        // emailService.initializeEmailJS() // Uncomment when EmailJS is configured
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        
        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))

        // Clear field error when user starts typing (only if there is an error)
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        // Clear global submit status when user makes changes (only if there is a message)
        if (submitStatus.message) {
            setSubmitStatus({ type: '', message: '' })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmitStatus({ type: '', message: '' })
        setFieldErrors({})

        // Validate form using email service
        const validation = emailService.validateFormData(formData)

        if (!validation.isValid) {
            setFieldErrors(validation.errors)
            setSubmitStatus({
                type: 'error',
                message: 'Please correct the errors below and try again.'
            })

            // Focus first error field
            const firstErrorField = Object.keys(validation.errors)[0]
            const errorElement = document.getElementById(firstErrorField)
            if (errorElement) {
                errorElement.focus()
            }
            return
        }

        // Submit form
        setIsSubmitting(true)

        try {
            const result = await emailService.sendEmail(formData)

            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    message: result.fallback
                        ? 'Email client opened. Please send manually if needed.'
                        : 'Thank you for your message! I will get back to you soon.'
                })

                // Reset form on success
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    company: '',
                    phone: ''
                })

                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus({ type: '', message: '' })
                }, 5000)

            } else {
                throw new Error(result.message || 'Failed to send email')
            }

        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus({
                type: 'error',
                message: 'Sorry, there was an error sending your message. Please try again or contact me directly.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }




    return (
        <section className="contact-enhanced" id="contact" ref={ref} style={{ background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%)' }}>
            <div className="container">
                <div className="contact-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-subtitle">
                        Let's discuss your next project or collaboration opportunity
                    </p>
                </div>

                <div className="contact-content-enhanced" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '60vh'
                }}>
                    {/* Contact Information Card */}
                    <div className="contact-info-enhanced" style={{
                        maxWidth: '500px',
                        width: '100%',
                        // textAlign: 'center'
                    }}>
                        <div className="contact-info-header">
                            <h3>Let's work together!</h3>
                            <p>
                                I'm always interested in discussing new opportunities, innovative
                                projects, and collaborations in AI/ML and software development.
                            </p>
                        </div>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="contact-method-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="contact-method-content">
                                    <span className="contact-method-label">Location</span>
                                    <span className="contact-method-value">{portfolioData.personal.location}</span>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-method-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </div>
                                <div className="contact-method-content">
                                    <span className="contact-method-label">Email</span>
                                    <a href={`mailto:${portfolioData.personal.email}`} className="contact-method-value">
                                        {portfolioData.personal.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-cta">
                            <a href="/assets/Prem Kashyap Chilakamarthi's Resume.pdf" download className="btn btn--outline btn--enhanced">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* Enhanced Contact Form */}
                    {/* <div className="contact-form-enhanced">
                        <div className="form-header-enhanced">
                            <h3>Send me a message</h3>
                            <p>Fill out the form below and I'll get back to you as soon as possible.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="enhanced-form" noValidate>
                            {submitStatus.message && (
                                <div className={`enhanced-alert ${submitStatus.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                                    <div className="alert-content">
                                        <span className="alert-icon">
                                            {submitStatus.type === 'error' ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className="alert-message">{submitStatus.message}</span>
                                    </div>
                                </div>
                            )}

                            <div className="form-grid">
                                <div className="form-row">
                                    <FormField
                                        type="text"
                                        name="name"
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        required={true}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        hasError={fieldErrors.name}
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                <div className="form-row">
                                    <FormField
                                        type="email"
                                        name="email"
                                        label="Email Address"
                                        placeholder="your.email@example.com"
                                        required={true}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        hasError={fieldErrors.email}
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                <div className="form-row">
                                    <FormField
                                        type="text"
                                        name="company"
                                        label="Company (Optional)"
                                        placeholder="Your company name"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        hasError={fieldErrors.company}
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                <div className="form-row">
                                    <FormField
                                        type="tel"
                                        name="phone"
                                        label="Phone (Optional)"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        hasError={fieldErrors.phone}
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                <div className="form-row form-row-full">
                                    <FormField
                                        type="text"
                                        name="subject"
                                        label="Subject"
                                        placeholder="What would you like to discuss?"
                                        required={true}
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        hasError={fieldErrors.subject}
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                <div className="form-row form-row-full">
                                    <FormField
                                        name="message"
                                        label="Message"
                                        placeholder="Tell me about your project, goals, or how we can work together..."
                                        rows={6}
                                        required={true}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        hasError={fieldErrors.message}
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="form-actions-enhanced">
                                <button
                                    type="submit"
                                    className="btn btn--primary btn--enhanced btn--full-width"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading-spinner"></span>
                                            <span>Sending message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                            </svg>
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>

                                <p className="form-disclaimer">
                                    By sending this message, you agree that I may contact you regarding your inquiry.
                                </p>
                            </div>
                        </form>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Contact
