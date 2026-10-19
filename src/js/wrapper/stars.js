export function createStars(container) {
  const canvas = container.querySelector('#stars-canvas');
  const ctx = canvas?.getContext('2d');

  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let animationId;
  let lastTime = 0;
  let speed = 0;

  const stars = [];
  const starCount = 220;
  const center = { x: 0, y: 0 };

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    center.x = width / 2;
    center.y = height / 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeStar(initial = false) {
    const angle = Math.random() * Math.PI * 2;
    const distance = initial ? Math.random() : 0.05;

    return {
      angle,
      distance,
      depth: 0.25 + Math.random() * 0.75,
      size: 0.7 + Math.random() * 1.5,
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

    // Плавно разгоняемся, без резкого старта.
    speed += (0.42 - speed) * dt * 0.35;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const previous = star.distance;

      star.distance += speed * star.depth * dt;
      if (star.distance > 1) {
        stars[i] = makeStar();
        continue;
      }

      const maxDistance = Math.hypot(width, height) / 2;
      const x = center.x + Math.cos(star.angle) * star.distance * maxDistance;
      const y = center.y + Math.sin(star.angle) * star.distance * maxDistance;

      const tailDistance = Math.max(0, previous - 0.035 * star.depth);
      const tailX =
        center.x + Math.cos(star.angle) * tailDistance * maxDistance;
      const tailY =
        center.y + Math.sin(star.angle) * tailDistance * maxDistance;

      const alpha = Math.min(0.9, 0.25 + star.distance * 0.8);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(220, 235, 255, ${alpha})`;
      ctx.lineWidth = star.size * (0.5 + star.distance);
      ctx.lineCap = 'round';
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  resize();
  for (let i = 0; i < starCount; i++) stars.push(makeStar(true));

  window.addEventListener('resize', resize);
  animationId = requestAnimationFrame(draw);

  return function stopStars() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, width, height);
  };
}
