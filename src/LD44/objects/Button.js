import * as PIXI from "pixi.js";


export default class Button {
    constructor(text, x, y, width, height, /*PIXI.Container*/ container, /*PIXI.Sprite*/ spriteNormal, spriteClick, /*PIXI.TextStyle*/ textStyle) {
        this.textValue = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.btnContainer = new PIXI.Container();
        this.btnContainer.interactive = true;
        this.spriteNormal = spriteNormal;
        this.spriteNormal.x = this.x;
        this.spriteNormal.y = this.y;
        this.spriteNormal.width = this.width;
        this.spriteNormal.height = this.height;

        this.spriteClick = spriteClick;
        this.spriteClick.x = this.x;
        this.spriteClick.y = this.y;
        this.spriteClick.width = this.width;
        this.spriteClick.height = this.height;
        this.spriteClick.visible = false;

        this.text = new PIXI.Text(text, textStyle);
        this.container = container;
        this.container.addChild(this.btnContainer);

        this.btnContainer.addChild(this.spriteNormal);
        this.btnContainer.addChild(this.spriteClick);

        this.init();
    }

    init = () => {
        if (this.text !== undefined) {
            let x = this.x + this.spriteNormal.width / 2 - this.text.width / 2;
            let y = this.y + this.spriteNormal.height / 2 - this.text.height / 2;
            this.text.position.set(x, y);
            this.btnContainer.addChild(this.text);
        }
    };

    onClick(method, params) {
        this.btnContainer.on("mousedown", () => {
            this.spriteNormal.visible = false;
            this.spriteClick.visible = true;
        });

        this.btnContainer.on("mouseup", () => {
            this.spriteNormal.visible = true;
            this.spriteClick.visible = false;
            method(params);
        });
    }


}