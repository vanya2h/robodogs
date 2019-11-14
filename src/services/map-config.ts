import { inject } from "inversify";
import { MAP_SIZE, TILE_CONFIG } from "~/consts";
import { provide } from "inversify-binding-decorators";
import { PixiApp } from "./pixi-app";
import { ITileConfig } from "~/interfaces/tile-config";

@provide(MapConfig)
export class MapConfig {
	public readonly ox: number;
	public readonly oy: number;
	
	public constructor(
		@inject(MAP_SIZE) public readonly size: number,
		@inject(TILE_CONFIG) public readonly tileConfig: ITileConfig,
		// private readonly pixiApp: PixiApp,
	) {
		// w  / 2;    // offset // 
		this.ox = (size * 2 + 1) * tileConfig.width * tileConfig.scale;

		// ox/ai // (h - at) / 2;
		this.oy = ((size * 2 + 1) * tileConfig.width - tileConfig.width) * tileConfig.scale / tileConfig.pressRatio;
	}

	// public getBounds = (): ISquareBounds => {
	// 	const { pixiApp, tileConfig } = this;
	// 	const { scale, width, pressRatio } = tileConfig;

	// 	return {
	// 		left: -this.ox * 2 + pixiApp.width,
	// 		right: 0,
	// 		bottom: -(this.oy + width * scale / pressRatio) * 2 + pixiApp.height,
	// 		top: 0
	// 	}
	// }
}