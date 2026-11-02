'use strict';

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

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

const desktopLinks = [...document.querySelectorAll('.desktop-nav a')];
const dockLinks = [...document.querySelectorAll('.bottom-dock a')];
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      desktopLinks.forEach(link => link.toggleAttribute('aria-current', link.hash === `#${id}`));
      dockLinks.forEach(link => link.toggleAttribute('aria-current', link.hash === `#${id}`));
    });
  }, { rootMargin: '-30% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}

let revealObserver;
if ('IntersectionObserver' in window && !motionPreference.matches) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.body.classList.add('motion-enabled');
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    document.body.classList.remove('motion-enabled');
    revealObserver?.disconnect();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

const terminalLines = [...document.querySelectorAll('.terminal-lines')];
const terminalCode = [
  '08:41:22  SYN  185.91.xx.xx  ->  :443',
  '08:41:23  RATE LIMIT / EDGE-NODE-03',
  '08:41:24  BLOCK  10,284 PACKETS',
  '08:41:25  WAF RULE 942100 MATCH',
  '08:41:26  TRACE  TCP / TLS / HTTP2',
  '08:41:27  ALERT  BURST TRAFFIC DETECTED',
  '08:41:28  MITIGATION ROUTE ENABLED',
  '08:41:29  STATUS  SERVICE HEALTHY'
];

terminalLines.forEach((terminal, terminalIndex) => {
  terminal.innerHTML = terminalCode.map((line, lineIndex) => `<span style="--line:${lineIndex + terminalIndex}">${line}</span>`).join('');
});

const world = document.querySelector('#cursor-world');
const worldContext = world.getContext('2d');
const worldMotion = !motionPreference.matches && window.matchMedia('(pointer: fine)').matches;
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 };
const scrollState = { value: window.scrollY, target: window.scrollY };
const stars = [];
const starCount = Math.min(150, Math.max(80, Math.floor(window.innerWidth / 9)));

function resizeWorld() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  world.width = window.innerWidth * ratio;
  world.height = window.innerHeight * ratio;
  worldContext.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createStar() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    z: Math.random(),
    speed: 0.08 + Math.random() * 0.24,
    size: 0.5 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2
  };
}

function drawOrbit(context, centerX, centerY, radiusX, radiusY, rotation, color, width = 1) {
  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotation);
  context.beginPath();
  context.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.stroke();
  context.restore();
}

function drawSatellite(context, centerX, centerY, angle, distance, size, color) {
  const x = centerX + Math.cos(angle) * distance;
  const y = centerY + Math.sin(angle) * distance * 0.42;
  context.save();
  context.translate(x, y);
  context.rotate(angle + Math.PI / 2);
  context.strokeStyle = color;
  context.fillStyle = 'rgba(17,18,20,.9)';
  context.shadowBlur = 16;
  context.shadowColor = color;
  context.fillRect(-size / 2, -size / 2, size, size);
  context.strokeRect(-size / 2, -size / 2, size, size);
  context.fillStyle = color;
  context.fillRect(-size * 1.7, -size * .15, size * .85, size * .3);
  context.fillRect(size * .85, -size * .15, size * .85, size * .3);
  context.restore();
}

