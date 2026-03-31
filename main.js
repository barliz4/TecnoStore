/* ===========================
   TECNO STORE – main.js
   =========================== */
 
// ── CUSTOM CURSOR ──────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = -100, my = -100, rx = -100, ry = -100;
 
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
 
document.querySelectorAll('a, button, .product-card, .phone-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
});
 
function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
 
// ── PARTICLES ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
 
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
const particles = Array.from({ length: 60 }, () => ({
  x:  Math.random() * canvas.width,
  y:  Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  r:  Math.random() * 1.5 + 0.3,
  o:  Math.random() * 0.5 + 0.1
}));
 
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0)              p.x = canvas.width;
    if (p.x > canvas.width)   p.x = 0;
    if (p.y < 0)              p.y = canvas.height;
    if (p.y > canvas.height)  p.y = 0;
 
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,229,255,${p.o})`;
    ctx.fill();
 
    // Connect nearby particles
    particles.slice(i + 1).forEach(p2 => {
      const d = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0,229,255,${0.04 * (1 - d / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
 
  requestAnimationFrame(drawParticles);
}
drawParticles();
 
// ── SCROLL-IN CARDS ────────────────────────────────────────────────────────
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
 
document.querySelectorAll('.product-card').forEach(c => cardObserver.observe(c));
 
// ── COUNTER ANIMATION ──────────────────────────────────────────────────────
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    let count = 0;
    const step  = target / 60;
 
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count) + suffix;
      if (count >= target) clearInterval(timer);
    }, 20);
 
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
 
document.querySelectorAll('[data-target]').forEach(c => counterObserver.observe(c));
 
// ── FLOATING SHAPES RANDOM POSITION ───────────────────────────────────────
document.querySelectorAll('.shape').forEach(s => {
  s.style.left = (Math.random() * 80 + 10) + '%';
  s.style.top  = (Math.random() * 80 + 10) + '%';
});