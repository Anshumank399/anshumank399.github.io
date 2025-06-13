// Portfolio Website JavaScript

// Data from the provided JSON
const portfolioData = {
    "personalInfo": {
        "name": "Anshuman Dey Kirty",
        "title": "Data Engineer",
        "email": "anshuman.kirty@gmail.com",
        "phone": "+1 (312) 900-4299",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/anshuman-dey-kirty/",
        "github": "github.com/Anshumank399",
        "website": "anshumankirty.com"
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
            "title": "Summer Internship at QuantumBlack AI by McKinsey",
            "excerpt": "So here I am presenting my reflection on what was one of the most fulfilling summers as an intern at QuantumBlack AI, McKinsey.",
            "date": "2022-09-30",
            "readTime": "3 min read",
            "category": "Experience",
            "featured": true,
            "mediumLink": "https://medium.com/@anshuman-kirty/summer-internship-experience-quantumblack-ai-by-mckinsey-903c753d8c6d"
        },
        // {
        //     "id": 2,
        //     "title": "The Future of CSS: What's Coming in 2025",
        //     "excerpt": "Exploring new CSS features like container queries, cascade layers, and color functions that are changing how we style the web.",
        //     "date": "2025-05-01",
        //     "readTime": "6 min read",
        //     "category": "CSS",
        //     "featured": false
        // },
        // {
        //     "id": 3,
        //     "title": "Optimizing React Performance: Advanced Techniques",
        //     "excerpt": "Deep dive into React optimization strategies including memoization, code splitting, and virtual scrolling for large applications.",
        //     "date": "2025-04-20",
        //     "readTime": "12 min read",
        //     "category": "React",
        //     "featured": true
        // },
        // {
        //     "id": 4,
        //     "title": "My Journey from Bootcamp to Senior Developer",
        //     "excerpt": "Reflecting on the challenges, learnings, and growth that shaped my career in tech over the past 5 years.",
        //     "date": "2025-04-05",
        //     "readTime": "10 min read",
        //     "category": "Career",
        //     "featured": false
        // },
        // {
        //     "id": 5,
        //     "title": "Building a Design System from Scratch",
        //     "excerpt": "How we created a scalable design system at TechCorp that improved development velocity and design consistency across 15+ products.",
        //     "date": "2025-03-22",
        //     "readTime": "15 min read",
        //     "category": "Design",
        //     "featured": true
        // },
        // {
        //     "id": 6,
        //     "title": "Serverless Architecture: Lessons Learned",
        //     "excerpt": "Key insights from building and scaling serverless applications using AWS Lambda, including cost optimization and performance tips.",
        //     "date": "2025-03-08",
        //     "readTime": "9 min read",
        //     "category": "Backend",
        //     "featured": false
        // }
    ],
    "categories": ["Experience", "AI"]
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
const themeToggle = document.getElementById('theme-toggle');

// State
let currentBlogPosts = [...portfolioData.blogPosts];
let hasAnimatedSkills = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeNavigation();
    initializeBlog();
    initializeSkillsAnimation();
    initializeSmoothScrolling();
});

// Theme Management Functions
function initializeTheme() {
    // Get saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme;
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = systemPrefersDark ? 'dark' : 'light';
    }

    // Apply the theme
    applyTheme(currentTheme);

    // Add click event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);

    // Update theme toggle button aria-label
    if (themeToggle) {
        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        themeToggle.setAttribute('aria-label', label);
    }
}

function getCurrentTheme() {
    return document.documentElement.getAttribute('data-color-scheme') || 'light';
}

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
        if (!navMenu.contains(e.target) &&
            !navToggle.contains(e.target) &&
            !themeToggle.contains(e.target)) {
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
                <div class="blog-modal__share">
                    <h4>Share this article</h4>
                    <div class="share-buttons">
                        <button class="share-btn share-btn--twitter" data-platform="twitter" data-url="${post.mediumLink}" data-title="${post.title}" aria-label="Share on Twitter/X" title="Share on Twitter/X">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </button>
                        <button class="share-btn share-btn--linkedin" data-platform="linkedin" data-url="${post.mediumLink}" data-title="${post.title}" aria-label="Share on LinkedIn" title="Share on LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </button>
                        <button class="share-btn share-btn--reddit" data-platform="reddit" data-url="${post.mediumLink}" data-title="${post.title}" aria-label="Share on Reddit" title="Share on Reddit">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                            </svg>
                        </button>
                        <button class="share-btn share-btn--whatsapp" data-platform="whatsapp" data-url="${post.mediumLink}" data-title="${post.title}" aria-label="Share on WhatsApp" title="Share on WhatsApp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                            </svg>
                        </button>
                        <button class="share-btn share-btn--telegram" data-platform="telegram" data-url="${post.mediumLink}" data-title="${post.title}" aria-label="Share on Telegram" title="Share on Telegram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="blog-modal__read-more">
                    <a href="${post.mediumLink}" target="_blank" class="btn btn--primary">Read full article on Medium</a>
                </div>
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
            .blog-modal__read-more {
                margin-top: var(--space-24);
                text-align: center;
            }
            .blog-modal__read-more .btn {
                display: inline-flex;
                align-items: center;
                gap: var(--space-8);
            }
            .blog-modal__share {
                margin-top: var(--space-20);
                padding-top: var(--space-20);
                border-top: 1px solid var(--color-border);
            }
            .blog-modal__share h4 {
                margin: 0 0 var(--space-16) 0;
                font-size: var(--font-size-lg);
                color: var(--color-text);
            }
            .share-buttons {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: var(--space-12);
                flex-wrap: wrap;
            }
            .share-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                border: 1px solid var(--color-border);
                border-radius: var(--radius-full);
                background-color: var(--color-surface);
                color: var(--color-text);
                cursor: pointer;
                transition: all var(--duration-normal) var(--ease-standard);
                text-decoration: none;
            }
            .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-md);
            }
            .share-btn--twitter:hover {
                background-color: #1DA1F2;
                color: white;
                border-color: #1DA1F2;
            }
            .share-btn--linkedin:hover {
                background-color: #0077B5;
                color: white;
                border-color: #0077B5;
            }
            .share-btn--reddit:hover {
                background-color: #FF4500;
                color: white;
                border-color: #FF4500;
            }
            .share-btn--whatsapp:hover {
                background-color: #25D366;
                color: white;
                border-color: #25D366;
            }
            .share-btn--telegram:hover {
                background-color: #0088CC;
                color: white;
                border-color: #0088CC;
            }
            .share-btn svg {
                flex-shrink: 0;
            }
            .share-btn:focus-visible {
                outline: 2px solid var(--color-primary);
                outline-offset: 2px;
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

    // Add share button functionality
    const shareButtons = modal.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const url = this.getAttribute('data-url');
            const title = this.getAttribute('data-title');
            shareOnPlatform(platform, url, title);
        });
    });

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function shareOnPlatform(platform, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(`${title} - ${url}`);
    
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        case 'reddit':
            shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedText}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        default:
            console.error('Unknown platform:', platform);
            return;
    }
    
    // Open in new window
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
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