function drawWorld(time) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  pointer.x += (pointer.targetX - pointer.x) * 0.08;
  pointer.y += (pointer.targetY - pointer.y) * 0.08;
  scrollState.value += (scrollState.target - scrollState.value) * 0.06;
  worldContext.clearRect(0, 0, width, height);
  const pointerOffsetX = (pointer.x - width / 2) * 0.018;
  const pointerOffsetY = (pointer.y - height / 2) * 0.018;
  const scrollDistance = Math.max(document.documentElement.scrollHeight - height, 1);
  const scrollProgress = Math.min(scrollState.value / scrollDistance, 1);
  const planetX = width * (0.73 - scrollProgress * 0.24) + pointerOffsetX;
  const planetY = height * (0.43 + Math.sin(scrollProgress * Math.PI) * 0.12) + pointerOffsetY;
  const planetRadius = Math.min(190, Math.max(125, width * 0.15)) * (1 - scrollProgress * 0.22);
  const cameraTilt = scrollProgress * Math.PI * 0.9;

  const backgroundGlow = worldContext.createRadialGradient(planetX, planetY, 0, planetX, planetY, planetRadius * 2.3);
  backgroundGlow.addColorStop(0, 'rgba(55,216,223,.15)');
  backgroundGlow.addColorStop(.4, 'rgba(76,72,255,.07)');
  backgroundGlow.addColorStop(1, 'rgba(17,18,20,0)');
  worldContext.fillStyle = backgroundGlow;
  worldContext.fillRect(planetX - planetRadius * 2.3, planetY - planetRadius * 2.3, planetRadius * 4.6, planetRadius * 4.6);

  stars.forEach(star => {
    star.y -= star.speed;
    if (star.y < -10) {
      star.y = height + 10;
      star.x = Math.random() * width;
    }
    const depth = .3 + star.z * 1.2;
    const x = star.x + pointerOffsetX * star.z * 2 + Math.sin(cameraTilt + star.phase) * scrollProgress * 70 * star.z;
    const y = star.y + pointerOffsetY * star.z * 2 - scrollProgress * 45 * star.z;
    worldContext.beginPath();
    worldContext.fillStyle = `rgba(${star.z > .6 ? '255,114,189' : '126,228,255'},${.15 + star.z * .65})`;
    worldContext.arc(x, y, star.size * depth, 0, Math.PI * 2);
    worldContext.fill();
  });

  const planet = worldContext.createRadialGradient(planetX - planetRadius * .35, planetY - planetRadius * .4, planetRadius * .1, planetX, planetY, planetRadius * 1.1);
  planet.addColorStop(0, '#8a73ff');
  planet.addColorStop(.42, '#3532a1');
  planet.addColorStop(.8, '#131b58');
  planet.addColorStop(1, '#080d28');
  worldContext.save();
  worldContext.shadowBlur = 38;
  worldContext.shadowColor = 'rgba(55,216,223,.65)';
  worldContext.beginPath();
  worldContext.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
  worldContext.fillStyle = planet;
  worldContext.fill();
  worldContext.restore();

  worldContext.save();
  worldContext.beginPath();
  worldContext.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
  worldContext.clip();
  worldContext.globalAlpha = .45;
  for (let index = -3; index <= 3; index += 1) {
    drawOrbit(worldContext, planetX, planetY + index * planetRadius * .15, planetRadius * .92, planetRadius * (.16 + Math.abs(index) * .04), Math.sin(time * .0002) + index * .12, index % 2 ? '#ff72bd' : '#55e4ff');
  }
  worldContext.globalAlpha = .2;
  for (let index = 0; index < 8; index += 1) {
    const longitude = planetX - planetRadius + ((index * 47 + time * .02) % (planetRadius * 2));
    worldContext.beginPath();
    worldContext.strokeStyle = '#71dfff';
    worldContext.ellipse(longitude, planetY, planetRadius * .08, planetRadius, 0, 0, Math.PI * 2);
    worldContext.stroke();
  }
  worldContext.restore();

  drawOrbit(worldContext, planetX, planetY, planetRadius * 1.65, planetRadius * .42, -.28 + cameraTilt, 'rgba(255,114,189,.8)', 2);
  drawOrbit(worldContext, planetX, planetY, planetRadius * 1.8, planetRadius * .5, -.28 + cameraTilt, 'rgba(55,216,223,.3)');
  drawSatellite(worldContext, planetX, planetY, time * .0007 + cameraTilt, planetRadius * 1.65, 12, '#ff72bd');
  drawSatellite(worldContext, planetX, planetY, time * -.00045 + 2.5 - cameraTilt, planetRadius * 1.8, 8, '#55e4ff');

  const cursorGlow = worldContext.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180);
  cursorGlow.addColorStop(0, 'rgba(255,114,189,.28)');
  cursorGlow.addColorStop(.3, 'rgba(55,216,223,.1)');
  cursorGlow.addColorStop(1, 'rgba(17,18,20,0)');
  worldContext.fillStyle = cursorGlow;
  worldContext.fillRect(pointer.x - 180, pointer.y - 180, 360, 360);
  requestAnimationFrame(drawWorld);
}

if (worldMotion) {
  resizeWorld();
  for (let index = 0; index < starCount; index += 1) stars.push(createStar());
  window.addEventListener('pointermove', event => {
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
  }, { passive: true });
  window.addEventListener('scroll', () => {
    scrollState.target = window.scrollY;
  }, { passive: true });
  window.addEventListener('resize', resizeWorld, { passive: true });
  requestAnimationFrame(drawWorld);
} else {
  world.remove();
}
