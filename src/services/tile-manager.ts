import { provide } from "inversify-binding-decorators";
import { Tile } from "~/stores/tile";
import { PointManager } from "./point-manager";
import { Point } from "pixi.js";

@provide(TileManager)
export class TileManager {
	public constructor(private readonly pointManager: PointManager) {}

	public produce = (bottomLeftPoint: Point): Tile => {
		return new Tile(bottomLeftPoint, this.pointManager);
	}
}