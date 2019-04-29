import * as PIXI from "pixi.js";
import BasicScene from "./BasicScene";
import ItemSlot from "../objects/ItemSlot";

export default class Merchant extends BasicScene {
    constructor(loader, game) {
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
            this.fightInventory = false;
            this.loader.setScene(3);
        });
        this.addChild(this.cross);

        this.goldPlayer = new PIXI.Container();
        let goldbg = new PIXI.Graphics();
        goldbg.beginFill(0x5D412C);
        goldbg.drawRect(0,0,269,55);
        this.goldPlayer.addChild(goldbg);
        this.goldPlayer.position.set(110,772);

        this.textPlayer = new PIXI.Text(this.game.player.gold.toLocaleString(), new PIXI.TextStyle({fill: "white", fontSize: 30, fontFamily: "Linepixels"}));
        this.textPlayer.position.set(50,10);

        let coin = this.loader.getGameSprite("coin");
        coin.scale.set(0.15,0.15);
        coin.position.set(5, 10);
        this.goldPlayer.addChild(this.textPlayer);
        this.goldPlayer.addChild(coin);
        this.addChild(this.goldPlayer);

        this.goldNpc = new PIXI.Container();
        goldbg = new PIXI.Graphics();
        goldbg.beginFill(0x5D412C);
        goldbg.drawRect(0,0,269,55);
        this.goldNpc.addChild(goldbg);
        this.goldNpc.position.set(525,772);

        this.textNPC = new PIXI.Text("0", new PIXI.TextStyle({fill: "white", fontSize: 30, fontFamily: "Linepixels"}));
        this.textNPC.position.set(50,10);

        coin = this.loader.getGameSprite("coin");
        coin.scale.set(0.15,0.15);
        coin.position.set(5, 10);
        this.goldNpc.addChild(this.textNPC);
        this.goldNpc.addChild(coin);

        this.addChild(this.goldNpc);

        this.playerInventory = new PIXI.Container();
        this.playerInventory.position.set(110, 55);
        this.tileInventory = new PIXI.Container();
        this.tileInventory.position.set(525, 55);
        this.addChild(this.playerInventory);
        this.addChild(this.tileInventory);
        this.playerInventory.interactive = true;
        this.tileInventory.interactive = true;
        this.playerInventory.on('click', this.transferOut);
        this.tileInventory.on('click', this.transferIn);

        this.lastX = -1;
        this.lastY = -1;

        this.repaint = true;

        this.inventory = undefined;
        this.fightInventory = false;

        this.clickTimeLeft = Date.now();
        this.clickTimeRight = Date.now();
        this.clickedLeft = -1;
        this.clickedRight = -1;

        loader.app.stage.addChild(this);
    }

    repaintScene = () => {
        if (this.lastX !== this.game.player.x || this.lastY !== this.game.player.y) {
            this.repaint = true;
        }

        if (this.repaint) {
            this.clearInventory();
            this.lastX = this.game.player.x;
            this.lastY = this.game.player.y;
            this.repaint = false;

            this.inventory;
            if (this.fightInventory){
                this.inventory = this.game.getEnemyInventory();
            } else {
                this.inventory = this.game.getTile(this.lastX, this.lastY).inventory;
            }

            this.textPlayer.text = this.game.player.gold.toLocaleString();

            if(this.inventory.type === 2){
                this.goldNpc.visible = false;
            } else {
                this.textNPC.text = this.inventory.cash.toLocaleString();
                this.goldNpc.visible = true;
            }

            this.drawInventory(this.game.player.bag, this.playerInventory);
            this.drawInventory(this.inventory.inventory, this.tileInventory);
        }
    };

    clearInventory = () => {
        this.playerInventory.removeChildren(0, this.playerInventory.children.length);
        this.tileInventory.removeChildren(0, this.tileInventory.children.length);
    };

    drawInventory = (inventory, buffer) => {

        for (let i = 0; i < inventory.length; i++) {
            let slot = new ItemSlot(inventory[i], this.loader);
            let row = Math.floor(i / 3);
            let x = (i - 3 * row) * slot.width;
            let y = row * slot.height;
            slot.position.set(x, y);
            buffer.addChild(slot);
        }

    };


    transferOut = (e) => {
        let x = Math.floor((e.data.global.x - 110) / 89.6);
        let y = Math.floor((e.data.global.y - 55) / 89.6);

        let index = y * 3 + x;
        if (this.clickTimeLeft + 500 > Date.now() && this.clickedLeft === index) {
            if (this.inventory.haveSpace()) {
                let item = this.game.player.removeItem(index);
                if(item !== undefined){
                    if(this.inventory.type === 1){
                        if(this.inventory.cash < item.value){
                            this.game.player.addItem(item);
                        } else {
                            this.game.player.addGold(item.value);
                            this.inventory.addItem(item);
                        }
                    } else {
                        this.inventory.addItem(item);
                    }
                }
            }
            this.repaint = true;
            this.clickedLeft = -1;
        } else {
            this.clickTimeLeft = Date.now();
            this.clickedLeft = index;
        }
        return false;
    };


    transferIn = (e) => {
        let x = Math.floor((e.data.global.x - 525) / 89.6);
        let y = Math.floor((e.data.global.y - 55) / 89.6);

        let index = y * 3 + x;
        if (this.clickTimeRight + 500 > Date.now() && this.clickedRight === index) {
            if (this.game.player.haveSpace()) {
                let item = this.inventory.removeItem(index);
                if(item !== undefined) {
                    if(this.inventory.type === 1){
                        if(item.value > this.game.player.gold){
                            this.inventory.addItem(item);
                        } else {
                            this.game.player.addGold(item.value*-1);
                            this.game.player.addItem(item);
                        }
                    } else {
                        if (item.slot === 0) {
                            this.game.player.addGold(item.value);
                        } else {
                            this.game.player.addItem(item);
                        }
                    }
                }
            }
            this.repaint = true;
            this.clickedRight = -1;
        } else {
            this.clickTimeRight = Date.now();
            this.clickedRight = index;
        }
        return false;
    };
}