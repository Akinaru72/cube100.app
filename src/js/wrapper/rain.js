// export function createRain(container) {
//   const canvas = container.querySelector('#rain-canvas');
//   const ctx = canvas.getContext('2d');

//   if (!ctx) return () => {};

//   let width = 0;
//   let height = 0;
//   let animationId;
//   let lastFrame = 0;

//   const drops = [];
//   const dropCount = 60;

//   function resize() {
//     width = container.clientWidth;
//     height = container.clientHeight;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//   }

//   function createDrop() {
//     return {
//       x: Math.random() * width,
//       y: Math.random() * height,
//       length: 12 + Math.random() * 18,
//       speed: 2 + Math.random() * 3,
//     };
//   }

//   function initDrops() {
//     drops.length = 0;

//     for (let i = 0; i < dropCount; i++) {
//       drops.push(createDrop());
//     }
//   }

//   function draw(time) {
//     animationId = requestAnimationFrame(draw);

//     if (document.hidden || time - lastFrame < 33) return;
//     lastFrame = time;

//     ctx.clearRect(0, 0, width, height);
//     // ctx.strokeStyle = 'rgba(180, 205, 225, 0.25)';
//     // ctx.lineWidth = 1;
//     ctx.lineWidth = 1.4;
//     ctx.lineCap = 'round';

//     ctx.beginPath();

//     for (const drop of drops) {
//       // ctx.moveTo(drop.x, drop.y);
//       // ctx.lineTo(drop.x - 2, drop.y + drop.length);
//       const gradient = ctx.createLinearGradient(
//         drop.x,
//         drop.y,
//         drop.x - 3,
//         drop.y + drop.length
//       );

//       gradient.addColorStop(0, 'rgba(190, 220, 245, 0.08)');
//       gradient.addColorStop(1, 'rgba(190, 220, 245, 0.65)');

//       ctx.strokeStyle = gradient;
//       ctx.moveTo(drop.x, drop.y);
//       ctx.lineTo(drop.x - 3, drop.y + drop.length);

//       drop.y += drop.speed;

//       if (drop.y > height) {
//         drop.x = Math.random() * width;
//         drop.y = -drop.length;
//       }
//     }

//     ctx.stroke();
//   }

//   resize();
//   initDrops();
//   animationId = requestAnimationFrame(draw);

//   window.addEventListener('resize', resize);

//   return function stopRain() {
//     cancelAnimationFrame(animationId);
//     window.removeEventListener('resize', resize);
//     ctx.clearRect(0, 0, width, height);
//   };
// }

export function createRain(container) {
  const canvas = document.querySelector('#rain-canvas');
  const ctx = canvas?.getContext('2d');

  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId;
  let lastFrame = 0;
  let wind = 0;

  const drops = [];
  const splashes = [];
  const density = 0.0009; // капель на пиксель площади

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(40, Math.round(width * height * density));

    while (drops.length < count) drops.push(createDrop(true));
    drops.length = count;
  }

  function createDrop(randomY = false) {
    const depth = Math.random(); // дальние капли тоньше и медленнее

    return {
      x: Math.random() * (width + 100),
      y: randomY ? Math.random() * height : -20,
      length: 8 + depth * 18,
      speed: 260 + depth * 520,
      alpha: 0.12 + depth * 0.32,
      thickness: 0.5 + depth * 0.8,
    };
  }

  function draw(time) {
    animationId = requestAnimationFrame(draw);

    if (document.hidden) {
      lastFrame = time;
      return;
    }

    if (time - lastFrame < 16) return;

    const dt = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;

    // Ветер плавно меняется, не дёргая направление капель.
    wind += (Math.sin(time * 0.00022) * 55 - wind) * dt * 0.12;

    ctx.clearRect(0, 0, width, height);

    for (const drop of drops) {
      const dx = (wind * 0.35 + 45) * dt;
      const dy = drop.speed * dt;
      const slant = 2 + wind * 0.025;

      ctx.beginPath();
      ctx.lineWidth = drop.thickness + 0.3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(210, 232, 250, ${Math.min(0.85, drop.alpha * 2.2)})`;
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - slant, drop.y + drop.length);
      ctx.stroke();
      // const slant = 2 + wind * 0.025;

      // ctx.beginPath();
      // ctx.lineWidth = drop.thickness;
      // ctx.lineCap = 'round';
      // ctx.strokeStyle = `rgba(195, 218, 238, ${drop.alpha})`;
      // ctx.moveTo(drop.x, drop.y);
      // ctx.lineTo(drop.x - slant, drop.y + drop.length);
      // ctx.stroke();

      drop.x += dx;
      drop.y += dy;

      if (
        drop.y - drop.length > height ||
        drop.x < -40 ||
        drop.x > width + 40
      ) {
        // Иногда капля оставляет маленький всплеск при ударе о землю.
        if (drop.y < height + 12 && Math.random() < 0.12) {
          splashes.push({
            x: Math.max(0, Math.min(width, drop.x)),
            y: height - 1,
            age: 0,
          });
        }

        Object.assign(drop, createDrop());
      }
    }

    for (let i = splashes.length - 1; i >= 0; i--) {
      const splash = splashes[i];
      splash.age += dt;

      if (splash.age > 0.18) {
        splashes.splice(i, 1);
        continue;
      }

      const progress = splash.age / 0.18;
      const radius = 2 + progress * 5;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(195, 218, 238, ${0.2 * (1 - progress)})`;
      ctx.lineWidth = 1;
      ctx.ellipse(
        splash.x,
        splash.y,
        radius,
        radius * 0.3,
        0,
        Math.PI,
        2 * Math.PI
      );
      ctx.stroke();
    }
  }

  resize();
  window.addEventListener('resize', resize);
  animationId = requestAnimationFrame(draw);

  return function stopRain() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, width, height);
  };
}

