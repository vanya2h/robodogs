import { provide } from "inversify-binding-decorators";
import { XYConverter } from "~/services/x-y-converter";
import { MapConfig } from "~/services/map-config";
import { Point } from "pixi.js";
import { IsoPoint } from "~/stores/iso-point";

@provide(PointManager)
export class PointManager {
	public constructor(
		private readonly xyConverter: XYConverter,
		private readonly mapConfig :MapConfig,
	) {}

	public buildIsoPoint = (index: Point): IsoPoint => {
		return new IsoPoint(index, this.mapConfig, this.xyConverter);
	}
}