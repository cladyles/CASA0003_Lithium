const glowContainer = document.getElementById('glowContainer');

const glowColors = [
  'rgba(255,255,255,0.4)',
  'rgba(0,173,255,0.25)',
  'rgba(255,120,255,0.25)',
  'rgba(255,240,200,0.25)'
];

for (let i = 0; i < 10; i++) {
  const glow = document.createElement('div');
  glow.className = 'glow';
  glow.style.background = `radial-gradient(circle, ${glowColors[i % glowColors.length]} 0%, transparent 70%)`;
  glow.style.left = `${Math.random() * 100}%`;
  glow.style.top = `${Math.random() * 100}%`;
  glow.style.animationDuration = `${15 + Math.random() * 10}s`;
  glow.style.width = `${150 + Math.random() * 100}px`;
  glow.style.height = glow.style.width;
  glowContainer.appendChild(glow);
}