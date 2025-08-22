import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import skillsData from '../data/skills.json'

const Skills = () => {
  const ref = useIntersectionObserver()

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>

        <div className="skills-categories">
          {Object.entries(skillsData.categories).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="certifications">
          <h3 className="section-subtitle">Certifications</h3>
          <div className="cert-grid">
            {skillsData.certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-icon">{cert.icon}</div>
                <h4>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    {cert.title}
                  </a>
                </h4>
                <p>{cert.description}</p>
                <div className="cert-meta">
                  <span className="cert-year">{cert.year}</span>
                  <span className="cert-issuer">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="publications">
          <h3 className="section-subtitle">Publications</h3>
          {skillsData.publications.map((pub, index) => (
            <div key={index} className="publication-card">
              <h4>
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.title}
                </a>
              </h4>
              <p>{pub.description}</p>
              <div className="publication-meta">
                <span className="publication-year">{pub.year}</span>
                <span className="publication-venue">{pub.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills