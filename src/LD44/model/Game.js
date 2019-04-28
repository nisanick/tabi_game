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
        if (window.gameDebugMode)
            console.log({x, y});
        this.player.x += x;
        this.player.y += y;

        let tile = this.map.getTile(this.player.x, this.player.y);

        /*
            returns:
            0 - nothing
            1 - fight
            2 - merchant / chest
         */
        if (tile.city || tile.chest) {
            return 2
        }
    };

    getTile = (x, y) => {
        if (x < 0 || y < 0 || x > 999 || y > 999) {
            //console.log({x, y});
            return undefined;
        }
        return this.map.getTile(x, y);
    };

    getTileType = (x, y) => {
        if (x < 0 || y < 0 || x > 999 || y > 999) {
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
        if (tile.city) {
            return "Merchant";
        }

        if (tile.chest) {
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
        this.player = new Player(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));
        // this.player = new Player(0, 0);
    };
}