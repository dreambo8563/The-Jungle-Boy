function enemyStart() {
  return app.screen.width - 100;
}

function loadAction(x, y, actions) {
  const tmp = new PIXI.AnimatedSprite(ActionMap[actions]);
  // console.log(actions);
  tmp.name = actions;
  tmp.x = x;
  tmp.y = y;
  tmp.anchor.set(0.5);
  tmp.scale.set(0.3);
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

// Capture the keyboard arrow keys
function keyboard(value) {
  const key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
}

function createDart() {
  const r = PIXI.Sprite.from(`./images/Kunai.png`);
  r.x = current.x;
  r.y = current.y;
  r.anchor.set(0.5);
  r.angle = 90;
  r.scale.set(0.3);
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
