const AssetsCache = {};
async function init() {
  const smoke = await PIXI.Assets.load(`images/smoke.json`);
  AssetsCache.smoke = smoke;

  for (const name of names) {
    const n = await PIXI.Assets.load(`images/${name}.json`);
    AssetsCache[name] = n;
  }
}
