'use strict';

// Native browser APIs keep the portfolio fast and usable without a build step.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia('(min-width: 721px)');

function closeMenu(restoreFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '−' : '+';
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!header.contains(event.target) && !mobileNav.hidden) closeMenu();
});
desktop.addEventListener('change', () => closeMenu());

let scheduled = false;
function renderScroll() {
  header.classList.toggle('scrolled', window.scrollY > 30);
  if (!motionPreference.matches && desktop.matches && window.scrollY < hero.offsetHeight) {
    heroImage.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.02)`;
  } else {
    heroImage.style.transform = '';
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; window.requestAnimationFrame(renderScroll); }
}, { passive: true });
window.addEventListener('resize', renderScroll, { passive: true });
renderScroll();

// Content remains visible if JavaScript or IntersectionObserver is unavailable.
let revealObserver;
if ('IntersectionObserver' in window && !motionPreference.matches) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  document.body.classList.add('motion-enabled');
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    document.body.classList.remove('motion-enabled');
    revealObserver?.disconnect();
  }
  renderScroll();
});

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.desktop-nav a')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
