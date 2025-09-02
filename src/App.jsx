import React, { useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import { useTheme } from './hooks/useTheme'
import { useScrollEffects } from './hooks/useScrollEffects'
import './styles/style.css'

function App() {
    const { theme, toggleTheme } = useTheme()
    const { showBackToTop, scrollToTop } = useScrollEffects()

    useEffect(() => {
        document.documentElement.setAttribute('data-color-scheme', theme)
    }, [theme])

    // Add keyboard navigation support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-focus')
            }
        }

        const handleMouseDown = () => {
            document.body.classList.remove('keyboard-focus')
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])

    return (
        <div className="App">
            <LoadingScreen />
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main role="main">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
            </main>
            <Footer />
            <BackToTop show={showBackToTop} onClick={scrollToTop} />
        </div>
    )
}

export default App