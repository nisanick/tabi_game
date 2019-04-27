import MapGenerator from "./MapGenerator";
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
        //co je na policku
        this.player.x = x;
        this.player.y = y;
    };

    init = () => {
        this.map = this.mapGenerator.generate();
        this.player = new Player(50, 50);
    };
}