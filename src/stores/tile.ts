import { Graphics, Polygon, Point } from "pixi.js";
import { IsoPoint } from "~/stores/iso-point";
import { PointManager } from "~/services/point-manager";
import { inject } from "inversify";
import { TILE_CONFIG } from "~/consts";
import { ITileConfig } from "~/interfaces/tile-config";

export interface ITileCorners {
	topLeft: IsoPoint,
	topRight: IsoPoint,
	bottomRight: IsoPoint, 
	bottomLeft: IsoPoint
 }

export class Tile extends Graphics {
	public cornerBounds: ITileCorners;
	public hitArea: Polygon;
	public color: number = 0xff0000 * Math.random();

	public constructor(
		bottomLeftPoint: Point, 
		pointManager: PointManager, 
	) {
		super();
		

		this.interactive = true;
		this.buttonMode = true;
		const { x, y } = bottomLeftPoint;

		this.addListener('click', () => {
			this.changeColor(0xff0000 * Math.random());
		})

		this.cornerBounds = {
			topLeft: pointManager.buildIsoPoint(new Point(x, y + 1)),
			topRight: pointManager.buildIsoPoint(new Point(x + 1, y + 1)),
			bottomRight: pointManager.buildIsoPoint(new Point(x + 1, y)),
			bottomLeft: pointManager.buildIsoPoint(new Point(x, y)),
		}

    this.hitArea = new Polygon([
			this.cornerBounds.topLeft.isometric,
			this.cornerBounds.topRight.isometric,
			this.cornerBounds.bottomRight.isometric,
			this.cornerBounds.bottomLeft.isometric
		]);

		this.changeColor(this.color);
	}

	public changeColor = (color: number) => {
		this.clear();
    this.beginFill(color);

    this.moveTo(this.cornerBounds.bottomLeft.isometric.x, this.cornerBounds.bottomLeft.isometric.y)
    this.lineTo(this.cornerBounds.topLeft.isometric.x, this.cornerBounds.topLeft.isometric.y)
    this.lineTo(this.cornerBounds.topRight.isometric.x, this.cornerBounds.topRight.isometric.y)
    this.lineTo(this.cornerBounds.bottomRight.isometric.x, this.cornerBounds.bottomRight.isometric.y)

		this.endFill();
	}
}