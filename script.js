// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize all components
    initDarkMode();
    initMobileMenu();
    initModal();
    initBackToTop();
    initProjectFilter();
    initSmoothScrolling();
    initAnimations();
});

/**
 * Initialize animations using Intersection Observer
 */
function initAnimations() {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize dark mode toggle with system preference detection
 */
function initDarkMode() {
    const toggleButton = document.getElementById('toggleButton');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply dark mode if enabled in localStorage or system preference
    const applyDarkMode = (shouldApply) => {
        if (shouldApply) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // Initial setup
    const darkModeSetting = localStorage.getItem('darkMode');
    if (darkModeSetting === 'enabled' || (darkModeSetting === null && prefersDarkScheme.matches)) {
        applyDarkMode(true);
    }

    // Toggle dark mode on button click
    toggleButton.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark-mode');
        applyDarkMode(!isDark);
    });

    // Watch for system preference changes
    prefersDarkScheme.addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            applyDarkMode(e.matches);
        }
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');
    
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/**
 * Initialize modal dialog functionality
 */
function initModal() {
    const modal = document.getElementById('about_modal');
    const viewMoreBtn = document.getElementById('view_more');
    const closeBtn = document.querySelector('.close');
    
    const toggleModal = (show) => {
        if (show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });

    closeBtn.addEventListener('click', () => toggleModal(false));
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal(false);
        }
    });
}

/**
 * Initialize back-to-top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    const toggleVisibility = () => {
        backToTopBtn.classList.toggle('active', window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial check
    toggleVisibility();
}

/**
 * Initialize project filtering system
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filterValue = this.dataset.filter;
            projectCards.forEach(card => {
                card.style.display = filterValue === 'all' || card.dataset.category === filterValue 
                    ? 'block' 
                    : 'none';
            });
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}