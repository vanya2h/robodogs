import { TILE_CONFIG } from "~/consts";
import { MapConfig } from "./map-config";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { Point } from "pixi.js";
import { ITileConfig } from "~/interfaces/tile-config";

@provide(XYConverter)
export class XYConverter {
	public constructor(
		@inject(TILE_CONFIG) private readonly tileConfig: ITileConfig,
		private readonly mapConfig: MapConfig
	) {}

	public isoToIndex = ({ x, y }: Point): Point => {
		const { scale, width, rotation, pressRatio } = this.tileConfig;
		const { ox, oy } = this.mapConfig;

			const w = scale * width;

			const s = x - ox;
			const t = y - oy;

			const j = Math.floor((t - s * rotation / pressRatio) / (1 + rotation * rotation) * pressRatio / w);
			const i = Math.floor((s + j * w * rotation) / w);

			return new Point(i, j);
	}


	public indexToIso = (point: Point): Point => {
		const { scale, width, rotation, pressRatio } = this.tileConfig;
		const { ox, oy } = this.mapConfig;

    const x = ox + (point.x - point.y * rotation) * scale * width;
    const y = oy + (point.y + point.x * rotation) * scale * width / pressRatio;

		return new Point(x, y);
	}
}