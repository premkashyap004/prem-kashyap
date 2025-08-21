import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Skills = () => {
  const ref = useIntersectionObserver()

  const skillsData = {
    "Full-Stack Development": ["MERN", "React", "Node.js", "Express.js", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    "AI & Machine Learning": ["LlamaIndex", "Langchain", "LangGraph", "Meta SAM", "GPT-4o", "ChromaDB", "Python", "Machine Learning"],
    "Cloud & DevOps": ["AWS EC2", "AWS Lambda", "AWS S3", "AWS Textract", "Docker", "Kubernetes", "Git", "GitHub Actions"],
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "C", "C++"]
  }

  const certifications = [
    {
      title: "AWS Certified Developer – Associate",
      description: "Professional certification for AWS development and deployment",
      year: "2023",
      icon: "☁️",
      link: "https://www.credly.com/badges/your-badge-id"
    },
    {
      title: "Oracle Generative AI Certificate",
      description: "Advanced certification in generative AI technologies and implementation",
      year: "2024", 
      icon: "🏆",
      link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=your-id"
    },
    {
      title: "AWS AI Practitioner",
      description: "Specialized certification in AWS AI and machine learning services",
      year: "2025",
      icon: "🤖",
      link: "#"
    }
  ]

  const publications = [
    {
      title: "Chronic Kidney Disease Prediction Using Different ML Algorithms",
      description: "Research paper comparing various machine learning algorithms for predicting chronic kidney disease with performance analysis and accuracy metrics.",
      year: "2022",
      link: "https://ieeexplore.ieee.org/document/your-paper-id"
    }
  ]

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>

        <div className="skills-categories">
          {Object.entries(skillsData).map(([category, skills]) => (
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
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-icon">{cert.icon}</div>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
                <span className="cert-year">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="publications">
          <h3 className="section-subtitle">Publications</h3>
          {publications.map((pub, index) => (
            <div key={index} className="publication-card">
              <h4>
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.title}
                </a>
              </h4>
              <p>{pub.description}</p>
              <span className="publication-year">{pub.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills