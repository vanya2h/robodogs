import { MapConfig } from "~/services/map-config";
import { XYConverter } from "~/services/x-y-converter";
import { Point } from "pixi.js";

export class IsoPoint {
	public readonly isometric: Point;

	public constructor(
		public readonly index: Point,
		public readonly mapConfig: MapConfig, 
		public readonly xyConverter: XYConverter,
	) {
		this.isometric = xyConverter.indexToIso(index);
	}
}