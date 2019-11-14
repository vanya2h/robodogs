type Rectangle = [number, number];

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

// interface IEntity extends IOwnable {
// 	id: string,
// 	basis: Point,
// 	tiles: Tile[],
// 	occupied: Point[],
// }

// interface IArea extends IOwnable {
// 	id: string,
// 	basis: Point,
// 	entities: IEntity[],
// 	occupied: Point[],
// 	owner: IUser,
// 	address:  IAddress
// }

// interface IWorld {
// 	size: number,
// 	areas: IArea[],
// 	decorations: IEntity[],
// }


