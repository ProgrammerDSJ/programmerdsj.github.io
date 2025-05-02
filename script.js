// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// This event listener is now handled by Bootstrap
// Just keep track of cursor glow effects

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link if it's open
        if (window.innerWidth < 992) {
            const bsCollapse = document.getElementById('navbarNav');
            const collapse = bootstrap.Collapse.getInstance(bsCollapse);
            if (collapse) collapse.hide();
        }
    });
});

// Rotating subtitle text
const rotatingTextElement = document.getElementById('rotating-text');
const rotatingTexts = [
    "An Entrepreneur",
    "An Artist",
    "A Fitness Enthusiast",
    "Workaholic",
    "Content Creator",
    "A Developer"
];
let currentTextIndex = 0;

function rotateText() {
    // Start fade out animation
    rotatingTextElement.style.animation = 'fadeOutUp 0.5s forwards';
    
    // After fade out completes, change text and fade in
    setTimeout(() => {
        currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
        rotatingTextElement.textContent = rotatingTexts[currentTextIndex];
        rotatingTextElement.style.animation = 'fadeInUp 0.5s forwards';
    }, 500);
}

// Start rotation every 0.5 seconds
setInterval(rotateText, 1000);

// Skills Data - Updated with categories and proficiency levels
const skillsData = {
    "Languages & Core": [
        { name: "Python", icon: "fab fa-python", color: "#3776AB", level: "expert" },
        { name: "R", icon: "fas fa-code", color: "#276DC3", level: "intermediate" },
        { name: "Data Science", icon: "fas fa-chart-line", color: "#00BFFF", level: "advanced" },
        { name: "Machine Learning", icon: "fas fa-brain", color: "#FF6B6B", level: "advanced" }
    ],
    "Python Libraries for Data Science": [
        { name: "NumPy", iconType: "image", iconSrc: "https://numpy.org/images/logo.svg", color: "#4FACFE", level: "advanced" },
        { name: "Sci-kit Learn", iconType: "image", iconSrc: "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png", color: "#F89406", level: "intermediate" },
        { name: "TensorFlow", iconType: "image", iconSrc: "https://www.tensorflow.org/images/tf_logo_social.png", color: "#FF6F00", level: "intermediate" },
        { name: "PyTorch", icon: "fas fa-fire", color: "#EE4C2C", level: "intermediate" }
    ],
    "Backend & Database": [
        { name: "Node.js", icon: "fab fa-node-js", color: "#339933", level: "advanced" },
        { name: "Firebase", icon: "fas fa-database", color: "#FFCA28", level: "intermediate" },
        { name: "MongoDB", icon: "fas fa-database", color: "#47A248", level: "advanced" },
        { name: "MySQL", icon: "fas fa-database", color: "#4479A1", level: "advanced" }
    ],
    "Tools & Technologies": [
        { name: "Jupyter Notebooks", iconType: "image", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg", color: "#F37626", level: "expert" },
        { name: "Git", icon: "fab fa-git-alt", color: "#F05032", level: "advanced" },
        { name: "Linux", icon: "fab fa-linux", color: "#FCC624", level: "intermediate" },
        { name: "Supabase", icon: "fas fa-server", color: "#3ECF8E", level: "intermediate" }
    ]
};

// Function to get level text based on level value
function getLevelText(level) {
    switch(level) {
        case "beginner": return "Beginner";
        case "intermediate": return "Intermediate";
        case "advanced": return "Advanced";
        case "expert": return "Expert";
        default: return "Intermediate";
    }
}

// Projects Data
const projects = [
    {
        title: 'To-Do List Android Application',
        description: 'A To-Do List Android Application which lets you categorize tasks and improve your productivity.',
        image: './todo-list.jpg',
        technologies: ['Android', 'Java', 'SQLite'],
        link: 'project-view.html'
    },
    {
        title: 'Personal Finance Management App',
        description: 'A webapp that studies your spending patterns and uses AI to recommend ways to reach your financial goals efficiently.',
        image: './fineasy.jpg',
        technologies: ['React', 'Node.js', 'AI/ML'],
        link: 'project-view.html'
    }
];

// Render Skills - Updated to use the new structure with categories
function renderSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = ''; // Clear existing content
    
    // Loop through each category
    for (const [category, skills] of Object.entries(skillsData)) {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'skills-category';
        
        // Create category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        
        // Set icon based on category
        let categoryIcon = 'fas fa-code';
        if (category.includes('Python Libraries')) categoryIcon = 'fab fa-python';
        if (category.includes('Backend')) categoryIcon = 'fas fa-server';
        if (category.includes('Tools')) categoryIcon = 'fas fa-toolbox';
        
        categoryHeader.innerHTML = `<i class="${categoryIcon}"></i> ${category}`;
        categorySection.appendChild(categoryHeader);
        
        // Create skills grid for this category
        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-grid';
        
        // Add skills to this category
        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = `skill-card ${skill.level}`;
            skillCard.dataset.level = skill.level;
            
            // Create icon HTML based on icon type
            let iconHTML = '';
            if (skill.iconType === 'image') {
                iconHTML = `<img src="${skill.iconSrc}" alt="${skill.name} logo" style="max-width: 100%; max-height: 100%;">`;
            } else {
                iconHTML = `<i class="${skill.icon}"></i>`;
            }
            
            // Create skill content
            skillCard.innerHTML = `
                <div class="skill-icon" style="color: ${skill.color}">
                    ${iconHTML}
                </div>
                <div class="skill-content">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-level">${getLevelText(skill.level)}</div>
                    <div class="skill-progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            `;
            
            skillsGrid.appendChild(skillCard);
        });
        
        categorySection.appendChild(skillsGrid);
        skillsContainer.appendChild(categorySection);
    }
    
    // Setup cursor color change on skill card hover
    setupSkillCardCursorEffects();
}

// Function to setup cursor effects for skill cards
function setupSkillCardCursorEffects() {
    const cursor = document.querySelector('.cursor-glow');
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const level = card.dataset.level;
        
        card.addEventListener('mouseenter', () => {
            cursor.classList.remove('green', 'blue', 'red', 'yellow');
            
            // Set cursor color based on skill level
            switch(level) {
                case 'beginner':
                    cursor.classList.add('red');
                    break;
                case 'intermediate':
                    cursor.classList.add('yellow');
                    break;
                case 'advanced':
                    cursor.classList.add('blue');
                    break;
                case 'expert':
                    cursor.classList.add('green');
                    break;
                default:
                    cursor.classList.add('green');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            cursor.classList.remove('red', 'yellow', 'blue');
            cursor.classList.add('green'); // Default back to green
        });
    });
}

// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = ''; // Clear existing content
    
    // Create a row container for Bootstrap grid
    const projectRow = document.createElement('div');
    projectRow.className = 'row g-4'; // g-4 adds spacing between cards
    projectsGrid.appendChild(projectRow);
    
    projects.forEach(project => {
        // Create column for each project
        const projectCol = document.createElement('div');
        projectCol.className = 'col-md-6 col-lg-6 mb-4';
        
        // Create the project card with equal height
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card h-100';
        
        // Create tech badges HTML
        const techBadges = project.technologies.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <a href="${project.link}" class="view-project-btn">View Project <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies mt-auto">
                    ${techBadges}
                </div>
            </div>
        `;
        
        projectCol.appendChild(projectCard);
        projectRow.appendChild(projectCol);
    });
    
    // Add 'View All Projects' button
    const projectsSection = document.querySelector('#projects .container');
    const viewAllContainer = document.createElement('div');
    viewAllContainer.className = 'view-all-container';
    viewAllContainer.innerHTML = `
        <a href="project-gallery.html" class="btn view-all-btn">See All Projects <i class="fas fa-chevron-right"></i></a>
    `;
    projectsSection.appendChild(viewAllContainer);
    
    // Initialize border gradient effects
    initProjectCardGradients();
}

// Initialize project card gradient effects
function initProjectCardGradients() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectInfo = card.querySelector('.project-info');
        
        // Start with animated gradient
        card.classList.add('animated-gradient');
        
        // Update gradient on mouse move
        card.addEventListener('mousemove', (e) => {
            // Remove automatic animation when user interacts
            card.classList.remove('animated-gradient');
            
            // Get cursor position relative to the card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the card
            const y = e.clientY - rect.top;  // y position within the card
            
            // Calculate percentage positions
            const xPercent = Math.floor((x / rect.width) * 100);
            const yPercent = Math.floor((y / rect.height) * 100);
            
            // Update the gradient position based on cursor
            const infoBox = card.querySelector('.project-info');
            
            // Apply dynamic gradient - invert X position for more natural feel
            const mappedX = 100 - xPercent;
            infoBox.style.setProperty('--x-position', `${mappedX}%`);
            infoBox.style.setProperty('--y-position', `${yPercent}%`);
        });
        
        // Reset to animated gradient when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.classList.add('animated-gradient');
            projectInfo.style.removeProperty('--x-position');
            projectInfo.style.removeProperty('--y-position');
        });
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Enhanced Cursor Glow Effect
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    const nameBox = document.getElementById('nameBox');
    const nameHighlight = document.getElementById('nameHighlight');
    const socialLinks = document.querySelectorAll('.hero-social a');
    
    let isActive = false;
    let cursorSizeSmall = false;
    let isInsideNameBox = false;
    let isInsideSocialIcon = false;
    
    // Initial state
    setTimeout(() => {
        cursor.style.opacity = '1';
        // Set default color to green
        cursor.classList.add('green');
    }, 1000);
    
    // Follow cursor
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Handle cursor positioning
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Show cursor if it was hidden
        if (!isActive) {
            isActive = true;
            cursor.style.opacity = '1';
        }
        
        // Check if cursor is inside social icon first (higher priority)
        let currentInsideSocialIcon = false;
        
        socialLinks.forEach(link => {
            const linkRect = link.getBoundingClientRect();
            
            if (
                mouseX >= linkRect.left &&
                mouseX <= linkRect.right &&
                mouseY >= linkRect.top &&
                mouseY <= linkRect.bottom
            ) {
                currentInsideSocialIcon = true;
                if (!isInsideSocialIcon) {
                    isInsideSocialIcon = true;
                    // Remove ALL color classes before adding red
                    cursor.classList.remove('green', 'blue', 'yellow', 'red');
                    cursor.classList.add('red');
                }
            }
        });
        
        if (!currentInsideSocialIcon && isInsideSocialIcon) {
            isInsideSocialIcon = false;
            cursor.classList.remove('red');
            
            // Restore appropriate color
            if (isInsideNameBox) {
                cursor.classList.add('blue');
            } else {
                cursor.classList.add('green');
            }
        }
        
        // Only check name box if not inside social icon
        if (!isInsideSocialIcon) {
            if (nameBox) {
                const boxRect = nameBox.getBoundingClientRect();
                
                if (
                    mouseX >= boxRect.left &&
                    mouseX <= boxRect.right &&
                    mouseY >= boxRect.top &&
                    mouseY <= boxRect.bottom
                ) {
                    if (!isInsideNameBox) {
                        isInsideNameBox = true;
                        nameHighlight.style.opacity = '0.5';
                        cursor.classList.remove('green', 'yellow', 'red');
                        cursor.classList.add('blue');
                    }
                } else {
                    if (isInsideNameBox) {
                        isInsideNameBox = false;
                        nameHighlight.style.opacity = '0';
                        cursor.classList.remove('blue');
                        cursor.classList.add('green');
                    }
                }
            }
        }
    });
    
    // Handle cursor size
    document.addEventListener('mousedown', () => {
        if (!cursorSizeSmall) {
            cursor.style.width = '80px';
            cursor.style.height = '80px';
            cursorSizeSmall = true;
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (cursorSizeSmall) {
            cursor.style.width = '100px';
            cursor.style.height = '100px';
            cursorSizeSmall = false;
        }
    });
    
    // Handle cursor hide when it leaves the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            isActive = false;
            cursor.style.opacity = '0';
        }
    });
}

// Initialize Discover More button
function initDiscoverMore() {
    const discoverBtn = document.querySelector('.discover-more');
    const educationSection = document.getElementById('education');
    
    discoverBtn.addEventListener('click', () => {
        educationSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Add floating particles to hero section
function addHeroParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // Add particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1; // 1-5px
        const posX = Math.random() * 100; // 0-100%
        const posY = Math.random() * 100; // 0-100%
        const delay = Math.random() * 5; // 0-5s
        const duration = Math.random() * 10 + 10; // 10-20s
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
    
    // Add to hero
    hero.appendChild(particlesContainer);
}

// Add custom CSS for particles
function addParticlesStyle() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }
        
        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle 15s infinite linear;
            opacity: 0;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) translateX(20vw);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleEl);
}

// Initialize the Bootstrap tooltips and popovers if any are used
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize Bootstrap popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
});

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize functions
    renderSkills();
    renderProjects();
    initCursorGlow();
    
    // Set initial cursor color to green
    const cursor = document.querySelector('.cursor-glow');
    if (cursor) {
        cursor.classList.add('green');
    }
    
    // Run initial text rotation to set the first rotating text
    if (rotatingTextElement) {
        rotatingTextElement.textContent = rotatingTexts[0];
        rotatingTextElement.style.animation = 'fadeInUp 0.5s forwards';
    }
    
    // Initialize other elements
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Initialize discover more button
    initDiscoverMore();
    
    // Add particles to hero section
    addHeroParticles();
    addParticlesStyle();
}); 