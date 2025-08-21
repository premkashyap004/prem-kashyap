// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    initializeTypewriter();
    initializeProjects();
    initializeContactForm();
    initializeScrollEffects();
    initializeLoadingScreen();

    // Remove loading screen after initialization
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // Check for saved theme preference or default to system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = systemPrefersDark ? 'dark' : 'light';

    // Apply initial theme
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcons(currentTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-color-scheme', newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        } else {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        }
    }
}

// Navigation Management
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling and active section highlighting
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initialize on load

    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });

        // Update navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(var(--color-surface-rgb, 38, 40, 40), 0.95)';
        } else {
            navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
        }
    }
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const texts = [
        'AI Developer',
        'Full-Stack Developer',
        'Cloud Engineer',
        'ML Engineer',
        'Software Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 75;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typewriter effect
    setTimeout(type, 1000);
}

// Projects Management
function initializeProjects() {
    const projectsData = [
        {
            title: "Real-time Wall Paint Overlay",
            description: "Computer vision POC that detects walls in images/videos and overlays desired colors using Meta's SAM model for segmentation.",
            technologies: ["Meta SAM", "Computer Vision", "Python", "Image Processing"],
            category: "AI/ML",
            type: "POC",
            github: "#",
            demo: "#"
        },
        {
            title: "Semantic Search Engine",
            description: "Advanced search engine for Times of India using LlamaIndex with ChromaDB as vector store. Features entity recognition and synonym searching on text and image content.",
            technologies: ["LlamaIndex", "ChromaDB", "Python", "Vector Search", "NLP"],
            category: "AI/ML",
            type: "Production",
            github: "#",
            demo: "#"
        },
        {
            title: "Media Library Application",
            description: "Full-stack MERN application that enriches media files with AI-generated captions, object detection, and categorization using the semantic search engine.",
            technologies: ["MERN", "React", "Node.js", "MongoDB", "AI Integration"],
            category: "Full-Stack",
            type: "Application",
            github: "#",
            demo: "#"
        },
        {
            title: "Storyboard Generation Tool",
            description: "Python application for instructional designers to extract content from source documents and generate storyboards based on Bloom's taxonomy and custom prompts.",
            technologies: ["Python", "AI", "Document Processing", "PDF Handling"],
            category: "AI/ML",
            type: "Tool",
            github: "#",
            demo: "#"
        },
        {
            title: "Scout AI - Children's Companion",
            description: "AI assistant for children aged 4-12 using GPT-4o real-time capabilities. Features bedtime stories, homework help, and multi-agent conversation switching.",
            technologies: ["GPT-4o", "Python", "Multi-Agent Systems", "Real-time AI"],
            category: "AI/ML",
            type: "POC",
            github: "#",
            demo: "#"
        },
        {
            title: "Assessment Generation POC",
            description: "Automated system to create educational assessments from source documents using AI-powered content extraction and question generation.",
            technologies: ["Python", "AI", "Natural Language Processing", "Education Tech"],
            category: "AI/ML",
            type: "POC",
            github: "#",
            demo: "#"
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Render projects
    function renderProjects(projects) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}" data-type="${project.type}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-type">${project.type}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                    <a href="${project.demo}" class="project-link" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Demo
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    const type = card.getAttribute('data-type');
                    if (category === filter || type === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Initialize projects
    renderProjects(projectsData);
}

// Contact Form Management
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    // Add error message container
    const errorContainer = document.createElement('div');
    errorContainer.id = 'form-error';
    errorContainer.style.display = 'none';
    errorContainer.style.padding = '12px';
    errorContainer.style.marginBottom = '16px';
    errorContainer.style.backgroundColor = 'var(--color-error)';
    errorContainer.style.color = 'white';
    errorContainer.style.borderRadius = '6px';
    errorContainer.style.fontSize = '14px';
    contactForm.insertBefore(errorContainer, contactForm.firstChild);

    // Add success message container
    const successContainer = document.createElement('div');
    successContainer.id = 'form-success';
    successContainer.style.display = 'none';
    successContainer.style.padding = '12px';
    successContainer.style.marginBottom = '16px';
    successContainer.style.backgroundColor = 'var(--color-success)';
    successContainer.style.color = 'white';
    successContainer.style.borderRadius = '6px';
    successContainer.style.fontSize = '14px';
    contactForm.insertBefore(successContainer, contactForm.firstChild);

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hide previous messages
        errorContainer.style.display = 'none';
        successContainer.style.display = 'none';

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name) {
            showError('Please enter your name');
            return;
        }

        if (!email) {
            showError('Please enter your email address');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!subject) {
            showError('Please enter a subject');
            return;
        }

        if (!message) {
            showError('Please enter your message');
            return;
        }

        if (message.length < 10) {
            showError('Message must be at least 10 characters long');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showSuccess('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showSuccess(message) {
        successContainer.textContent = message;
        successContainer.style.display = 'block';
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const backToTopButton = document.getElementById('back-to-top');

    // Back to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .cert-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.profile-placeholder');

        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Loading Screen
function initializeLoadingScreen() {
    // Hide loading screen when everything is loaded
    window.addEventListener('load', function () {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 800);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll performance
const debouncedScroll = debounce(function () {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading states for interactive elements
function addLoadingState(element, duration = 1000) {
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }, duration);
}

// Handle focus for accessibility
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focus');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-focus');
});

// Performance optimization: Lazy load images if any are added
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}