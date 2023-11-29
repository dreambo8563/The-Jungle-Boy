//Capture the keyboard arrow keys
const left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown'),
  a = keyboard('a'),
  s = keyboard('s'),
  d = keyboard('d'),
  f = keyboard('f');

a.press = () => {
  if (
    ['slide', 'jumps', 'attack', 'jumpAttack', 'jumpThrow'].indexOf(
      current.name
    ) === -1
  ) {
    switchToAction('attack');
    duration = 0;
  }
};
s.press = () => {
  if (
    ['slide', 'jumps', 'jumpAttack', 'jumpThrow'].indexOf(current.name) === -1
  ) {
    switchToAction('jumpAttack');
    duration = 0;
  }
};
d.press = () => {
  if (
    ['slide', 'jumps', 'jumpAttack', 'jumpThrow'].indexOf(current.name) === -1
  ) {
    switchToAction('throw');
    duration = 0;
    Darts.push(createDart());
  }
};

f.press = () => {
  if (
    ['slide', 'jumps', 'jumpAttack', 'jumpThrow'].indexOf(current.name) === -1
  ) {
    switchToAction('jumpThrow');
    duration = 0;
  }
};

//Left arrow key `press` method
left.press = () => {
  if (current.name === 'idle') {
    switchToAction('runs');
  }
  if (current.x > 0) {
    current.x -= 5;
  }
};
left.release = () => {
  if (
    ['slide', 'jumps', 'jumpAttack', 'jumpThrow'].indexOf(current.name) === -1
  ) {
    switchToAction('idle');
  }
};

//Left arrow key `press` method
right.press = () => {
  if (current.name === 'idle') {
    switchToAction('runs');
  }

  if (current.x < window.innerWidth) {
    current.x += 5;
  }
};
right.release = () => {
  if (
    ['slide', 'jumps', 'jumpAttack', 'jumpThrow'].indexOf(current.name) === -1
  ) {
    switchToAction('idle');
  }
};

//Left arrow key `press` method
up.press = () => {
  if (
    current.name !== 'jumps' &&
    current.name !== 'jumpAttack' &&
    current.name !== 'jumpThrow'
  ) {
    switchToAction('jumps');
    duration = 0;
  }
};

down.press = () => {
  if (
    current.name !== 'slide' &&
    current.name !== 'jumps' &&
    current.name !== 'jumpAttack' &&
    current.name !== 'jumpThrow'
  ) {
    switchToAction('slide');
    duration = 0;
  }
};

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
