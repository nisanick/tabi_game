export default class GameMap {
    constructor(mapArray, generator) {
        this.mapArray = mapArray;
        this.generator = generator;
    }

    getTileType = (x, y) => {
        return this.mapArray[x][y].getType();
    };

    getTile = (x, y) => {
        return this.mapArray[x][y];
    }


}