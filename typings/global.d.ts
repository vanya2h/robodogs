type Point3D = [number, number, number];
type Point2D = [number, number];

type Rectangle = [number, number];

/**
 * Ethereum address
 */

interface IAddress {
	toString: () => string,
}

interface IPreferences {
	name?: string,
	avatar?: string,
}

interface IUser {
	address: IAddress,
	preferences: IPreferences
}

interface IOwnable {
	owner?: IUser
}

interface IAsset {
	id: string,
	image: string,
}

interface ITile {
	point: Point3D,
	asset: IAsset
}

interface IEntity extends IOwnable {
	id: string,
	basis: Point2D,
	tiles: ITile[],
	occupied: Point2D[],
}

interface IArea extends IOwnable {
	id: string,
	basis: Point2D,
	entities: IEntity[],
	occupied: Point2D[],
	owner: IUser,
	address:  IAddress
}

interface IWorld {
	size: number,
	areas: IArea[],
	decorations: IEntity[],
}