/* ============================================
   STUDYMATE - Interactive JavaScript
   Navigation, Forms, and Interactive Features
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================

const ctaButton = document.querySelector('.cta-button');
const navLinks = document.querySelectorAll('nav a');
const forms = document.querySelectorAll('form');
const featureCards = document.querySelectorAll('.feature');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeScrollAnimations();
    console.log('StudyMate App Initialized Successfully ✅');
});

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // CTA Button Click Handler
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCTAButtonClick);
        ctaButton.addEventListener('mouseenter', addButtonHoverEffect);
        ctaButton.addEventListener('mouseleave', removeButtonHoverEffect);
    }

    // Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Feature Cards Hover Effect
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => addCardHoverEffect(card, index));
        card.addEventListener('mouseleave', () => removeCardHoverEffect(card));
    });

    // Form Submission
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Window Scroll Events
    window.addEventListener('scroll', handleScrollEffects);
}

// ============================================
// CTA BUTTON HANDLERS
// ============================================

function handleCTAButtonClick() {
    console.log('🚀 Get Started button clicked!');
    showNotification('Welcome to StudyMate! Let\'s get started with your learning journey.', 'success');
    
    // Add animation class
    ctaButton.style.transform = 'scale(0.98)';
    setTimeout(() => {
        ctaButton.style.transform = '';
    }, 100);

    // Optional: Redirect or perform action
    // window.location.href = '/signup';
}

function addButtonHoverEffect() {
    ctaButton.style.transform = 'translateY(-3px)';
}

function removeButtonHoverEffect() {
    ctaButton.style.transform = '';
}

// ============================================
// NAVIGATION HANDLERS
// ============================================

function handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active navigation link
            updateActiveNavLink(e.currentTarget);
        }
    }
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ============================================
// FEATURE CARD HANDLERS
// ============================================

function addCardHoverEffect(card, index) {
    card.style.transform = 'translateY(-8px) scale(1.05)';
    card.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
    
    // Stagger animation for nearby cards
    const allCards = document.querySelectorAll('.feature');
    allCards.forEach((c, i) => {
        if (Math.abs(i - index) === 1) {
            c.style.opacity = '0.7';
        }
    });
}

function removeCardHoverEffect(card) {
    card.style.transform = '';
    card.style.boxShadow = '';
    
    document.querySelectorAll('.feature').forEach(c => {
        c.style.opacity = '1';
    });
}

// ============================================
// FORM HANDLERS
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm(e.target)) {
        console.log('📝 Form submitted successfully!');
        showNotification('Form submitted successfully! ✅', 'success');
        
        // Get form data
        const formData = new FormData(e.target);
        console.log('Form Data:', Object.fromEntries(formData));
        
        // Reset form
        setTimeout(() => {
            e.target.reset();
        }, 500);
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            highlightInvalidField(input);
        } else {
            removeFieldHighlight(input);
        }
    });

    return isValid;
}

function highlightInvalidField(field) {
    field.style.borderColor = '#f56565';
    field.style.boxShadow = '0 0 0 3px rgba(245, 101, 101, 0.1)';
}

function removeFieldHighlight(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
}

// ============================================
// SCROLL EFFECTS
// ============================================

function handleScrollEffects() {
    const scrollPosition = window.scrollY;

    // Add shadow to nav on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        if (scrollPosition > 50) {
            nav.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }

    // Reveal animations on scroll
    revealOnScroll();
}

function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .feature, section');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.card, .feature, section');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const notification = createNotificationElement(message, type);
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function createNotificationElement(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;

    // Add inline styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        max-width: 400px;
    `;

    return notification;
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    return icons[type] || icons.info;
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .notification.show {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-close {
        background: none;
        border: none;
        color: #718096;
        cursor: pointer;
        font-size: 18px;
        transition: color 0.3s ease;
        margin-left: 10px;
    }

    .notification-close:hover {
        color: #2d3748;
    }

    @media (max-width: 480px) {
        .notification {
            left: 10px !important;
            right: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to prevent excessive function calls
 */
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

/**
 * Throttle function to limit function call frequency
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('mobile-active');
}

/**
 * Get user's device type
 */
function getDeviceType() {
    if (window.innerWidth <= 480) return 'mobile';
    if (window.innerWidth <= 768) return 'tablet';
    return 'desktop';
}

/**
 * Store data in localStorage
 */
function storeUserData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`✅ Data stored: ${key}`);
    } catch (error) {
        console.error('Error storing data:', error);
    }
}

/**
 * Retrieve data from localStorage
 */
function getUserData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
}

// ============================================
// RESPONSIVE DESIGN HANDLER
// ============================================

const handleResize = debounce(() => {
    const deviceType = getDeviceType();
    console.log(`📱 Device Type: ${deviceType}`);
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================

window.StudyMate = {
    showNotification,
    toggleMobileMenu,
    getDeviceType,
    storeUserData,
    getUserData
};

console.log('🎓 StudyMate JavaScript loaded successfully!');
