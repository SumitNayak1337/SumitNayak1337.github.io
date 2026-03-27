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

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============================================
// PREMIUM CUSTOM CURSOR WITH PARTICLE TRAIL
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const cursorRing = document.querySelector('.cursor-ring');
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');

// Canvas setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;
let ringX = 0, ringY = 0;
let particles = [];
let isHovering = false;

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.color = isHovering ? '78, 205, 196' : '118, 171, 174';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
        ctx.shadowColor = `rgba(${this.color}, ${this.life * 0.5})`;
        ctx.shadowBlur = 10;
        ctx.fill();
    }
}

// Mouse tracking
let lastX = 0, lastY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    // Spawn particles based on mouse speed
    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 3) {
        const count = Math.min(Math.floor(speed / 5), 4);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }

    lastX = mouseX;
    lastY = mouseY;
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth cursor outline follow
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    // Even slower ring follow
    ringX += (mouseX - ringX) * 0.07;
    ringY += (mouseY - ringY) * 0.07;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    // Update and draw particles
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}
animate();

// Cursor hover states
const interactiveElements = document.querySelectorAll('a, button, .btn, .gallery-item, .cert-card, .project-card, .skill-category, .achievement-card, .strip-item, .floating-card, .resume-icon-box');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        isHovering = true;
        cursorDot.classList.add('cursor-hover');
        cursorOutline.classList.add('cursor-hover');
        cursorRing.classList.add('cursor-hover');
        // Burst of particles on enter
        for (let i = 0; i < 8; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    el.addEventListener('mouseleave', () => {
        isHovering = false;
        cursorDot.classList.remove('cursor-hover');
        cursorOutline.classList.remove('cursor-hover');
        cursorRing.classList.remove('cursor-hover');
    });
});

// Magnetic effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Card spotlight glow + 3D tilt
document.querySelectorAll('.project-card, .cert-card, .achievement-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 8;
        const tiltY = (x - 0.5) * -8;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Terminal typing effect
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
        line.style.transition = 'opacity 0.3s ease';
        line.style.opacity = '1';
    }, index * 200);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 23, 0.95)';
        navbar.style.borderBottomColor = 'rgba(118, 171, 174, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 23, 0.85)';
        navbar.style.borderBottomColor = 'rgba(118, 171, 174, 0.15)';
    }
});

// Email click handler — opens default mail client
document.querySelectorAll('[data-email]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const email = el.getAttribute('data-email');
        const mailLink = document.createElement('a');
        mailLink.href = 'mailto:' + email;
        mailLink.target = '_blank';
        document.body.appendChild(mailLink);
        mailLink.click();
        document.body.removeChild(mailLink);
    });
});

// Hide cursor elements on touch devices
if ('ontouchstart' in window) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    cursorRing.style.display = 'none';
    canvas.style.display = 'none';
}
