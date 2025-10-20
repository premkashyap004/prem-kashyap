import React, { useState, useMemo } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import projectsData from '../data/projects.json'

const Projects = () => {
    const ref = useIntersectionObserver()
    const [activeFilter, setActiveFilter] = useState('all')

    // Get unique categories and types for filters
    const filters = useMemo(() => {
        const categories = [...new Set(projectsData.map(p => p.category))]
        const types = [...new Set(projectsData.map(p => p.type))]
        return ['all', ...categories, ...types]
    }, [])

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projectsData
        return projectsData.filter(
            project =>
                project.category === activeFilter || project.type === activeFilter
        )
    }, [activeFilter])

    const handleFilterChange = filter => {
        setActiveFilter(filter)
    }

    return (
        <section className="projects" id="projects" ref={ref}>
            <div className="container">
                <h2 className="section-title">Projects</h2>

                <div className="project-filters">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filter)}
                            data-filter={filter}
                        >
                            {filter === 'all' ? 'All' : filter}
                        </button>
                    ))}
                </div>

                <div className="projects-grid" id="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card"
                            data-category={project.category}
                            data-type={project.type}
                        >
                            <div className="project-header">
                                <h3 className="project-title">{project.title}</h3>
                                <span className="project-type">{project.type}</span>
                            </div>

                            <p className="project-description">{project.description}</p>

                            <div className="project-tech">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* <div className="project-links">
                                <a
                                    href={project.github}
                                    className="project-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                                                         <svg
                                         width="16"
                                         height="16"
                                         viewBox="0 0 24 24"
                                         fill="currentColor"
                                     >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                                <a
                                    href={project.demo}
                                    className="project-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                                                         <svg
                                         width="16"
                                         height="16"
                                         viewBox="0 0 24 24"
                                         fill="currentColor"
                                     >
                                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                    </svg>
                                    Demo
                                </a>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
