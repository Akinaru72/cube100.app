import * as THREE from 'three';
import {
  bulgeRadius,
  cornerSize,
  gap,
  cubeSize,
  cellSize,
} from './constants.js';
export function getArcPointForX(x, sphereCenter, startP) {
  const start = startP.clone().sub(sphereCenter);
  const xLocal = x - sphereCenter.x;
  const yzRadius = Math.sqrt(bulgeRadius ** 2 - xLocal ** 2);
  const startYZ = new THREE.Vector2(start.y, start.z).normalize();
  const direction = startYZ;
  return new THREE.Vector3(
    x,
    sphereCenter.y + direction.x * yzRadius,
    sphereCenter.z + direction.y * yzRadius
  );
}

export function getArcPointsX(start, count, sphereCenter, direction = 1) {
  const points = [];
  let startX = start.x - cornerSize - gap / 2;
  for (let i = 0; i < count; i++) {
    const offset = Math.floor(i / 2) * (cubeSize + gap) + (i % 2) * cubeSize;
    const x = direction * (startX - offset);
    points.push(getArcPointForX(x, sphereCenter, start));
  }

  return points;
}
