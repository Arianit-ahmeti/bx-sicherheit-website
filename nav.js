// Sticky header – hide on scroll down, show on scroll up
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (document.body.classList.contains('nav-open')) return;

  const current = window.scrollY;
  header.classList.toggle('scrolled', current > 50);

  if (current > lastScroll && current > 300) {
    header.classList.add('nav-hidden');
  } else {
    header.classList.remove('nav-hidden');
  }
  lastScroll = current;
});

// Hamburger + Overlay
const hamburger   = document.getElementById('hamburger');
const navOverlay  = document.getElementById('navOverlay');

hamburger.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  navOverlay.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Links im Overlay schließen das Menü
function closeNav() {
  document.body.classList.remove('nav-open');
  navOverlay.classList.remove('open');
  hamburger.setAttribute('aria-label', 'Menü öffnen');
}

document.querySelectorAll('.overlay-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
