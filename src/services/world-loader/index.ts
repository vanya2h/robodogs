import { provide } from "inversify-binding-decorators";
import { produceWorld } from "./utils/produce-world";

@provide(WorldLoader)
export class WorldLoader {
	public constructor() {}

	public produce = (size: number): IWorld => {
		return produceWorld(size);		
	}
}