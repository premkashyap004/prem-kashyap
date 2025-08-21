import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'


const About = () => {
    const ref = useIntersectionObserver()

    // Static data - you can move this to data/portfolio.json and import it
    const bio = {
        description:
            "I'm a passionate Software Developer with over 2 years of experience at Sify Technologies, specializing in cutting-edge AI/ML solutions, full-stack development, and cloud technologies. My expertise spans from developing high-performance AI-powered applications to managing CI/CD pipelines and microservices architecture.",
        education:
            'I hold a B.E. in Computer Science & Engineering from Sri Sairam Engineering College with a CGPA of 9.295. My passion lies in transforming innovative ideas into production-ready solutions, particularly in the realm of artificial intelligence and machine learning.',
    }

    const stats = [
        { number: '2+', label: 'Years Experience' },
        { number: '6+', label: 'Projects Completed' },
        { number: '3', label: 'AWS Certifications' },
    ]

    return (
        <section className="about" id="about" ref={ref}>
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <p className="about-description">{bio.description}</p>

                    <p className="about-description">{bio.education}</p>

                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat">
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
