/* ============================================================
   MyPortfolio — Interactions
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initScrollProgress();
    initRevealOnScroll();
    initCounters();
    initSkillBars();
    initScrollSpy();
    initBackToTop();
    initYear();
    initContactForm();
});

/* ---------------- Preloader ---------------- */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hide'), 300);
    });
    // Fallback so it never blocks content
    setTimeout(() => preloader.classList.add('hide'), 2500);
}

/* ---------------- Custom cursor ---------------- */
function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    const loop = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('grow'));
        el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
    });
}

/* ---------------- Navbar scrolled state ---------------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
}

/* ---------------- Mobile menu ---------------- */
function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });
}

/* ---------------- Typewriter effect ---------------- */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Full-Stack Web Developer',
        'Android Developer',
        'Software Engineer',
        'IoT Enthusiast',
        'Problem Solver',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
        const current = phrases[phraseIndex];
        if (!deleting) {
            charIndex++;
            el.textContent = current.substring(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
            setTimeout(type, 70);
        } else {
            charIndex--;
            el.textContent = current.substring(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 350);
                return;
            }
            setTimeout(type, 40);
        }
    };
    type();
}

/* ---------------- Scroll progress bar ---------------- */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
}

/* ---------------- Reveal on scroll ---------------- */
function initRevealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

/* ---------------- Animated counters ---------------- */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animate = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1500;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(el => observer.observe(el));
}

/* ---------------- Skill bars ---------------- */
function initSkillBars() {
    const bars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

/* ---------------- Scroll spy (active nav link) ---------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
}

/* ---------------- Back to top ---------------- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    const onScroll = () => {
        if (window.scrollY > 500) {
            btn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none');
        }
    };
    window.addEventListener('scroll', onScroll);
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
}

/* ---------------- Footer year ---------------- */
function initYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

/* ---------------- Contact form (mailto fallback) ---------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) return;

        const btn = document.getElementById('form-submit');
        const text = document.getElementById('form-text');
        const icon = document.getElementById('form-icon');
        const status = document.getElementById('form-status');

        text.textContent = 'Preparing...';
        icon.className = 'fa-solid fa-spinner fa-spin ml-2';
        btn.disabled = true;

        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        const mailto = `mailto:mahissarasenanayaka@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        setTimeout(() => {
            window.location.href = mailto;
            text.textContent = 'Message Ready!';
            icon.className = 'fa-solid fa-paper-plane ml-2';
            status.textContent = 'Your email client should open now. Or reach me directly at mahissarasenanayaka@gmail.com';
            status.classList.remove('hidden');
            status.classList.add('text-cyan-300');
            btn.disabled = false;
            form.reset();
            setTimeout(() => {
                status.classList.add('hidden');
            }, 8000);
        }, 900);
    });
}
