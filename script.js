// Particle system
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.life <= 0 || this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
            this.reset();
        }
    }

    draw() {
        const alpha = this.life / this.maxLife;
        this.ctx.save();
        this.ctx.globalAlpha = alpha * 0.3;
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}

// Initialize particles
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    document.querySelector('.particles').appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    function animate() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Smooth scrolling for CTA button
function initSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    const appsSection = document.querySelector('.apps');

    ctaButton.addEventListener('click', () => {
        appsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Mouse movement effects
function initMouseEffects() {
    const orb = document.querySelector('.orb');
    const appCards = document.querySelectorAll('.app-card');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create subtle hover effect following mouse
        createHoverEffect(e.clientX, e.clientY);
    });

    function updateOrb() {
        if (orb) {
            const rect = orb.getBoundingClientRect();
            const orbCenterX = rect.left + rect.width / 2;
            const orbCenterY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - orbCenterX) * 0.02;
            const deltaY = (mouseY - orbCenterY) * 0.02;
            
            // Use CSS custom properties to avoid overriding animations
            orb.style.setProperty('--mouse-x', `${deltaX}px`);
            orb.style.setProperty('--mouse-y', `${deltaY}px`);
        }
        requestAnimationFrame(updateOrb);
    }

    // Subtle hover effect following mouse
    function createHoverEffect(x, y) {
        appCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(x - cardCenterX, 2) + Math.pow(y - cardCenterY, 2)
            );
            
            const maxDistance = 200;
            const intensity = Math.max(0, 1 - distance / maxDistance);
            
            if (intensity > 0.5) {
                card.style.transform = `translateY(-2px)`;
            } else {
                card.style.transform = `translateY(0px)`;
            }
        });
    }

    updateOrb();
}

// App card hover effects
function initAppCardEffects() {
    const appCards = document.querySelectorAll('.app-card');

    appCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe app cards
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initSmoothScroll();
    initMouseEffects();
    initAppCardEffects();
    initScrollAnimations();
});

// Add some dynamic flame effects
function initFlameEffects() {
    const flame = document.querySelector('.flame');
    const flameGlow = document.querySelector('.flame-glow');

    if (flame && flameGlow) {
        setInterval(() => {
            const intensity = Math.random() * 0.3 + 0.7;
            flame.style.transform = `translateX(-50%) scale(${intensity}) rotate(${(Math.random() - 0.5) * 10}deg)`;
            flameGlow.style.opacity = intensity;
        }, 100);
    }
}

// Initialize flame effects after a short delay
setTimeout(initFlameEffects, 1000);
