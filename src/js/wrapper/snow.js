// export function createSnow(container) {
//   const canvas = container.querySelector('#snow-canvas');
//   const ctx = canvas?.getContext('2d');

//   if (!ctx) return () => {};

//   let width = 0;
//   let height = 0;
//   let animationId;
//   let lastTime = 0;
//   let wind = 0;

//   const flakes = [];

//   function resize() {
//     width = container.clientWidth;
//     height = container.clientHeight;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     const count = Math.max(50, Math.round(width * height * 0.00018));
//     while (flakes.length < count) flakes.push(makeFlake(true));
//     flakes.length = count;
//   }

//   function makeFlake(randomY = false) {
//     return {
//       x: Math.random() * width,
//       y: randomY ? Math.random() * height : -5,
//       radius: 0.8 + Math.random() * 2.2,
//       speed: 18 + Math.random() * 42,
//       drift: 8 + Math.random() * 24,
//       phase: Math.random() * Math.PI * 2,
//       alpha: 0.35 + Math.random() * 0.5,
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
//     wind += (Math.sin(time * 0.0003) * 12 - wind) * dt * 0.4;

//     ctx.clearRect(0, 0, width, height);

//     for (let i = 0; i < flakes.length; i++) {
//       const flake = flakes[i];
//       flake.phase += dt * 1.5;
//       flake.y += flake.speed * dt;
//       flake.x += (wind + Math.sin(flake.phase) * flake.drift) * dt;

//       if (flake.y > height + 5) {
//         flakes[i] = makeFlake();
//         continue;
//       }
//       if (flake.x < -5) flake.x = width + 5;
//       if (flake.x > width + 5) flake.x = -5;

//       ctx.beginPath();
//       ctx.fillStyle = `rgba(245, 249, 255, ${flake.alpha})`;
//       ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   resize();
//   window.addEventListener('resize', resize);
//   animationId = requestAnimationFrame(draw);

//   return function stopSnow() {
//     cancelAnimationFrame(animationId);
//     window.removeEventListener('resize', resize);
//     ctx.clearRect(0, 0, width, height);
//   };
// }

export function createSnow(container) {
  const canvas = document.querySelector('#snow-canvas');
  const ctx = canvas?.getContext('2d');

  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let animationId;
  let lastTime = 0;
  let time = 0;

  const flakes = [];
  const flakeCount = 180;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (const flake of flakes) {
      flake.x = (Math.random() * 2 - 1) * width;
      flake.y = (Math.random() * 2 - 1) * height;
    }
  }

  function makeFlake() {
    return {
      // Положение в воображаемом 3D-пространстве перед камерой.
      x: (Math.random() * 2 - 1) * width,
      y: (Math.random() * 2 - 1) * height,
      z: 0.08 + Math.random() * 0.92,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 1.5,
    };
  }

  function project(flake) {
    const perspective = 0.12 + flake.z;
    return {
      x: width / 2 + flake.x / perspective,
      y: height / 2 + flake.y / perspective,
      size: 0.5 + (1 - flake.z) * 4,
      depth: 1 - flake.z,
    };
  }

  function draw(now) {
    animationId = requestAnimationFrame(draw);

    if (document.hidden) {
      lastTime = now;
      return;
    }

    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    time += dt;

    ctx.clearRect(0, 0, width, height);

    for (const flake of flakes) {
      const before = project(flake);

      flake.sway += flake.swaySpeed * dt;
      flake.x += Math.sin(flake.sway) * 18 * dt;
      flake.y += (20 + (1 - flake.z) * 130) * dt;
      flake.z -= dt * (0.025 + (1 - flake.z) * 0.16);

      const after = project(flake);

      if (
        flake.z <= 0.025 ||
        after.x < -30 ||
        after.x > width + 30 ||
        after.y > height + 30
      ) {
        Object.assign(flake, makeFlake());
        continue;
      }

      // const alpha = 0.25 + after.depth * 0.65;
      // const stretch = Math.min(12, 1 + after.depth * 8);

      // // Короткий след усиливает ощущение движения и глубины.
      // ctx.beginPath();
      // ctx.strokeStyle = `rgba(245, 249, 255, ${alpha * 0.55})`;
      // ctx.lineWidth = Math.max(0.6, after.size * 0.45);
      // ctx.lineCap = 'round';
      // ctx.moveTo(before.x, before.y);
      // ctx.lineTo(
      //   after.x - Math.sin(flake.sway) * stretch * 0.35,
      //   after.y - stretch
      // );
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      // ctx.arc(after.x, after.y, after.size, 0, Math.PI * 2);
      // ctx.fill();
      const alpha = 0.35 + after.depth * 0.55;

      // Мягкий ореол
      ctx.beginPath();
      ctx.fillStyle = `rgba(230, 242, 255, ${alpha * 0.18})`;
      ctx.arc(after.x, after.y, after.size * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Круглая снежинка
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.arc(after.x, after.y, after.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize();
  for (let i = 0; i < flakeCount; i++) flakes.push(makeFlake());

  window.addEventListener('resize', resize);
  animationId = requestAnimationFrame(draw);

  return function stopSnow() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, width, height);
  };
}
