import MapGenerator from "../tools/MapGenerator";
import Player from "./Player";
import Enemy from "./Enemy";

export default class Game {
    constructor() {
        this.map = {};
        this.mapGenerator = new MapGenerator();
        this.player = {};
        this.enemy = new Enemy('orc');
    }

    getMap = () => {
        return this.map.mapArray;
    };

    getPlayer = () => {
        return this.player;
    };

    getEnemy = () => {
        return this.enemy;
    };

    movePlayer = (x, y) => {
        if (window.gameDebugMode)
            console.log({x, y});
        //co je na policku
        this.player.x += x;
        this.player.y += y;
    };

    getTile = (x, y) => {
        if(x < 0 || y < 0 || x > 999 || y > 999) {
            //console.log({x, y});
            return undefined;
        }
        return this.map.getTile(x, y);
    };

    getTileType = (x, y) => {
        if(x < 0 || y < 0 || x > 999 || y > 999) {
            //console.log({x, y});
            return -10;
        }
        return this.map.getTileType(x, y);
    };


    getTileTypeText = (x, y) => {
        // if(x < 0 || y < 0 || x > 999 || y > 999) {
        //     return -1;
        // }
        let tile = this.map.getTile(x, y);
        if(tile.city){
            return "Merchant";
        }

        if(tile.chest) {
            return "Treasure";
        }

        let type = tile.type;
        switch (type) {
            case 1:
                return "Lake";
            default:
            case 2:
                return "Grassland";
            case 3:
                return "Forest";
            case 4:
                return "Mountains";
        }
    };

    init = () => {
        this.map = this.mapGenerator.generate();
        this.player = new Player(Math.floor(Math.random()*1000), Math.floor(Math.random()*1000));
        // this.player = new Player(0, 0);
    };
}