// Portfolio Website JavaScript

// Data from the provided JSON
const portfolioData = {
    "personalInfo": {
        "name": "Alex Johnson",
        "title": "Full Stack Developer & Designer",
        "email": "alex.johnson@email.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/alexjohnson",
        "github": "github.com/alexjohnson",
        "website": "alexjohnson.dev"
    },
    "about": {
        "introduction": "I'm a passionate full-stack developer with 5+ years of experience creating digital solutions that bridge the gap between design and functionality. I specialize in modern web technologies and love turning complex problems into simple, beautiful, and intuitive designs.",
        "mission": "To create meaningful digital experiences that make a positive impact on people's lives while continuously learning and growing in the ever-evolving tech landscape.",
        "skills": [
            { "name": "JavaScript", "level": 90 },
            { "name": "React", "level": 85 },
            { "name": "Node.js", "level": 80 },
            { "name": "Python", "level": 75 },
            { "name": "UI/UX Design", "level": 85 },
            { "name": "AWS", "level": 70 }
        ],
        "interests": ["Photography", "Rock Climbing", "Sustainable Technology", "Open Source Contributing", "Teaching & Mentoring"]
    },
    "experience": [
        {
            "company": "TechCorp Inc.",
            "position": "Senior Full Stack Developer",
            "duration": "2022 - Present",
            "description": "Lead development of web applications serving 100k+ users. Implemented microservices architecture reducing server costs by 40%.",
            "achievements": ["Led team of 5 developers", "Reduced page load times by 60%", "Implemented CI/CD pipeline"]
        },
        {
            "company": "StartupXYZ",
            "position": "Frontend Developer",
            "duration": "2020 - 2022",
            "description": "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.",
            "achievements": ["Built reusable component library", "Improved accessibility compliance to WCAG 2.1 AA", "Mentored junior developers"]
        },
        {
            "company": "Digital Agency",
            "position": "Web Developer",
            "duration": "2019 - 2020",
            "description": "Created custom websites for clients across various industries. Worked with WordPress, custom PHP solutions, and modern JavaScript frameworks.",
            "achievements": ["Delivered 25+ client projects on time", "Increased client satisfaction scores by 30%", "Optimized sites for Core Web Vitals"]
        }
    ],
    "education": [
        {
            "institution": "University of California, Berkeley",
            "degree": "Bachelor of Science in Computer Science",
            "duration": "2015 - 2019",
            "details": "Graduated Magna Cum Laude, focused on Human-Computer Interaction and Software Engineering"
        }
    ],
    "blogPosts": [
        {
            "id": 1,
            "title": "Building Accessible Web Applications in 2025",
            "excerpt": "A comprehensive guide to implementing WCAG 2.1 standards in modern web development, covering best practices for inclusive design.",
            "date": "2025-05-15",
            "readTime": "8 min read",
            "category": "Accessibility",
            "featured": true
        },
        {
            "id": 2,
            "title": "The Future of CSS: What's Coming in 2025",
            "excerpt": "Exploring new CSS features like container queries, cascade layers, and color functions that are changing how we style the web.",
            "date": "2025-05-01",
            "readTime": "6 min read",
            "category": "CSS",
            "featured": false
        },
        {
            "id": 3,
            "title": "Optimizing React Performance: Advanced Techniques",
            "excerpt": "Deep dive into React optimization strategies including memoization, code splitting, and virtual scrolling for large applications.",
            "date": "2025-04-20",
            "readTime": "12 min read",
            "category": "React",
            "featured": true
        },
        {
            "id": 4,
            "title": "My Journey from Bootcamp to Senior Developer",
            "excerpt": "Reflecting on the challenges, learnings, and growth that shaped my career in tech over the past 5 years.",
            "date": "2025-04-05",
            "readTime": "10 min read",
            "category": "Career",
            "featured": false
        },
        {
            "id": 5,
            "title": "Building a Design System from Scratch",
            "excerpt": "How we created a scalable design system at TechCorp that improved development velocity and design consistency across 15+ products.",
            "date": "2025-03-22",
            "readTime": "15 min read",
            "category": "Design",
            "featured": true
        },
        {
            "id": 6,
            "title": "Serverless Architecture: Lessons Learned",
            "excerpt": "Key insights from building and scaling serverless applications using AWS Lambda, including cost optimization and performance tips.",
            "date": "2025-03-08",
            "readTime": "9 min read",
            "category": "Backend",
            "featured": false
        }
    ],
    "categories": ["Accessibility", "CSS", "React", "Career", "Design", "Backend", "JavaScript", "Performance"]
};

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const skillsSection = document.querySelector('.skills');
const blogGrid = document.getElementById('blog-grid');
const blogSearch = document.getElementById('blog-search');
const categoryFilter = document.getElementById('category-filter');

// State
let currentBlogPosts = [...portfolioData.blogPosts];
let hasAnimatedSkills = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeBlog();
    initializeSkillsAnimation();
    initializeSmoothScrolling();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skills Animation
function initializeSkillsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedSkills) {
                animateSkills();
                hasAnimatedSkills = true;
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill__progress');
    skillsSection.classList.add('animate');

    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--skill-width', level + '%');
        bar.style.width = level + '%';
    });
}