// export function createRain(container) {
//   const canvas = container.querySelector('#rain-canvas');
//   const ctx = canvas?.getContext('2d');

//   if (!ctx) return () => {};

//   let width = 0;
//   let height = 0;
//   let animationId;
//   let lastTime = 0;
//   let spawnCarry = 0;

//   const drops = [];

//   function resize() {
//     width = container.clientWidth;
//     height = container.clientHeight;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//   }

//   // function makeDrop(x = Math.random() * width, y = Math.random() * height) {
//   //   const radius = 2 + Math.random() * 5;

//   //   return {
//   //     x,
//   //     y,
//   //     radius,
//   //     length: radius * (1.5 + Math.random() * 2),
//   //     speed: 18 + Math.random() * 45,
//   //     alpha: 0.28 + Math.random() * 0.38,
//   //     wobble: Math.random() * Math.PI * 2,
//   //     wobbleSpeed: 0.7 + Math.random() * 1.2,
//   //   };
//   // }

//   // function drawDrop(drop) {
//   //   const { x, y, radius, length, alpha } = drop;

//   //   // Полупрозрачная выпуклая капля с ярким бликом.
//   //   const gradient = ctx.createRadialGradient(
//   //     x - radius * 0.35,
//   //     y - radius * 0.4,
//   //     0,
//   //     x,
//   //     y,
//   //     radius * 1.5
//   //   );

//   //   gradient.addColorStop(0, `rgba(245, 250, 255, ${alpha * 0.8})`);
//   //   gradient.addColorStop(0.35, `rgba(170, 205, 232, ${alpha * 0.42})`);
//   //   gradient.addColorStop(1, `rgba(115, 160, 195, ${alpha * 0.12})`);

//   //   ctx.beginPath();
//   //   ctx.fillStyle = gradient;
//   //   ctx.ellipse(x, y, radius * 0.72, length * 0.58, 0, 0, Math.PI * 2);
//   //   ctx.fill();

//   //   ctx.beginPath();
//   //   ctx.strokeStyle = `rgba(240, 248, 255, ${alpha * 0.75})`;
//   //   ctx.lineWidth = Math.max(0.8, radius * 0.22);
//   //   ctx.lineCap = 'round';
//   //   ctx.moveTo(x - radius * 0.25, y - length * 0.22);
//   //   ctx.lineTo(x - radius * 0.05, y - length * 0.05);
//   //   ctx.stroke();
//   // }
//   function makeDrop() {
//     const length = 14 + Math.random() * 30;

//     return {
//       x: Math.random() * width,
//       y: -length,
//       length,
//       speed: 90 + Math.random() * 170,
//       width: 1.2 + Math.random() * 1.2,
//       alpha: 0.35 + Math.random() * 0.4,
//     };
//   }

//   function drawDrop(drop, dt) {
//     drop.y += drop.speed * dt;

//     // Хвост капли постепенно вытягивается при стекании.
//     drop.length = Math.min(drop.length + 18 * dt, 55);

//     const gradient = ctx.createLinearGradient(
//       drop.x,
//       drop.y - drop.length,
//       drop.x,
//       drop.y
//     );

//     gradient.addColorStop(0, 'rgba(180, 215, 240, 0)');
//     gradient.addColorStop(0.65, `rgba(180, 215, 240, ${drop.alpha * 0.35})`);
//     gradient.addColorStop(1, `rgba(235, 247, 255, ${drop.alpha})`);

//     ctx.beginPath();
//     ctx.strokeStyle = gradient;
//     ctx.lineWidth = drop.width;
//     ctx.lineCap = 'round';
//     ctx.moveTo(drop.x, drop.y - drop.length);
//     ctx.lineTo(drop.x, drop.y);
//     ctx.stroke();

//     // Яркая головка стекающей капли.
//     ctx.beginPath();
//     ctx.fillStyle = `rgba(235, 247, 255, ${drop.alpha})`;
//     ctx.ellipse(
//       drop.x,
//       drop.y,
//       drop.width * 0.8,
//       drop.width * 1.6,
//       0,
//       0,
//       Math.PI * 2
//     );
//     ctx.fill();
//   }
//   function draw(time) {
//     animationId = requestAnimationFrame(draw);

