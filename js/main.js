/**
 * Fitness Pro - Main JavaScript Module
 * Integrates all modules and handles global functionality
 */

class FitnessPro {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupScrollEffects();
    this.setupIntersectionObserver();
    this.setupServiceWorker();
    this.setupOfflineHandling();
    this.setupErrorHandling();
    
    // Initialize modules are handled by their respective files
    console.log('🏋️ Fitness Pro initialized successfully!');
  }

  setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        
        // Update active state
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu if open
        this.closeMobileMenu();
      });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        const navList = document.querySelector('.nav__list');
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('nav__list--open');
      });
    }
  }

  closeMobileMenu() {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle && navList.classList.contains('nav__list--open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('nav__list--open');
    }
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const elementPosition = element.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
  }

  setupScrollEffects() {
    // Header shadow on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add shadow to header when scrolled
      if (scrollTop > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      
      // Hide/show header on scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      
      lastScrollTop = scrollTop;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero__illustration');
        if (parallax) {
          const speed = 0.5;
          parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    }
  }

  setupIntersectionObserver() {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section, .card, .stat-card').forEach(el => {
      observer.observe(el);
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });
    }
  }

  setupOfflineHandling() {
    // Show offline indicator
    window.addEventListener('online', () => {
      this.hideOfflineIndicator();
    });

    window.addEventListener('offline', () => {
      this.showOfflineIndicator();
    });

    // Check initial state
    if (!navigator.onLine) {
      this.showOfflineIndicator();
    }
  }

  showOfflineIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    indicator.innerHTML = `
      <i class="fas fa-wifi" aria-hidden="true"></i>
      <span>Você está offline</span>
    `;
    document.body.appendChild(indicator);
    
    setTimeout(() => indicator.classList.add('show'), 100);
  }

  hideOfflineIndicator() {
    const indicator = document.querySelector('.offline-indicator');
    if (indicator) {
      indicator.classList.remove('show');
      setTimeout(() => indicator.remove(), 300);
    }
  }

  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.showErrorNotification('Ocorreu um erro. Por favor, recarregue a página.');
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.showErrorNotification('Ocorreu um erro inesperado.');
    });
  }

  showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
      <span>${message}</span>
      <button class="error-notification__close" aria-label="Fechar notificação">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      notification.classList.add('hide');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.error-notification__close').addEventListener('click', () => {
      notification.classList.add('hide');
      setTimeout(() => notification.remove(), 300);
    });
  }

  // Utility methods
  static formatNumber(number, decimals = 1) {
    return Number(number).toFixed(decimals);
  }

  static formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  static debounce(func, wait) {
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

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Global utility functions
window.scrollToSection = function(sectionId) {
  const fitnessPro = new FitnessPro();
  fitnessPro.scrollToSection(sectionId);
};

window.formatNumber = FitnessPro.formatNumber;
window.formatTime = FitnessPro.formatTime;
window.debounce = FitnessPro.debounce;
window.throttle = FitnessPro.throttle;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.fitnessPro = new FitnessPro();
  
  // Add loading state management
  document.body.classList.add('loaded');
  
  // Remove loading indicator after everything is ready
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 300);
    }
  }, 1000);
});

// Add CSS for enhancements
const mainStyles = `
  /* Header enhancements */
  .header--scrolled {
    box-shadow: var(--shadow-lg);
  }
  
  .header--hidden {
    transform: translateY(-100%);
  }
  
  .header {
    transition: all var(--transition-normal);
  }
  
  /* Offline indicator */
  .offline-indicator {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-warning);
    color: var(--color-white);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-tooltip);
    transform: translateX(100%);
    transition: transform var(--transition-normal);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .offline-indicator.show {
    transform: translateX(0);
  }
  
  /* Error notification */
  .error-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-danger);
    color: var(--color-white);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-tooltip);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: slideInRight var(--transition-normal);
  }
  
  .error-notification.hide {
    animation: slideOutRight var(--transition-normal);
  }
  
  .error-notification__close {
    background: none;
    border: none;
    color: var(--color-white);
    cursor: pointer;
    margin-left: auto;
    padding: 0.25rem;
    border-radius: var(--radius-sm);
    transition: background-color var(--transition-fast);
  }
  
  .error-notification__close:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  /* Animations */
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-in {
    animation: fadeIn var(--transition-normal) ease-out;
  }
  
  /* Loading states */
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
    transition: opacity var(--transition-normal);
  }
  
  .page-loader.fade-out {
    opacity: 0;
  }
  
  .page-loader::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  body:not(.loaded) .main {
    opacity: 0;
  }
  
  body.loaded .main {
    opacity: 1;
    transition: opacity var(--transition-normal);
  }
`;

// Add styles to document - avoid conflicts with other modules
const mainStyleSheet = document.createElement('style');
mainStyleSheet.textContent = mainStyles;
document.head.appendChild(mainStyleSheet);