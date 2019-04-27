import Tile from "../objects/Tile";
import GameMap from "../model/GameMap";

export default class MapGenerator {
    constructor() {
        this.map = {};
    }

    generate = () => {
        let mapArray = [[]];
        let start = 450;

        let diff;
        let previous;
        let begin = Math.floor(Math.random() * 4) + 1;
        let chance;

        for (let i = 0; i < 100; i++) {
            previous = 0;
            if (mapArray[i + start] === undefined) {
                mapArray[i + start] = [];
            }
            for (let j = 0; j < 100; j++) {
                diff = 10;
                if (i === 0 && j === 0) {
                    mapArray[i + start][j + start] = new Tile(begin);
                    continue;
                }

                if (i > 0) {
                    previous = mapArray[i - 1 + start][j + start].getType();
                }
                if (j > 0) {
                    if (mapArray[i + start][j - 1 + start].getType() === previous) {
                        diff = 40;
                    } else {
                        if(Math.floor(Math.random() * 100) > 50) {
                            previous = mapArray[i + start][j - 1 + start].getType();
                        }
                    }
                }
                chance = Math.floor(Math.random() * 100);
                if(chance > diff){
                    mapArray[i + start][j + start] = new Tile(previous);
                } else {
                    if(previous === 4){
                        mapArray[i + start][j + start] = new Tile(3);
                    } else if(previous === 1){
                        mapArray[i + start][j + start] = new Tile(2);
                    } else if(chance < diff/2) {
                        mapArray[i + start][j + start] = new Tile(previous - 1);
                    } else {
                        mapArray[i + start][j + start] = new Tile(previous + 1);
                    }
                }
            }
        }

        this.map = new GameMap(mapArray, this);
        return this.map;
    };
}