//     if (document.hidden) {
//       lastTime = time;
//       return;
//     }

//     const dt = Math.min((time - lastTime) / 1000 || 0, 0.05);
//     lastTime = time;

//     ctx.clearRect(0, 0, width, height);

//     // Новые капли появляются на стекле.
//     spawnCarry += dt * Math.max(8, width * height * 0.000025);
//     while (spawnCarry >= 1) {
//       drops.push(makeDrop(Math.random() * width, -8));
//       spawnCarry -= 1;
//     }

//     for (let i = drops.length - 1; i >= 0; i--) {
//       const drop = drops[i];

//       drop.wobble += drop.wobbleSpeed * dt;
//       drop.x += Math.sin(drop.wobble) * 5 * dt;
//       drop.y += drop.speed * dt;

//       // Капля постепенно вытягивается, когда стекает.
//       drop.length = Math.min(
//         drop.radius * 4,
//         drop.length + drop.speed * dt * 0.12
//       );

//       drawDrop(drop);

//       if (drop.y - drop.length > height) {
//         drops.splice(i, 1);
//       }
//     }
//   }

//   resize();
//   window.addEventListener('resize', resize);
//   animationId = requestAnimationFrame(draw);

//   return function stopRain() {
//     cancelAnimationFrame(animationId);
//     window.removeEventListener('resize', resize);
//     ctx.clearRect(0, 0, width, height);
//   };
// }

// export function createRain(container) {
//   const canvas = container.querySelector('#rain-canvas');
//   const ctx = canvas?.getContext('2d');

//   if (!ctx) return () => {};

//   let width = 0;
//   let height = 0;
//   let animationId;
//   let lastTime = 0;
//   let spawnCarry = 0;

//   const drops = [];
//   const spawnRate = 0.035; // капель в секунду на пиксель ширины

//   function resize() {
//     width = container.clientWidth;
//     height = container.clientHeight;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//   }

//   function makeDrop(x = Math.random() * width, y = -10) {
//     const lineLength = 10 + Math.random() * 22;

//     return {
//       x,
//       y,
//       lineLength,
//       speed: 100 + Math.random() * 150,
//       width: 1.1 + Math.random() * 1.2,
//       alpha: 0.45 + Math.random() * 0.4,
//       sway: Math.random() * Math.PI * 2,
//     };
//   }

//   function drawDrop(drop, dt) {
//     drop.sway += dt * (0.8 + drop.speed * 0.003);
//     drop.x += Math.sin(drop.sway) * 8 * dt;
//     drop.y += drop.speed * dt;

//     // Хвост за головкой делает стекающую каплю заметнее.
//     const tailLength = Math.min(52, drop.lineLength + drop.speed * 0.08);

//     const gradient = ctx.createLinearGradient(
//       drop.x,
//       drop.y - tailLength,
//       drop.x,
//       drop.y + 2
//     );

//     gradient.addColorStop(0, 'rgba(190, 220, 245, 0)');
//     gradient.addColorStop(0.55, `rgba(190, 220, 245, ${drop.alpha * 0.45})`);
//     gradient.addColorStop(1, `rgba(235, 247, 255, ${drop.alpha})`);

//     ctx.beginPath();
//     ctx.strokeStyle = gradient;
//     ctx.lineWidth = drop.width;
//     ctx.lineCap = 'round';
//     ctx.moveTo(drop.x, drop.y - tailLength);
//     ctx.lineTo(drop.x, drop.y);
//     ctx.stroke();

//     // Головка капли.
//     ctx.beginPath();
//     ctx.fillStyle = `rgba(235, 247, 255, ${drop.alpha})`;
//     ctx.ellipse(
//       drop.x,
//       drop.y,
//       drop.width * 0.75,
//       drop.width * 1.4,
//       0,
//       0,
//       Math.PI * 2
//     );
//     ctx.fill();
//   }

//   function draw(time) {
//     animationId = requestAnimationFrame(draw);

//     if (document.hidden) {
//       lastTime = time;
//       return;
//     }

//     const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
//     lastTime = time;

//     ctx.clearRect(0, 0, width, height);

//     // Регулярно добавляем капли сверху окна.
//     spawnCarry += dt * width * spawnRate;
//     while (spawnCarry >= 1) {
//       drops.push(makeDrop());
//       spawnCarry -= 1;
//     }

//     for (let i = drops.length - 1; i >= 0; i--) {
//       const drop = drops[i];
//       drawDrop(drop, dt);

//       if (drop.y - drop.lineLength > height) {
//         drops.splice(i, 1);
//       }
//     }
//   }

//   resize();
//   window.addEventListener('resize', resize);
//   animationId = requestAnimationFrame(draw);

//   return function stopRain() {
//     cancelAnimationFrame(animationId);
//     window.removeEventListener('resize', resize);
//     ctx.clearRect(0, 0, width, height);
//   };
// }
