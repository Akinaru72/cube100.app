// export function createStars(container) {
//   const canvas = container.querySelector('#stars-canvas');
//   const ctx = canvas?.getContext('2d');

//   if (!ctx) return () => {};

//   let width = 0;
//   let height = 0;
//   let animationId;
//   let lastTime = 0;
//   let speed = 0;

//   const stars = [];
//   const starCount = 220;
//   const center = { x: 0, y: 0 };

//   function resize() {
//     width = container.clientWidth;
//     height = container.clientHeight;
//     center.x = width / 2;
//     center.y = height / 2;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//   }

//   function makeStar(initial = false) {
//     const angle = Math.random() * Math.PI * 2;
//     const distance = initial ? Math.random() : 0.05;

//     return {
//       angle,
//       distance,
//       depth: 0.25 + Math.random() * 0.75,
//       size: 0.7 + Math.random() * 1.5,
//     };
//   }

//   function draw(time) {
//     animationId = requestAnimationFrame(draw);

//     if (document.hidden) {
//       lastTime = time;
//       return;
//     }

//     const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
//     lastTime = time;

//     // Плавно разгоняемся, без резкого старта.
//     speed += (0.42 - speed) * dt * 0.35;

//     ctx.clearRect(0, 0, width, height);

//     for (let i = 0; i < stars.length; i++) {
//       const star = stars[i];
//       const previous = star.distance;

//       star.distance += speed * star.depth * dt;
//       if (star.distance > 1) {
//         stars[i] = makeStar();
//         continue;
//       }

//       const maxDistance = Math.hypot(width, height) / 2;
//       const x = center.x + Math.cos(star.angle) * star.distance * maxDistance;
//       const y = center.y + Math.sin(star.angle) * star.distance * maxDistance;

//       const tailDistance = Math.max(0, previous - 0.035 * star.depth);
//       const tailX =
//         center.x + Math.cos(star.angle) * tailDistance * maxDistance;
//       const tailY =
//         center.y + Math.sin(star.angle) * tailDistance * maxDistance;

//       const alpha = Math.min(0.9, 0.25 + star.distance * 0.8);

//       ctx.beginPath();
//       ctx.strokeStyle = `rgba(220, 235, 255, ${alpha})`;
//       ctx.lineWidth = star.size * (0.5 + star.distance);
//       ctx.lineCap = 'round';
//       ctx.moveTo(tailX, tailY);
//       ctx.lineTo(x, y);
//       ctx.stroke();
//     }
//   }

//   resize();
//   for (let i = 0; i < starCount; i++) stars.push(makeStar(true));

//   window.addEventListener('resize', resize);
//   animationId = requestAnimationFrame(draw);

//   return function stopStars() {
//     cancelAnimationFrame(animationId);
//     window.removeEventListener('resize', resize);
//     ctx.clearRect(0, 0, width, height);
//   };
// }

// export function createStars(container) {
//   const canvas = container.querySelector('#stars-canvas');
//   const ctx = canvas?.getContext('2d');

//   if (!ctx) return () => {};

//   let width = 0;
//   let height = 0;
//   let animationId;
//   let lastTime = 0;
//   let elapsed = 0;

//   const stars = [];
//   const density = 0.00022; // количество звёзд зависит от площади canvas

//   function resize() {
//     width = container.clientWidth;
//     height = container.clientHeight;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     const count = Math.max(60, Math.round(width * height * density));

//     // Сохраняем уже созданные звёзды, чтобы они не меняли места при resize.
//     while (stars.length < count) {
//       stars.push(makeStar());
//     }
//     stars.length = count;

//     for (const star of stars) {
//       star.x = Math.min(star.x, width);
//       star.y = Math.min(star.y, height);
//     }
//   }

//   function makeStar() {
//     const depth = Math.random();

//     return {
//       x: Math.random() * width,
//       y: Math.random() * height,
//       depth,
//       radius: 0.35 + depth * 1.15,
//       phase: Math.random() * Math.PI * 2,
//       twinkleSpeed: 0.5 + Math.random() * 1.8,
//       twinkleAmount: 0.12 + Math.random() * 0.32,
//       baseAlpha: 0.25 + Math.random() * 0.45,
//       // Небольшие цветовые различия выглядят естественнее чисто белых точек.
//       color: Math.random() < 0.12 ? '210, 225, 255' : '255, 255, 255',
//     };
//   }

//   function draw(time) {
//     animationId = requestAnimationFrame(draw);

//     if (document.hidden) {
//       lastTime = time;
//       return;
//     }

//     const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
//     lastTime = time;
//     elapsed += dt;

//     ctx.clearRect(0, 0, width, height);

//     for (const star of stars) {
//       const twinkle =
//         0.5 + 0.5 * Math.sin(elapsed * star.twinkleSpeed + star.phase);
//       const alpha = Math.max(
//         0.08,
//         Math.min(0.95, star.baseAlpha + (twinkle - 0.5) * star.twinkleAmount)
//       );

//       ctx.beginPath();
//       ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
//       ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   resize();
//   window.addEventListener('resize', resize);
//   animationId = requestAnimationFrame(draw);

//   return function stopStars() {
//     cancelAnimationFrame(animationId);
//     window.removeEventListener('resize', resize);
//     ctx.clearRect(0, 0, width, height);
//   };
// }

export function createStars(container) {
  const canvas = document.querySelector('#stars-canvas');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let animationId;
  let lastTime = 0;
  let elapsed = 0;

  const stars = [];

  function makeStar() {
    const depth = Math.random();

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      depth,
      radius: 0.4 + depth * 1.4,
      phase: Math.random() * Math.PI * 2,
      speed: 1.5 + Math.random() * 4,
      base: 0.15 + Math.random() * 0.4,
      amplitude: 0.3 + Math.random() * 0.5,
      color: Math.random() < 0.15 ? '205, 220, 255' : '255, 255, 255',
    };
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(80, Math.round(width * height * 0.0003));
    while (stars.length < count) stars.push(makeStar());
    stars.length = count;

    for (const star of stars) {
      star.x = Math.min(star.x, width);
      star.y = Math.min(star.y, height);
    }
  }

  function draw(time) {
    animationId = requestAnimationFrame(draw);

    if (document.hidden) {
      lastTime = time;
      return;
    }

    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    elapsed += dt;

    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      // Синусоидальная яркость: у каждой звезды свой темп и фаза.
      const pulse = (1 + Math.sin(elapsed * star.speed + star.phase)) / 2;
      const alpha = Math.max(
        0.04,
        Math.min(1, star.base + pulse * star.amplitude)
      );
      const radius = star.radius * (0.75 + pulse * 0.5);

      // Свечение сильнее у условно более близких звёзд.
      const glow = radius * (2 + star.depth * 4);
      const gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        glow
      );
      gradient.addColorStop(0, `rgba(${star.color}, ${alpha})`);
      gradient.addColorStop(0.25, `rgba(${star.color}, ${alpha * 0.25})`);
      gradient.addColorStop(1, `rgba(${star.color}, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(star.x, star.y, glow, 0, Math.PI * 2);
      ctx.fill();

      // Яркая точка в центре.
      ctx.beginPath();
      ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', resize);
  animationId = requestAnimationFrame(draw);

  return function stopStars() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, width, height);
  };
}
