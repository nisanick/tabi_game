import * as PIXI from "pixi.js";
import BasicLevel from "./BasicLevel";
import GameObject from "../objects/GameObject";
import Tools from "../Tools";

export default class Level_2 extends BasicLevel {
    constructor(width, height, stage) {
        super(width, height, stage);

        super.bgPath = "assets/dominik/background/bg.jpg";
        super.objects = [];
        this.bonusesAmount = 5;
    }

    setup() {
        super.setup();

        let x = 0;
        for (let i = 0; i < 10; i++) {
            let texture = PIXI.Sprite.from("assets/dominik/objects/wood_rectangle.png");

            texture.width = 70;
            texture.height = 70;
            texture.x = 100 + x;
            texture.y = 100;

            x += 70;

            this.stage.addChild(texture);
            this.objects.push(new GameObject(texture, true))
        }

        x = 0;
        for (let i = 0; i < 10; i++) {
            let texture = PIXI.Sprite.from("assets/dominik/objects/wood_box.png");

            texture.width = 70;
            texture.height = 70;
            texture.x = 100 + x;
            texture.y = 650;

            x += 70;

            this.stage.addChild(texture);
            this.objects.push(new GameObject(texture, true))
        }

        let y = 70;
        for (let i = 0; i < 2; i++) {
            let texture = PIXI.Sprite.from("assets/dominik/objects/wood_rectangle.png");
            texture.width = 70;
            texture.height = 70;
            texture.x = 100;
            texture.y = 100 + y;

            let texture2 = PIXI.Sprite.from("assets/dominik/objects/wood_rectangle.png");
            texture2.width = 70;
            texture2.height = 70;
            texture2.x = 730;
            texture2.y = 100 + y;

            let texture3 = PIXI.Sprite.from("assets/dominik/objects/wood_box.png");
            texture3.width = 70;
            texture3.height = 70;
            texture3.x = 100;
            texture3.y = 650 - y;

            let texture4 = PIXI.Sprite.from("assets/dominik/objects/wood_box.png");
            texture4.width = 70;
            texture4.height = 70;
            texture4.x = 730;
            texture4.y = 650 - y;

            this.stage.addChild(texture);
            this.objects.push(new GameObject(texture, true))
            this.stage.addChild(texture2);
            this.objects.push(new GameObject(texture2, true))
            this.stage.addChild(texture3);
            this.objects.push(new GameObject(texture3, true))
            this.stage.addChild(texture4);
            this.objects.push(new GameObject(texture4, true))

            y += 70;
        }


        super.bonuses = Tools.getAllBonuses(this);
    }
}