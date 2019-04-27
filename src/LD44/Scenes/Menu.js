import BasicScene from "./BasicScene";
import Button from "../Objects/Button";
import * as PIXI from "pixi.js";

export default class Menu extends BasicScene {
    constructor(/*SceneLoader*/ sceneLoader) {
        super();
        this.sceneLoader = sceneLoader;
        this.btnStart = null;
    }

    init = () => {
        let x = this.sceneLoader.app.renderer.width / 2 - 50;
        let y = this.sceneLoader.app.renderer.height / 2 - 25;
        let sprite = this.sceneLoader.getSprite("btn");
        let textStyle = new PIXI.TextStyle({fill: "white", fontSize: 20});
        this.btnStart = new Button("Start Game", x, y, 100, 50, this, sprite, textStyle);
    };


}