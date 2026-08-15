import * as THREE from 'three';
import {
  bulgeRadius,
  cornerSize,
  gap,
  cubeSize,
  cellSize,
} from './constants.js';

export function getArcPointForZ(z, sphereCenter, startP) {
  const start = startP.clone().sub(sphereCenter);
  // положение по Z относительно центра
  const zLocal = z - sphereCenter.z;
  // расстояние от центра до точки в плоскости XY
  const xyRadius = Math.sqrt(bulgeRadius ** 2 - zLocal ** 2);
  // направление от центра в сторону RUF/RUB
  const startXY = new THREE.Vector2(start.x, start.y).normalize();
  // для нашей дуги выбираем соответствующее направление
  const direction = startXY;
  return new THREE.Vector3(
    sphereCenter.x + direction.x * xyRadius,
    sphereCenter.y + direction.y * xyRadius,
    z
  );
}

export function getArcPointsZ(start, count, sphereCenter) {
  const points = [];

  let startZ = start.z - cornerSize - gap / 2;
  for (let i = 0; i < count; i++) {
    const z =
      startZ - Math.floor(i / 2) * (cubeSize + gap) - (i % 2) * cubeSize;
    points.push(getArcPointForZ(z, sphereCenter, start));
  }
  return points;
}
