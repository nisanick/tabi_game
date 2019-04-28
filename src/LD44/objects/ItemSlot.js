import * as PIXI from "pixi.js"

export default class ItemSlot extends PIXI.Container {
    constructor(item, loader){
        super();

        this.item = item;
        this.loader = loader;

        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x5D412C);
        this.bg.drawRect(0,0,256,256);
        this.frame = loader.getGameSprite("slot");
        if(this.item === undefined || this.item.icon === undefined){
            this.icon = this.loader.getGameSprite("noItem");

            this.icon.visible = window.gameDebugMode;
        } else {
            this.icon = this.loader.getGameSprite(this.item.icon);
        }
        this.scale.set(0.35);

        this.addChild(this.bg);
        this.addChild(this.icon);
        this.addChild(this.frame);
    }


}