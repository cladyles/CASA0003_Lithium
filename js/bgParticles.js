// bgParticles.js

const canvas = document.getElementById('bgParticles');
const ctx = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

const particles = [];
const numParticles = 50;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.3
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(205, 251, 255, 0.7)';

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    // Wrap around
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
