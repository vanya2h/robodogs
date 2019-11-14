import { provide } from "inversify-binding-decorators";
import { Container } from "pixi.js";

@provide(PixiContainer)
export class PixiContainer {
	public readonly current = new Container();
}