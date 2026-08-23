/* ============================================================
   CHARAN SAI CHINTHALA — PORTFOLIO SCRIPT
   ============================================================ */

/* ── CANVAS STAR FIELD ─────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  const STAR_COUNT = 180;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, createStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.a += s.speed * s.dir;
      if (s.a > 1 || s.a < 0.1) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,200,100,${s.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

/* ── TYPEWRITER ───────────────────────────────────────────  */
(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const lines = [
    'Cloud Engineer in Training',
    'AWS Certified Cloud Practitioner',
    'IoT | Networking | Linux',
    'Aspiring Solutions Architect',
  ];

  let li = 0, ci = 0, deleting = false;

  function tick() {
    const current = lines[li];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 95);
  }

  tick();
})();

/* ── SCROLL-REVEAL ─────────────────────────────────────── */
(function scrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  els.forEach(el => io.observe(el));
})();

/* ── SKILL BARS ─────────────────────────────────────────── */
(function skillBars() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.pct + '%';
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.3 }
  );
  document.querySelectorAll('.skill-item').forEach(el => io.observe(el));
})();

/* ── XP / LEVEL BARS ────────────────────────────────────── */
(function xpBars() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        // global XP fill
        const xpFill = document.querySelector('.xp-fill');
        if (xpFill) xpFill.style.width = '42%';
        // individual level fills
        document.querySelectorAll('.level-progress-fill').forEach(el => {
          el.style.width = el.dataset.pct + '%';
        });
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.2 }
  );
  const aws = document.getElementById('aws');
  if (aws) io.observe(aws);
})();

/* ── NAV ACTIVE LINK ─────────────────────────────────────  */
(function navHighlight() {
  const sections = document.querySelectorAll('section[id], div[id="aws"], div[id="contact"]');
  const links    = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => io.observe(s));
})();

/* ── HAMBURGER ──────────────────────────────────────────── */
(function hamburger() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (!btn) return;
  btn.addEventListener('click', () => nav.classList.toggle('nav-mobile-open'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('nav-mobile-open'));
  });
})();

/* ── SMOOTH PARALLAX ────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const canvas = document.getElementById('canvas-bg');
  if (canvas) canvas.style.transform = `translateY(${y * 0.25}px)`;
});
