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



// ============================================
// TYPEWRITER EFFECT
// ============================================
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".type-cursor");

const textArray = ["Cybersecurity Analyst", "Cybersecurity Researcher", "Python Programmer", "Bug Bounty Hunter"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if(!typedTextSpan || !cursorSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if(!typedTextSpan || !cursorSpan) return;
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

function initTypewriter() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
}

if (document.readyState !== "loading") {
    initTypewriter();
} else {
    document.addEventListener("DOMContentLoaded", initTypewriter);
}

// ============================================
// MOBILE NAVIGATION MENU CONTROLLER
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close the navigation panel when user clicks an option
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close panel if clicked anywhere outside of the nav area
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}



// ============================================
// DRAG TO SCROLL FOR SLIDERS
// ============================================
const sliders = document.querySelectorAll('.projects-slider');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        // Temporarily disable scroll snapping while dragging for smoother feel
        slider.style.scrollSnapType = 'none';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
});

