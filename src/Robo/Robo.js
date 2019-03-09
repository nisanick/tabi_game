import Player from "./Player";
import * as PIXI from "pixi.js";

export default class Robo{
    constructor(/*PIXI*/app){
        this.app = app;
        this.loader = new PIXI.Loader();
        this.player = new Player(this.loader, app);

        app.ticker.add(delta => this.gameLoop(delta));
    }

    gameLoop = (delta) => {
        this.player.moveSprite();
    }
}