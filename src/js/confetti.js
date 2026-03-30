/**
 * confetti.js
 * Canvas-based confetti particle system.
 */

const COLORS = ['#e8c96b', '#f07a99', '#a78bfa', '#5eead4', '#f0a858', '#ffffff'];

let canvas, ctx, particles = [], animId = null;

function init() {
  canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
}

function resize() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle(x, y) {
  return {
    x,
    y,
    vx:        (Math.random() - 0.5) * 12,
    vy:        -(Math.random() * 14 + 4),
    color:     COLORS[Math.floor(Math.random() * COLORS.length)],
    size:      Math.random() * 7 + 3,
    rotation:  Math.random() * 360,
    rotSpeed:  (Math.random() - 0.5) * 12,
    gravity:   0.45,
    life:      1,
    decay:     Math.random() * 0.014 + 0.007,
    isRect:    Math.random() > 0.5,
  };
}

function burst(x, y, count = 70) {
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(x, y));
  }
  if (!animId) tick();
}

function burstCenter(count = 80) {
  const x = window.innerWidth  / 2;
  const y = window.innerHeight / 2;
  for (let i = 0; i < 4; i++) {
    setTimeout(() => burst(
      x + (Math.random() - 0.5) * 300,
      y + (Math.random() - 0.5) * 300,
      count,
    ), i * 180);
  }
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += p.gravity;
    p.rotation += p.rotSpeed;
    p.life -= p.decay;

    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.fillStyle   = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    if (p.isRect) {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (particles.length > 0) {
    animId = requestAnimationFrame(tick);
  } else {
    animId = null;
  }
}

export { init, burst, burstCenter };
