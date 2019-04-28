import * as PIXI from "pixi.js"

export default class StatusBar extends PIXI.Container {
    constructor(color, loader){
        super();

        this.percentage = 1;
        this.loader = loader;

        this.bg = this.loader.getGameSprite("barBg");
        this.bg.position.set(4,5);
        this.addChild(this.bg);

        this.fill = this.loader.getGameSprite("bar" + color);
        this.fill.position.set(5,5);
        this.fill.scale.set(this.percentage, 1);
        this.addChild(this.fill);

        this.border = this.loader.getGameSprite("barBorder");
        this.border2 = this.loader.getGameSprite("barBorder2");
        this.border2.position.set(0,3);
        this.border.position.set(0,1);

        this.text = new PIXI.Text(Math.floor(this.percentage*100) + "%", new PIXI.TextStyle({fill: "white", fontSize: 52, fontFamily: "Linepixels"}));
        this.text.position.set(40, 12);
        this.addChild(this.text);
        // this.addChild(this.border);
        this.addChild(this.border2);
    }

    changeColor = (color) => {
        let index = this.getChildIndex(this.fill);
        this.removeChildAt(index);

        this.fill = this.loader.getGameSprite("bar" + color);
        this.fill.position.set(5,5);
        this.fill.scale.set(this.percentage, 1);

        this.addChildAt(this.fill, index);
    };

    setPercentage = (percentage) => {
        this.percentage = percentage;
        this.fill.scale.set(this.percentage, 1);
        this.text.text = Math.floor(this.percentage*100) + "%";
        this.text.position.set(40, 12);
    }
    
    
}