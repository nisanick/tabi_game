import * as PIXI from "pixi.js";

export default class GameObject {

    constructor(texture, simple){
        this.texture = texture;

        this.x = texture.x;
        this.y = texture.y;
        this.width = texture.width;
        this.height = texture.height;
        this.walls = [];
        this.simple = simple;
    }

    addWall(/*wall*/wall){
        this.walls.push(wall);
    }
}