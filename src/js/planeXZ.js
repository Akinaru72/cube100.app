import * as THREE from 'three';
import {
  bulgeRadius,
  cornerSize,
  gap,
  cubeSize,
  cellSize,
} from './constants.js';

export function getArcPointForY(y, sphereCenter, startP) {
  const start = startP.clone().sub(sphereCenter);
  const yLocal = y - sphereCenter.y;
  const xzRadius = Math.sqrt(bulgeRadius ** 2 - yLocal ** 2);
  const startXZ = new THREE.Vector2(start.x, start.z).normalize();
  const direction = startXZ;
  return new THREE.Vector3(
    sphereCenter.x + direction.x * xzRadius,
    y,
    sphereCenter.z + direction.y * xzRadius
  );
}

export function getArcPointsY(start, count, sphereCenter, direction = 1) {
  const points = [];

  let startY = start.y - cornerSize - gap / 2;
  for (let i = 0; i < count; i++) {
    const offset = Math.floor(i / 2) * (cubeSize + gap) + (i % 2) * cubeSize;
    const y = direction * (startY - offset);
    points.push(getArcPointForY(y, sphereCenter, start));
  }

  return points;
}
