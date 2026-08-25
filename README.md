1. Как создаётся 3×3

У тебя:

create() { for (let x = -1; x <= 1; x++) { for (let y = -1; y <= 1; y++) { for
(let z = -1; z <= 1; z++) { const cubie = this.createCubie(x, y, z);
this.group.add(cubie); this.cubies.push(cubie); } } } }

Получается 27 cubie.

Каждый cubie имеет свои логические координаты:

x = -1, 0, 1 y = -1, 0, 1 z = -1, 0, 1

То есть координата одновременно является состоянием кубика.

Например:

cubie.userData.coord = { x: 1, y: 1, z: -1 };

означает, что этот маленький кубик находится в правом-верхнем-заднем углу.

2. Как 3×3 определяет грань

Вот этот метод:

getFace(axis, value) { return this.cubies.filter( cubie =>
cubie.userData.coord[axis] === value ); }

Это очень важный момент.

Допустим:

getFace('x', 1)

означает:

найти все cubie, у которых x === 1.

Получаем правую грань.

Для неё будет 9 кубиков:

        x = 1


        y
        ↑
        │
        └────→ z


        9 кубиков

А:

getFace('y', 1)

получает верхнюю грань.

А:

getFace('z', 1)

получает переднюю.

То есть никаких заранее записанных списков правой грани нет.

Каждый раз вызывается:

getFace(...)

и список строится заново по текущим координатам.

3. Что происходит при R

Вот твой код:

rotateLayer(axis, value, angle) { const face = this.getFace(axis, value);

const faceGroup = new THREE.Group(); this.group.add(faceGroup);

face.forEach(cubie => { faceGroup.attach(cubie); });

faceGroup.rotation[axis] = angle;

face.forEach(cubie => { this.group.attach(cubie);
console.log(cubie.userData.coord, cubie.position);
this.updateCubieCoords(cubie); });

this.group.remove(faceGroup); }

Разберём R.

Например:

rotateLayer('x', 1, -Math.PI / 2); Шаг 1 const face = this.getFace('x', 1);

Получаем текущие 9 cubie правой грани.

Важно слово — текущие.

Если до этого был U, список уже может содержать другие элементы.

4. Создаётся временная группа const faceGroup = new THREE.Group();

this.group.add(faceGroup);

Теперь существует:

this.group │ ├── остальные cubie │ └── faceGroup 5. 9 кубиков помещаются во
временную группу face.forEach(cubie => { faceGroup.attach(cubie); });

Теперь:

this.group │ ├── остальные cubie │ └── faceGroup ├── cubie ├── cubie ├── cubie
├── ... └── cubie

attach() здесь важен.

Он переносит объект в faceGroup, сохраняя его мировое положение.

То есть кубики не прыгают в другое место просто из-за смены родителя.

6. Вращается только faceGroup faceGroup.rotation[axis] = angle;

Для R:

axis = 'x'

получается:

faceGroup.rotation.x = -Math.PI / 2;

Физически девять кубиков повернулись вокруг оси X.

7. Самое главное — после вращения cubie возвращаются face.forEach(cubie => {
   this.group.attach(cubie); });

Теперь снова:

this.group ├── cubie ├── cubie ├── cubie ├── ... └── cubie

А faceGroup больше не содержит эти кубики.

8. Но координаты старые!

Вот здесь происходит самое важное:

console.log(cubie.userData.coord, cubie.position);

До обновления может быть:

coord = { x: 1, y: 1, z: -1 }

Но после физического вращения position уже соответствует новому месту.

Например этот cubie переехал:

было:

x = 1 y = 1 z = -1

после R:

x = 1 y = -1 z = -1

Но userData.coord пока всё ещё содержит старое:

1, 1, -1

Поэтому вызывается:

this.updateCubieCoords(cubie); 9. Как обновляется логическое состояние

Твоя функция:

updateCubieCoords(cubie) { cubie.userData.coord.x =
Math.round(cubie.position.x); cubie.userData.coord.y =
Math.round(cubie.position.y); cubie.userData.coord.z =
Math.round(cubie.position.z); }

То есть:

физическое положение ↓ cubie.position ↓ Math.round() ↓ userData.coord

И вот здесь состояние кубика становится новым.

10. Почему следующий U автоматически получает правильные кубики

Вот это самое главное во всей системе.

Допустим, сначала было:

R содержит: A B C D E F G H I

После R они физически повернулись.

updateCubieCoords() поменял их логические координаты.

Теперь приходит:

rotateLayer('y', 1, ...);

Внутри снова:

const face = this.getFace('y', 1);

Но getFace() не знает, кто был на U раньше.

Он просто смотрит:

cubie.userData.coord.y === 1

И получает новые 9 кубиков согласно новому состоянию.

Вот почему в 3×3 тебе не нужны:

surfaceCornerRFU surfaceCornerRUB surfaceEdgeRF ...

Движение не хранит такие названия.

Оно делает:

1. Найти текущую грань
2. Временно собрать её в группу
3. Повернуть
4. Вернуть обратно
5. Обновить coord
6. Следующий ход снова ищет грань по новым coord
7. И ещё важный момент: rotateX() и rotateY()

У тебя есть:

rotateX(angle) { this.group.rotation.x += angle; }

rotateY(angle) { this.group.rotation.y += angle; }

Это не движение отдельной грани.

Это вращение всего кубика целиком для обзора.

А:

rotateLayer(axis, value, angle)

— это именно ход кубика.

Это две совершенно разные вещи.

12. startRotation() — начало анимации хода

У тебя ещё есть:

startRotation(move) { if (this.currentRotation) return;

this.playTurnSound();

const face = this.getFace(move.axis, move.value);

const faceGroup = new THREE.Group();

this.group.add(faceGroup);

face.forEach(cubie => { faceGroup.attach(cubie); });

this.currentRotation = { ...move, currentAngle: 0, face, faceGroup, }; }

Здесь происходит практически то же самое, только вращение не выполняется сразу
на 90°.

Вместо этого сохраняется:

this.currentRotation = { ...move, currentAngle: 0, face, faceGroup, };

То есть система запоминает:

какую грань вращаем какие cubie входят в неё какая временная группа насколько
уже повернули

Потом анимация постепенно увеличивает:

currentAngle

до нужных 90°.

И только после завершения надо сделать то же самое, что делает rotateLayer():

вернуть cubie ↓ обновить coord ↓ очистить currentRotation Итого — весь механизм
3×3 буквально в одной схеме MOVE R │ ▼ getFace('x', 1) │ ▼ 9 текущих cubie │ ▼
faceGroup │ ▼ физический R │ ▼ вернуть cubie │ ▼ updateCubieCoords() │ ▼ новые
coord │ ▼ MOVE U │ ▼ getFace('y', 1) │ ▼ поиск уже по НОВЫМ coord

Вот это и есть весь велосипед 3×3.

Именно эту последовательность тебе имеет смысл воспроизвести для 4×4, не
придумывая отдельную систему описания каждого движения.
