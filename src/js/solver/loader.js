export function createRubikLoader(root) {
  root.innerHTML = `
    <div class="view">
      <div class="cube"></div>
    </div>
  `;

  const cube = root.querySelector('.cube');
  const cubies = [];
  let timer;
  let stopped = false;

  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        const el = document.createElement('div');
        el.className = 'cubie';
        const exposed = [
          z === 1 ? 'f' : 'b',
          x === 1 ? 'r' : 'l',
          y === -1 ? 'u' : 'd',
        ];
        el.innerHTML = exposed
          .map(face => `<i class="sticker ${face}"></i>`)
          .join('');
        const item = {
          el,
          p: { x, y, z },
          transform: `translate3d(${x * 14}px, ${y * 14}px, ${z * 14}px)`,
        };
        el.style.transform = item.transform;
        cube.append(el);
        cubies.push(item);
      }
    }
  }

  function rotatePoint(point, axis, direction) {
    const { x, y, z } = point;

    if (axis === 'x') {
      return { x, y: -direction * z, z: direction * y };
    }

    if (axis === 'y') {
      return { x: direction * z, y, z: -direction * x };
    }

    return { x: -direction * y, y: direction * x, z };
  }

  function turnRandomLayer() {
    if (stopped) return;
    const axis = ['x', 'y', 'z'][Math.floor(Math.random() * 3)];
    const side = Math.random() < 0.5 ? -1 : 1;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const layer = cubies.filter(item => item.p[axis] === side);
    const group = document.createElement('div');
    group.className = 'turn-group';
    cube.append(group);
    layer.forEach(item => group.append(item.el));
    const rotation = `rotate${axis.toUpperCase()}(${direction * 90}deg)`;
    group.style.transform = `rotate${axis.toUpperCase()}(0deg)`;
    void group.offsetWidth;

    requestAnimationFrame(() => {
      group.style.transform = rotation;
    });

    timer = setTimeout(() => {
      layer.forEach(item => {
        item.p = rotatePoint(item.p, axis, direction);
        item.transform = `rotate${axis.toUpperCase()}(${direction * 90}deg) ${item.transform}`;
        item.el.style.transform = item.transform;
        cube.append(item.el);
      });

      group.remove();

      // Небольшая пауза перед следующим поворотом.
      timer = setTimeout(turnRandomLayer, 320);
    }, 940);
  }

  timer = setTimeout(turnRandomLayer, 700);

  return () => {
    stopped = true;
    clearTimeout(timer);
    root.replaceChildren();
  };
}
