function drawLine(start, end, color = 0xff0000) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  const material = new THREE.LineBasicMaterial({
    color,
  });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  return line;
}

function createSurface(pointsAB, pointsCD) {
  const vertices = [];
  for (let i = 0; i < pointsAB.length - 1; i += 2) {
    const A = pointsAB[i];
    const A2 = pointsAB[i + 1];
    const C = pointsCD[i];
    const C2 = pointsCD[i + 1];
    // Первый треугольник
    vertices.push(A.x, A.y, A.z, A2.x, A2.y, A2.z, C.x, C.y, C.z);
    // Второй треугольник
    vertices.push(A2.x, A2.y, A2.z, C2.x, C2.y, C2.z, C.x, C.y, C.z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
}

function drawArc(center, pointA, pointB, color = 0x00ff00) {
  const start = pointA.clone().sub(center);
  const end = pointB.clone().sub(center);
  const axis = new THREE.Vector3().crossVectors(start, end).normalize();
  const angle = start.angleTo(end);
  const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = start.clone();
    point.applyAxisAngle(axis, angle * t);
    point.add(center);
    points.push(point);
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    depthTest: false,
  });
  const line = new THREE.Line(geometry, material);
  line.renderOrder = 1001;
  scene.add(line);
  return line;
}

// for (let i = 0; i < pointsAB_UR.length; i++) {
//   drawLine(pointsAB_UR[i], pointsCD_RU[i], 0xff0000);
// }
