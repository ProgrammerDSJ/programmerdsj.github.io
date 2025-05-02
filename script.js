// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Rotating text animation with CSS
function initRotatingText() {
    // Ensure we only initialize once
    const rotatingTextWrapper = document.querySelector('.rotating-text-wrapper');
    rotatingTextWrapper.innerHTML = ''; // Clear any existing content
    
    const roles = [
        "An Entrepreneur",
        "An Artist",
        "A Fitness Freak",
        "A Content Creator",
        "A Developer"
    ];
    
    // Calculate total animation duration for proper loop
    const animationDuration = roles.length * 0.75;
    
    // Create individual text elements with proper animation delays
    roles.forEach((role, index) => {
        const textElement = document.createElement('span');
        textElement.className = 'rotating-text-item';
        textElement.textContent = role;
        
        // Set animation delay (0.75s intervals) for smooth sequence
        const delay = index * 0.75;
        textElement.style.animationDelay = `${delay}s`;
        
        // Set the same total duration for all elements to create a perfect loop
        textElement.style.animationDuration = `${animationDuration}s`;
        
        rotatingTextWrapper.appendChild(textElement);
    });
    
    // Log for debugging
    console.log("Rotating text initialized with " + roles.length + " items");
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skills Data - Updated with categories and proficiency levels
const skillsData = {
    "Languages & Core": [
        { name: "Python", icon: "fab fa-python", color: "#3776AB", level: "expert" },
        { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E", level: "advanced" },
        { name: "TypeScript", icon: "fab fa-js", color: "#007ACC", level: "advanced" },
        { name: "Java", icon: "fab fa-java", color: "#007396", level: "intermediate" }
    ],
    "Frontend & UI": [
        { name: "React", icon: "fab fa-react", color: "#61DAFB", level: "advanced" },
        { name: "Next.js", icon: "fab fa-react", color: "#000000", level: "advanced" },
        { name: "Tailwind CSS", icon: "fab fa-css3-alt", color: "#38B2AC", level: "advanced" },
        { name: "HTML5", icon: "fab fa-html5", color: "#E34F26", level: "expert" }
    ],
    "Backend & Database": [
        { name: "Node.js", icon: "fab fa-node-js", color: "#339933", level: "advanced" },
        { name: "Django", icon: "fab fa-python", color: "#092E20", level: "advanced" },
        { name: "MongoDB", icon: "fas fa-database", color: "#47A248", level: "intermediate" },
        { name: "PostgreSQL", icon: "fas fa-database", color: "#336791", level: "intermediate" }
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
        image: './todo-list.png',
        technologies: ['Android', 'Java', 'SQLite'],
        link: 'project-view.html'
    },
    {
        title: 'Personal Finance Management App',
        description: 'A webapp that studies your spending patterns and uses AI to recommend ways to reach your financial goals efficiently.',
        image: './fineasy.png',
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
        if (category.includes('Frontend')) categoryIcon = 'fas fa-desktop';
        if (category.includes('Backend')) categoryIcon = 'fas fa-server';
        
        categoryHeader.innerHTML = `<i class="${categoryIcon}"></i> ${category}`;
        categorySection.appendChild(categoryHeader);
        
        // Create skills grid for this category
        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-grid';
        
        // Add skills to this category
        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = `skill-card ${skill.level}`;
            
            // Create skill content
            skillCard.innerHTML = `
                <div class="skill-icon" style="color: ${skill.color}">
                    <i class="${skill.icon}"></i>
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
}

// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = ''; // Clear existing content
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Create tech badges HTML
        const techBadges = project.technologies.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${techBadges}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Add 'View All Projects' button
    const projectsSection = document.querySelector('#projects .container');
    const viewAllContainer = document.createElement('div');
    viewAllContainer.className = 'view-all-container';
    viewAllContainer.innerHTML = `
        <a href="project-gallery.html" class="btn">View All Projects</a>
    `;
    projectsSection.appendChild(viewAllContainer);
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
        
        // Check if cursor is inside name box
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
                    cursor.classList.add('blue');
                    cursor.classList.remove('red');
                    nameHighlight.style.opacity = '1';
                    
                    // Update highlight position relative to mouse
                    const relativeX = mouseX - boxRect.left;
                    const relativeY = mouseY - boxRect.top;
                    const centerX = boxRect.width / 2;
                    const centerY = boxRect.height / 2;
                    
                    // Calculate distance from center (normalized)
                    const distX = (relativeX - centerX) / centerX;
                    const distY = (relativeY - centerY) / centerY;
                    
                    // Move highlight slightly based on mouse position
                    nameHighlight.style.background = `radial-gradient(
                        ellipse at ${50 + distX * 20}% ${50 + distY * 20}%, 
                        rgba(96, 165, 250, 0.4) 0%, 
                        transparent 80%
                    )`;
                    
                    if (!cursorSizeSmall) {
                        cursor.style.width = '100px';
                        cursor.style.height = '100px';
                    }
                } else {
                    // Continue updating highlight position
                    const relativeX = mouseX - boxRect.left;
                    const relativeY = mouseY - boxRect.top;
                    const centerX = boxRect.width / 2;
                    const centerY = boxRect.height / 2;
                    
                    // Calculate distance from center (normalized)
                    const distX = (relativeX - centerX) / centerX;
                    const distY = (relativeY - centerY) / centerY;
                    
                    // Move highlight slightly based on mouse position
                    nameHighlight.style.background = `radial-gradient(
                        ellipse at ${50 + distX * 20}% ${50 + distY * 20}%, 
                        rgba(96, 165, 250, 0.4) 0%, 
                        transparent 80%
                    )`;
                }
            } else {
                if (isInsideNameBox) {
                    isInsideNameBox = false;
                    cursor.classList.remove('blue');
                    nameHighlight.style.opacity = '0';
                    
                    if (!cursorSizeSmall && !isInsideSocialIcon) {
                        cursor.style.width = '100px';
                        cursor.style.height = '100px';
                    }
                }
            }
        }
        
        // Check if cursor is inside any social icon
        let foundSocialIcon = false;
        socialLinks.forEach(link => {
            const linkRect = link.getBoundingClientRect();
            
            if (
                mouseX >= linkRect.left &&
                mouseX <= linkRect.right &&
                mouseY >= linkRect.top &&
                mouseY <= linkRect.bottom
            ) {
                foundSocialIcon = true;
                if (!isInsideSocialIcon) {
                    isInsideSocialIcon = true;
                    cursor.classList.add('red');
                    cursor.classList.remove('blue');
                    
                    if (!cursorSizeSmall) {
                        cursor.style.width = '100px';
                        cursor.style.height = '100px';
                    }
                }
            }
        });
        
        if (!foundSocialIcon && isInsideSocialIcon) {
            isInsideSocialIcon = false;
            cursor.classList.remove('red');
            
            if (!cursorSizeSmall && !isInsideNameBox) {
                cursor.style.width = '100px';
                cursor.style.height = '100px';
            }
        }
    });
    
    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
        isActive = false;
        cursor.style.opacity = '0';
    });
    
    // Shrink on mouse down
    document.addEventListener('mousedown', () => {
        cursorSizeSmall = true;
        cursor.style.width = '80px';
        cursor.style.height = '80px';
    });
    
    // Return to normal on mouse up
    document.addEventListener('mouseup', () => {
        cursorSizeSmall = false;
        
        if (isInsideNameBox || isInsideSocialIcon) {
            cursor.style.width = '100px';
            cursor.style.height = '100px';
        } else {
            cursor.style.width = '100px';
            cursor.style.height = '100px';
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    initCursorGlow();
    initDiscoverMore();
    addParticlesStyle();
    addHeroParticles();
    initRotatingText();
}); 