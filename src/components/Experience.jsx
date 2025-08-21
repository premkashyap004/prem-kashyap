import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Experience = () => {
  const ref = useIntersectionObserver()

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Software Developer</h3>
                <span className="company">Sify Technologies Ltd.</span>
              </div>

              <div className="timeline-meta">
                <span>July 2023 – Present</span>
                <span>Chennai, India</span>
              </div>

              <ul className="timeline-responsibilities">
                <li>Developed and deployed high-performance AI-powered applications in production environments</li>
                <li>Led POCs and core feature integrations, ensuring technical excellence and strong UX</li>
                <li>Managed CI/CD pipelines, microservices, and collaborated with cross-functional teams</li>
                <li>Worked on cutting-edge AI/ML projects including semantic search and computer vision</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>B.E. Computer Science & Engineering</h3>
                <span className="company">Sri Sairam Engineering College</span>
              </div>

              <div className="timeline-meta">
                <span>2019 – 2023</span>
                <span>Chennai</span>
              </div>

              <p>CGPA: 9.295 (till 5th sem)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience