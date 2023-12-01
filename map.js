let groundPosition = 0;

const mapAssetsCache = {
  grass: null,
  tree1: null,
  tree2: null,
  tree3: null,
  brush1: null,
  brush2: null,
  brush3: null,
  brush4: null,
  mushroom1: null,
  mushroom2: null,
  stone: null,
};
async function createMap() {
  const container = new PIXI.Container();
  const grassAssets = await PIXI.Assets.load('./images/bg/ground.png');
  mapAssetsCache.grass = grassAssets;
  container.x = 0;
  container.y = app.screen.height - grassAssets.height;
  groundPosition = app.screen.height - grassAssets.height;
  const times = Math.ceil(app.screen.width / grassAssets.width);
  // 从背景到前景, 依次添加到舞台
  app.stage.addChild(container);

  await loadTrees(10);
  await loadBrush(5);
  await loadStones(2);
  await loadMushroom(3);

  for (let i = 0; i < times; i++) {
    const grass = new PIXI.Sprite(grassAssets);
    grass.x = i * grass.width;
    grass.y = 0;
    container.addChild(grass);
  }
  app.stage.sortableChildren = true;
}
function randomIndex() {
  return Math.floor(Math.random() * 4);
}
async function loadTrees(num) {
  const tree1 = await PIXI.Assets.load('./images/bg/Tree_1.png');
  const tree2 = await PIXI.Assets.load('./images/bg/Tree_2.png');
  const tree3 = await PIXI.Assets.load('./images/bg/Tree_3.png');
  mapAssetsCache.tree1 = tree1;
  mapAssetsCache.tree2 = tree2;
  mapAssetsCache.tree3 = tree3;
  const trees = [tree1, tree2, tree3];
  // 根据 num的数量 随机对应数量树, x 坐标要屏幕内随机. y 坐标和人物保持一致
  for (let i = 0; i < num; i++) {
    const tree = new PIXI.Sprite(trees[Math.floor(Math.random() * 3)]);
    tree.x = Math.random() * app.screen.width;
    tree.y = groundPosition;
    tree.anchor.set(1);
    tree.zIndex = randomIndex();
    app.stage.addChild(tree);
  }
}

async function loadBrush(num) {
  // 根据 num的数量 随机对应数量灌木, x 坐标要屏幕内随机. y 坐标和人物保持一致
  const brush1 = await PIXI.Assets.load('./images/bg/Brush1.png');
  const brush2 = await PIXI.Assets.load('./images/bg/Brush2.png');
  const brush3 = await PIXI.Assets.load('./images/bg/Brush3.png');
  const brush4 = await PIXI.Assets.load('./images/bg/Brush4.png');
  mapAssetsCache.brush1 = brush1;
  mapAssetsCache.brush2 = brush2;
  mapAssetsCache.brush3 = brush3;
  mapAssetsCache.brush4 = brush4;
  const brushs = [brush1, brush2, brush3, brush4];
  for (let i = 0; i < num; i++) {
    const brush = new PIXI.Sprite(brushs[Math.floor(Math.random() * 4)]);
    brush.x = Math.random() * app.screen.width;
    brush.y = groundPosition;
    brush.anchor.set(1);
    brush.zIndex = randomIndex();
    app.stage.addChild(brush);
  }
}

async function loadMushroom(num) {
  // 根据 num的数量 随机对应数量蘑菇, x 坐标要屏幕内随机. y 坐标和人物保持一致
  const mushroom = await PIXI.Assets.load('./images/bg/Mushroom_1.png');
  const mushroom2 = await PIXI.Assets.load('./images/bg/Mushroom_2.png');
  mapAssetsCache.mushroom1 = mushroom;
  mapAssetsCache.mushroom2 = mushroom2;
  const mushrooms = [mushroom, mushroom2];
  for (let i = 0; i < num; i++) {
    const mushroom = new PIXI.Sprite(mushrooms[Math.floor(Math.random() * 2)]);
    mushroom.x = Math.random() * app.screen.width;
    mushroom.y = groundPosition;
    mushroom.anchor.set(1);
    mushroom.zIndex = randomIndex();
    app.stage.addChild(mushroom);
  }
}

async function loadStones(num) {
  // 根据 num的数量 随机对应数量石头, x 坐标要屏幕内随机. y 坐标和人物保持一致
  const stoneAssets = await PIXI.Assets.load('./images/bg/Stone.png');
  mapAssetsCache.stone = stoneAssets;
  for (let i = 0; i < num; i++) {
    const stone = new PIXI.Sprite(stoneAssets);
    stone.x = Math.random() * app.screen.width;
    stone.y = groundPosition;
    stone.anchor.set(1);
    stone.zIndex = randomIndex();
    app.stage.addChild(stone);
  }
}
