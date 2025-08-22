import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import portfolioData from '../data/portfolio.json'

const About = () => {
    const ref = useIntersectionObserver()

    return (
        <section className="about" id="about" ref={ref}>
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <p className="about-description">{portfolioData.bio.description}</p>

                    <p className="about-description">{portfolioData.bio.education}</p>

                    <div className="about-stats">
                        {portfolioData.stats.map((stat, index) => (
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
