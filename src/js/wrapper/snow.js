export function createSnow(container) {
  const canvas = container.querySelector('#snow-canvas');
  const ctx = canvas?.getContext('2d');

  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let animationId;
  let lastTime = 0;
  let wind = 0;

  const flakes = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(50, Math.round(width * height * 0.00018));
    while (flakes.length < count) flakes.push(makeFlake(true));
    flakes.length = count;
  }

  function makeFlake(randomY = false) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -5,
      radius: 0.8 + Math.random() * 2.2,
      speed: 18 + Math.random() * 42,
      drift: 8 + Math.random() * 24,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.35 + Math.random() * 0.5,
    };
  }

  function draw(time) {
    animationId = requestAnimationFrame(draw);

    if (document.hidden) {
      lastTime = time;
      return;
    }

    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    wind += (Math.sin(time * 0.0003) * 12 - wind) * dt * 0.4;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < flakes.length; i++) {
      const flake = flakes[i];
      flake.phase += dt * 1.5;
      flake.y += flake.speed * dt;
      flake.x += (wind + Math.sin(flake.phase) * flake.drift) * dt;

      if (flake.y > height + 5) {
        flakes[i] = makeFlake();
        continue;
      }
      if (flake.x < -5) flake.x = width + 5;
      if (flake.x > width + 5) flake.x = -5;

      ctx.beginPath();
      ctx.fillStyle = `rgba(245, 249, 255, ${flake.alpha})`;
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', resize);
  animationId = requestAnimationFrame(draw);

  return function stopSnow() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, width, height);
  };
}
