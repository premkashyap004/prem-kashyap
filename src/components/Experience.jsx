import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import experienceData from '../data/experience.json'

const Experience = () => {
  const ref = useIntersectionObserver()

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          {experienceData.map((experience, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{experience.title}</h3>
                  <span className="company">{experience.company}</span>
                </div>

                <div className="timeline-meta">
                  <span>{experience.period}</span>
                  <span>{experience.location}</span>
                </div>

                {experience.responsibilities && (
                  <ul className="timeline-responsibilities">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                )}

                {experience.description && (
                  <p>{experience.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience