import * as PIXI from "pixi.js"

export default class ItemSlot extends PIXI.Container {
    constructor(item, loader){
        super();

        this.item = item;
        this.loader = loader;

        this.frame = loader.getGameSprite("slot");
        this.frame.scale.set(0.35);
        this.icon;
        if(this.item === undefined){
            this.icon = this.loader.getGameSprite("noItem");
        } else {
            this.icon = this.loader.getGameSprite(this.item.icon);
        }
        this.icon.scale.set(0.35);

        this.addChild(this.icon);
        this.addChild(this.frame);
    }


}