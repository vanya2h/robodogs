/* eslint-disable global-require */
import 'reflect-metadata';
import { run } from '~/runtime';
import { PixiApp } from '~/services/pixi-app';
import { MapConfig } from '~/services/map-config';
import * as PIXI from "pixi.js"
import { TileManager } from './services/tile-manager';
import { Point } from 'pixi.js';
import { GAME_CONTAINER, TILE_CONFIG } from './consts';
import { ITileConfig } from './interfaces/tile-config';

const container = run();
container.get(PixiApp).start();

const mapConfig = container.get(MapConfig);
const tileManager = container.get(TileManager);
const gameContainer = container.get<PIXI.Container>(GAME_CONTAINER);

for (var i = -mapConfig.size; i <= mapConfig.size; i++) {
	for (var j = -mapConfig.size; j <= mapConfig.size; j++) {
			const tile = tileManager.produce(new Point(i, j));
			gameContainer.addChild(tile);
	}
}

const tileConfig = container.get<ITileConfig>(TILE_CONFIG);

// const texture = new PIXI.RenderTexture({
// 	width: mapConfig.ox * 2, 
// 	height: mapConfig.oy + tileConfig.width * tileConfig.scale / tileConfig.pressRatio * 2
// })

// texture.render(background);


const pixiApp = container.get(PixiApp);
pixiApp.app.stage.addChild(gameContainer);

const animate = () => {
	requestAnimationFrame(animate);
	pixiApp.app.renderer.render(pixiApp.app.stage);
}

requestAnimationFrame(animate);

// pixiApp.app.ticker.add((delta) => {
// 	// gameContainer.rotation -= 0.01 * delta;
// })
