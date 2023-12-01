const NinjaProps = {
  height: 100,
};
const DartProps = {
  width: 50,
};
const ActionMap = {
  idle: animateGroup('Idle'),
  runs: animateGroup('Run'),
  jumps: animateGroup('Jump'),
  slide: animateGroup('Slide'),
  attack: animateGroup('Attack'),
  jumpAttack: animateGroup('Jump_Attack'),
  throw: animateGroup('Throw'),
  jumpThrow: animateGroup('Jump_Throw'),
};

function loadAction(x, y, actions) {
  const tmp = new PIXI.AnimatedSprite(ActionMap[actions]);
  tmp.name = actions;
  tmp.x = x;
  tmp.y = y;
  tmp.anchor.set(1);
  tmp.scale.set(100 / 431);
  tmp.animationSpeed = 0.5;
  tmp.play();
  return tmp;
}

function animateGroup(name) {
  const arr = [];
  for (i = 0; i < 10; i++) {
    const r = PIXI.Texture.from(`./images/${name}__00${i}.png`);
    arr.push(r);
  }
  return arr;
}

function switchToAction(next) {
  const tmp = loadAction(current.x, current.y, next);
  app.stage.removeChild(current);
  current = tmp;
  app.stage.addChild(current);
}

function createDart() {
  const r = PIXI.Sprite.from(`./images/Kunai.png`);
  r.x = current.x;
  console.info(current.y, 'current.y ');
  r.y = current.y - NinjaProps.height / 2;
  console.info(r.y, 'r.y');
  r.id = 'dart' + new Date().getTime();
  r.angle = 90;
  r.scale.set(50 / 160);
  app.stage.addChild(r);
  return r;
}

//Test For Hit
// A basic AABB check between two different squares
function checkHit(object1, object2) {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
}

function randomIndex() {
  return Math.floor(Math.random() * 4);
}
