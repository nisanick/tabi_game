import * as PIXI from "pixi.js";
import BasicLevel from "./BasicLevel";
import GameObject from "../objects/GameObject";
import Tools from "../Tools";

export default class Level_1 extends BasicLevel {
    constructor(width, height, stage){
        super(width, height, stage);

        this.bgPath = "assets/dominik/background/bg2.jpg";
        this.bonusesAmount = 5;
        this.objects = [];
    }

    setup(){
        super.setup();
        let texture = PIXI.Sprite.from("assets/dominik/objects/wood_box.png");

        texture.width = 150;
        texture.height = 150;
        texture.x = 150;
        texture.y = 150;

        let texture2 = PIXI.Sprite.from("assets/dominik/objects/wood_rectangle.png");

        texture2.width = 150;
        texture2.height = 150;
        texture2.x = 600;
        texture2.y = 520;

        this.stage.addChild(texture);
        this.stage.addChild(texture2);

        this.objects[0] = new GameObject(texture, true);
        this.objects[1] = new GameObject(texture2, true);

        super.bonuses = Tools.getAllBonuses(this);

        this.initDone = true;
    }
}