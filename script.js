// ── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileMenuToggle.classList.toggle('open', isOpen);
  mobileMenuToggle.setAttribute('aria-expanded', isOpen);
  mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenuToggle.classList.remove('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Open menu');
  });
});

// ── Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});
themeToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') themeToggle.click();
});

// ── Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .timeline-item');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ── Mobile-friendly custom select
const customSelects = document.querySelectorAll('.custom-select');
customSelects.forEach((select) => {
  const trigger = select.querySelector('.custom-select-trigger');
  const valueText = select.querySelector('.custom-select-value');
  const options = select.querySelectorAll('.custom-select-option');

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = select.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      if (valueText) {
        valueText.textContent = option.textContent.trim();
      }
      select.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
});

document.addEventListener('click', () => {
  customSelects.forEach((select) => {
    select.classList.remove('open');
    const trigger = select.querySelector('.custom-select-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
});

// ── Mobile gallery navigation
const galleryGrid = document.getElementById('galleryGrid');
const galleryNavButtons = document.querySelectorAll('.gallery-nav');

if (galleryGrid) {
  galleryNavButtons.forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.classList.contains('gallery-nav-right') ? 1 : -1;
      galleryGrid.scrollBy({ left: direction * galleryGrid.clientWidth * 0.9, behavior: 'smooth' });
    });
  });
}
