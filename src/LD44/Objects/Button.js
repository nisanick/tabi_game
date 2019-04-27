import * as PIXI from "pixi.js";


export default class Button extends PIXI.Graphics{
    constructor(text, x, y, width, height, /*PIXI.Container*/ container, /*PIXI.Texture*/ sprite, /*PIXI.TextStyle*/ textStyle){
        super();
        this.textValue = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.text = new PIXI.Text(text, textStyle);
        this.container = container;
    }

    init = () => {
        if (this.text !== undefined){
            let x = this.sprite.width / 2 - this.text.width / 2;
            let y = this.sprite.height / 2 - this.text.height / 2;
            this.text.position.set(x, y);
            this.container.addChild(this.text);
        }
        this.container.addChild(this);
    };




}