// Blog Functions
function initializeBlog() {
    renderBlogPosts(currentBlogPosts);

    // Search functionality
    if (blogSearch) {
        blogSearch.addEventListener('input', handleBlogSearch);
    }

    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
}

function renderBlogPosts(posts) {
    if (!blogGrid) return;

    if (posts.length === 0) {
        blogGrid.innerHTML = `
            <div class="blog__no-results">
                <p>No blog posts found matching your criteria.</p>
            </div>
        `;
        return;
    }

    blogGrid.innerHTML = posts.map(post => `
        <article class="blog__post ${post.featured ? 'blog__post-featured' : ''}" data-post-id="${post.id}">
            <div class="blog__post-image">
                ${post.title.substring(0, 20)}...
            </div>
            <div class="blog__post-content">
                <div class="blog__post-meta">
                    <span class="blog__post-category">${post.category}</span>
                    <span class="blog__post-date">${formatDate(post.date)}</span>
                    <span class="blog__post-read-time">${post.readTime}</span>
                </div>
                <h3 class="blog__post-title">${post.title}</h3>
                <p class="blog__post-excerpt">${post.excerpt}</p>
            </div>
        </article>
    `).join('');

    // Add click handlers to blog posts
    addBlogPostClickHandlers();
}

function addBlogPostClickHandlers() {
    const blogPosts = document.querySelectorAll('.blog__post');
    blogPosts.forEach(post => {
        post.addEventListener('click', function () {
            const postId = this.getAttribute('data-post-id');
            const postData = portfolioData.blogPosts.find(p => p.id == postId);
            if (postData) {
                showBlogPostModal(postData);
            }
        });
    });
}

function showBlogPostModal(post) {
    // Create a simple modal to show blog post details
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="blog-modal__overlay"></div>
        <div class="blog-modal__content">
            <div class="blog-modal__header">
                <h2>${post.title}</h2>
                <button class="blog-modal__close" aria-label="Close modal">&times;</button>
            </div>
            <div class="blog-modal__meta">
                <span class="blog__post-category">${post.category}</span>
                <span class="blog__post-date">${formatDate(post.date)}</span>
                <span class="blog__post-read-time">${post.readTime}</span>
            </div>
            <div class="blog-modal__body">
                <p>${post.excerpt}</p>
                <p><em>This is a demo portfolio. The full article would be displayed here in a real implementation.</em></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add modal styles dynamically
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .blog-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--space-16);
            }
            .blog-modal__overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(4px);
            }
            .blog-modal__content {
                position: relative;
                background-color: var(--color-surface);
                border-radius: var(--radius-lg);
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid var(--color-border);
                box-shadow: var(--shadow-lg);
            }
            .blog-modal__header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            }
            .blog-modal__header h2 {
                margin: 0;
                padding-right: var(--space-16);
            }
            .blog-modal__close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: var(--space-4);
                line-height: 1;
            }
            .blog-modal__close:hover {
                color: var(--color-text);
            }
            .blog-modal__meta {
                padding: var(--space-16) var(--space-24) 0;
                display: flex;
                gap: var(--space-12);
                flex-wrap: wrap;
                font-size: var(--font-size-sm);
            }
            .blog-modal__body {
                padding: var(--space-24);
                line-height: var(--line-height-normal);
            }
        `;
        document.head.appendChild(modalStyles);
    }

    // Close modal handlers
    const closeBtn = modal.querySelector('.blog-modal__close');
    const overlay = modal.querySelector('.blog-modal__overlay');

    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function handleBlogSearch() {
    const searchTerm = blogSearch.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    let filteredPosts = portfolioData.blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryValue || post.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    currentBlogPosts = filteredPosts;
    renderBlogPosts(currentBlogPosts);
}

function handleCategoryFilter() {
    const searchTerm = blogSearch.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    let filteredPosts = portfolioData.blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryValue || post.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    currentBlogPosts = filteredPosts;
    renderBlogPosts(currentBlogPosts);
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        // header.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--color-surface)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Contact form handling (placeholder)
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! This is a demo portfolio - in a real implementation, this would send an email.');
}

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Enable keyboard navigation for blog posts
    if (e.target.classList.contains('blog__post')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Add loading animation for blog posts
function showBlogLoading() {
    if (blogGrid) {
        blogGrid.innerHTML = `
            <div class="blog__loading">
                <p>Loading blog posts...</p>
            </div>
        `;
    }
}

// Performance optimization: Debounce search
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

// Update search handler with debouncing
if (blogSearch) {
    blogSearch.addEventListener('input', debounce(handleBlogSearch, 300));
}

// Accessibility improvements
function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.transition = 'top 0.3s';
    skipLink.addEventListener('focus', function () {
        this.style.top = '6px';
    });
    skipLink.addEventListener('blur', function () {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add aria-current to active nav link
    const updateAriaCurrent = () => {
        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    window.addEventListener('scroll', debounce(updateAriaCurrent, 100));
}

// Initialize accessibility improvements
improveAccessibility();

// Console message for developers
console.log('🚀 Portfolio website loaded successfully!');
console.log('👨‍💻 Built with modern web technologies');
console.log('📧 Contact: alex.johnson@email.com');