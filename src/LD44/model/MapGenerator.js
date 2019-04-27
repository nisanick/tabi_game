import Tile from "../objects/Tile";
import GameMap from "./GameMap";

export default class MapGenerator {
    constructor() {
        this.map = {};
    }

    generate = () => {
        let mapArray = [[]];
        for (let i = 0; i < 100; i++) {
            mapArray[i] = new Array();
            for (let j = 0; j < 100; j++) {
                mapArray[i][j] = new Tile(1);
            }
        }

        this.map = new GameMap(mapArray, this);
        return this.map;
    };
}