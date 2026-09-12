// Smooth scroll and scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-card, .project-card, .skill-category, .stat-card, .contact-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Animate stats on scroll
    const statCards = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                if (target > 0) {
                    animateNumber(el, 0, target, 2000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => {
        const cardParent = card.parentElement;
        cardParent.classList.add('fade-in');
        statsObserver.observe(cardParent);
    });
    
    function animateNumber(el, start, end, duration) {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // GitHub stats update via fetch
    async function updateStats() {
        try {
            const response = await fetch('https://api.github.com/users/nezifaloromi1');
            const data = await response.json();
            
            const reposEl = document.getElementById('statRepos');
            const starsEl = document.getElementById('statStars');
            const contribsEl = document.getElementById('statContributions');
            
            if (reposEl) reposEl.textContent = data.public_repos;
            if (starsEl) starsEl.textContent = data.public_gists + data.followers;
            if (contribsEl) contribsEl.textContent = data.contributions;
        } catch (e) {
            console.log('Could not fetch GitHub stats');
        }
    }
    
    updateStats();
});
