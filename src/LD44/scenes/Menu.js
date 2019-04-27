import BasicScene from "./BasicScene";
import Button from "../objects/Button";
import * as PIXI from "pixi.js";

export default class Menu extends BasicScene {
    constructor(/*SceneLoader*/ loader) {
        super(loader);
        this.loader = loader;
        this.btnStart = null;
        this.background = this.loader.getSprite("bgMenu");
        this.background.width = this.loader.app.renderer.width;
        this.background.height = this.loader.app.renderer.height;

        loader.app.stage.addChild(this);
        this.init();
    }

    init = () => {
        this.addChild(this.background);
        let width = 200;
        let height = 60;
        let x = this.loader.app.renderer.width / 2 - (width / 2);
        let y = this.loader.app.renderer.height / 2 - (height / 2) - 200;
        let sprite_clicked = this.loader.getSprite("btn_clicked");
        let sprite = this.loader.getSprite("btn_normal");
        let textStyle = new PIXI.TextStyle({fill: "black", fontSize: 30, fontFamily: ["independent_modern_8x16_monRg"]});
        this.btnStart = new Button("Start Game", x, y, width, height, this, sprite, sprite_clicked, textStyle);
        this.btnStart.onClick(this.loader.start.bind(this));
    };


}