import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as PIXI from "pixi.js"
import { APP_NODE, TILE_CONFIG, GAME_CONTAINER, MAP_SIZE } from '~/consts';
import { ITileConfig } from '~/interfaces/tile-config';

export const run = () => {
  const container = new Container({
    defaultScope: 'Singleton',
	});

	container.bind(APP_NODE).toConstantValue(document.body);
	container.bind(MAP_SIZE).toConstantValue(4);

	container.bind<ITileConfig>(TILE_CONFIG).toConstantValue({
		width: 64,
		scale: 1,
		rotation: 1,
		pressRatio: 2.5,
	})

	container.bind(GAME_CONTAINER).toConstantValue(new PIXI.Container());
	
  container.load(buildProviderModule());

  return container;
};
