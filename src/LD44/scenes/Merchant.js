import * as PIXI from "pixi.js";
import BasicScene from "./BasicScene";
import ItemSlot from "../objects/ItemSlot";

export default class Merchant extends BasicScene{
    constructor(loader, game){
        super(loader);
        this.loader = loader;
        this.game = game;

        this.background = loader.getGameSprite("book");
        this.background.width = loader.app.renderer.width;
        this.background.height = loader.app.renderer.height;
        this.addChild(this.background);

        this.cross = this.loader.getGameSprite("cross");
        this.cross.scale.set(0.5);
        this.cross.position.set(800, 55);
        this.cross.interactive = true;

        this.cross.on("click", () => {
            this.loader.setScene(3);
        });
        this.addChild(this.cross);

        this.playerInventory = new PIXI.Container();
        this.playerInventory.position.set(110,55);
        this.tileInventory = new PIXI.Container();
        this.tileInventory.position.set(525,55);
        this.addChild(this.playerInventory);
        this.addChild(this.tileInventory);

        this.lastX = -1;
        this.lastY = -1;

        this.repaint = true;

        loader.app.stage.addChild(this);
    }

    repaintScene = () => {
        if(this.lastX !== this.game.player.x || this.lastY !== this.game.player.y){
            this.repaint = true;
        }

        if(this.repaint){
            this.clearInventory();
            this.lastX = this.game.player.x;
            this.lastY = this.game.player.y;
            this.repaint = false;

            this.drawInventory(this.game.player.bag, this.playerInventory);
            this.drawInventory(this.game.getTile(this.lastX, this.lastY).getInventory(), this.tileInventory);
        }
    };

    clearInventory = () => {
        this.playerInventory.removeChildren(0, this.playerInventory.children.length);
        this.tileInventory.removeChildren(0, this.tileInventory.children.length);
    };

    drawInventory = (inventory, buffer) => {

        for (let i = 0; i < inventory.length; i++) {
            let slot = new ItemSlot(inventory[i], this.loader);
            let row = Math.floor(i/3);
            let x = (i - 3*row) * slot.width;
            let y = row * slot.height;
            slot.position.set(x, y);
            buffer.addChild(slot);
        }

    };
}