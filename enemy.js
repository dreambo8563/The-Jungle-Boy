let enemies = [];
const KillingWeaponMap = {};
const KilledEnemyMap = {};
const names = ['bat', 'angryPig', 'rock', 'blueBird', 'bunny', 'mushroom'];

function randomEnemyName() {
  const r = Math.floor(Math.random() * names.length);
  return names[r];
}

async function loadEnemy() {
  const name = randomEnemyName();
  const sheet = AssetsCache[name];
  const anim = new PIXI.AnimatedSprite(sheet.animations[name]);
  // 随机产生 0 或者 1
  const r = Math.round(Math.random());

  // set the animation speed
  anim.animationSpeed = 0.1666;
  anim.x = enemyStart();
  anim.zIndex = randomIndex();
  // 随机高位,普通位置敌人
  anim.y =
    r == 0
      ? groundPosition - NinjaProps.height / 2
      : groundPosition - NinjaProps.height;
  // play the animation on a loop
  anim.play();
  anim.id = 'enemy' + new Date().getTime();
  // add it to the stage to render
  app.stage.addChild(anim);
  enemies.push(anim);
}

async function loadSmoke(x, y) {
  const name = 'smoke';
  const sheet = AssetsCache[name];
  const anim = new PIXI.AnimatedSprite(sheet.animations[name]);

  // set the animation speed
  anim.animationSpeed = 0.1666;
  anim.loop = false;
  anim.x = x;
  // 随机高位,普通位置敌人
  anim.y = y;
  // play the animation on a loop
  anim.play();
  // add it to the stage to render
  app.stage.addChild(anim);
  anim.onComplete = () => {
    app.stage.removeChild(anim);
  };
}
