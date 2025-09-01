// Email service for handling contact form submissions
class EmailService {
    constructor() {
        // For development, we'll use EmailJS as it's free and easy to set up
        // In production, you might want to use your own backend service
        this.serviceId = 'prem.work.2025' // You'll need to configure this
        this.templateId = 'prem.template.2025' // You'll need to configure this
        this.publicKey = 'nP_90dAgCNCetGqoz' // You'll need to configure this
    }

    async sendEmail(formData) {
        try {
            // Method 1: Using EmailJS (recommended for client-side)
            if (window.emailjs && this.serviceId !== 'prem.work.2025') {
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    company: formData.company || '',
                    phone: formData.phone || '',
                    to_email: 'prem.kashyap.0206@gmail.com',
                    reply_to: formData.email
                }

                const response = await window.emailjs.send(
                    this.serviceId,
                    this.templateId,
                    templateParams,
                    this.publicKey
                )

                return {
                    success: true,
                    message: 'Email sent successfully!',
                    data: response
                }
            }

            // Method 2: Try backend API (if available)
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        to: 'prem.kashyap.0206@gmail.com'
                    })
                })

                if (response.ok) {
                    const result = await response.json()
                    return {
                        success: true,
                        message: 'Email sent successfully!',
                        data: result
                    }
                }
            } catch (fetchError) {
                console.log('Backend API not available, using fallback')
            }

            // Fallback: Open default email client
            this.openEmailClient(formData)
            
            return {
                success: true,
                message: 'Email client opened. Please send the email manually if needed.',
                fallback: true
            }

        } catch (error) {
            console.error('Email sending failed:', error)
            
            // Ultimate fallback: Open default email client
            this.openEmailClient(formData)
            
            return {
                success: true,
                message: 'Email client opened. Please send the email manually.',
                fallback: true
            }
        }
    }

    openEmailClient(formData) {
        const { name, email, subject, message, company, phone } = formData
        
        let body = `Hello,\n\nI'm contacting you through your portfolio website.\n\n`
        body += `Name: ${name}\n`
        body += `Email: ${email}\n`
        if (company) body += `Company: ${company}\n`
        if (phone) body += `Phone: ${phone}\n`
        body += `\nSubject: ${subject}\n\n`
        body += `Message:\n${message}\n\n`
        body += `Best regards,\n${name}`
        
        const emailSubject = `Portfolio Contact: ${subject}`
        const mailtoLink = `mailto:prem.kashyap.0206@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`
        
        // Open in new window/tab to avoid navigation issues
        window.open(mailtoLink, '_blank')
    }

    // Validate form data before sending
    validateFormData(formData) {
        const errors = {}

        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long'
        }

        if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        if (!formData.subject || formData.subject.trim().length < 3) {
            errors.subject = 'Subject must be at least 3 characters long'
        }

        if (!formData.message || formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long'
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // Method to initialize EmailJS (call this in your app)
    static initializeEmailJS() {
        // Load EmailJS script if not already loaded
        if (!window.emailjs) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
            script.onload = () => {
                if (window.emailjs) {
                    window.emailjs.init('YOUR_EMAILJS_PUBLIC_KEY') // Replace with actual key
                }
            }
            document.head.appendChild(script)
        }
    }
}

// Create and export a singleton instance
const emailService = new EmailService()
export default emailService

// Instructions for setup:
/*
To set up EmailJS (recommended):

1. Go to https://www.emailjs.com/ and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{from_name}}
   - {{from_email}}
   - {{subject}}
   - {{message}}
   - {{to_email}}
4. Get your Service ID, Template ID, and Public Key
5. Replace the placeholder values in this file
6. Call EmailService.initializeEmailJS() in your main App component

Alternative backend setup:
- Create an API endpoint at `/api/send-email`
- Use nodemailer or similar library to send emails
- Handle CORS properly for your domain
*/
