import MapGenerator from "../tools/MapGenerator";
import Player from "./Player";

export default class Game {
    constructor() {
        this.map = {};
        this.mapGenerator = new MapGenerator();
        this.player = {};
    }

    getMap = () => {
       return this.map.mapArray;
    };

    getPlayer = () => {
        return this.player;
    };

    movePlayer = (x, y) => {
        if(window.gameDebugMode)
            console.log({x, y});
        //co je na policku
        this.player.x += x;
        this.player.y += y;
    };

    getTileType = (x, y) => {
        return this.map.getTileType(x, y);
    };


    getTileTypeText = (x, y) => {
        let type = this.map.getTileType(x, y);
        switch (type) {
            case 1: return "Lake";
            default:
            case 2: return "Grassland";
            case 3: return "Forest";
            case 4: return "Mountains";
        }
    };

    init = () => {
        this.map = this.mapGenerator.generate();
        this.player = new Player(500, 500);
    };
}