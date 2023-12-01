let groundPosition = 0;
async function createMap() {
  const container = new PIXI.Container();
  const texture = await PIXI.Assets.load('./images/bg/ground.png');
  container.x = 0;
  container.y = app.screen.height - texture.height;
  groundPosition = app.screen.height - texture.height;
  const times = Math.ceil(app.screen.width / texture.width);
  app.stage.addChild(container);

  for (let i = 0; i < times; i++) {
    const grass = new PIXI.Sprite(texture);
    grass.x = i * texture.width;
    grass.y = 0;
    container.addChild(grass);
  }
}
