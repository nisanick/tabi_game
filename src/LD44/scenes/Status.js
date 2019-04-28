import * as PIXI from "pixi.js"
import BasicScene from "./BasicScene";
import ItemSlot from "../objects/ItemSlot";

export default class Status extends BasicScene {
    constructor(/* SceneLoader */ loader, game) {
        super(loader);
        this.loader = loader;
        this.game = game;

        this.background = loader.getGameSprite("book");
        this.background.width = loader.app.renderer.width;
        this.background.height = loader.app.renderer.height;
        this.addChild(this.background);
        this.shown = 0;

        this.character = new PIXI.Container();
        this.character.position.set(75,55);
        this.inventory = new PIXI.Container();
        this.inventory.position.set(92,550);
        this.inventory.visible = false;
        this.inventory.interactive = false;
        this.stats = new PIXI.Container();
        this.stats.position.set(485,55);
        this.stats.visible = false;

        this.inventory.on('click', this.equipItem);

        this.cross = this.loader.getGameSprite("cross");
        this.cross.scale.set(0.5);
        this.cross.position.set(800, 55);
        this.cross.interactive = true;

        this.cross.on("click", () => {
            this.loader.setScene(3);
        });

        this.addChild(this.cross);
        this.addChild(this.character);
        this.addChild(this.inventory);
        this.addChild(this.stats);

        this.repaint = false;
        loader.app.stage.addChild(this);

        this.clickTime = Date.now();
        this.clicked = -1;
    }

    repaintScene = () => {
        if(this.shown !== window.statsShown){
            this.repaint = true;
        }
        if(this.repaint){
            this.clearCanvas();

            this.drawCharacter();

            switch(window.statsShown){
                default:
                case 1: this.drawStats(); break;
                case 2: this.drawInventory(); break;
            }

            this.shown = window.statsShown;
            this.repaint = false;
        }
    };

    drawCharacter = () => {
        let avatar = this.loader.getGameSprite("player_full");
        avatar.position.set(5, 35);
        avatar.scale.set(0.15);

        let helm = new ItemSlot(this.game.player.head, this.loader);
        helm.position.set(470, 40);
        this.character.addChild(helm);

        let shoulder = new ItemSlot(this.game.player.chest, this.loader);
        shoulder.position.set(470, 140);
        this.character.addChild(shoulder);

        let chest = new ItemSlot(this.game.player.shoulder, this.loader);
        chest.position.set(470, 240);
        this.character.addChild(chest);

        let weapon1 = new ItemSlot(this.game.player.weapon1, this.loader);
        weapon1.position.set(470, 340);
        this.character.addChild(weapon1);

        let hand = new ItemSlot(this.game.player.hands, this.loader);
        hand.position.set(600, 40);
        this.character.addChild(hand);

        let legs = new ItemSlot(this.game.player.legs, this.loader);
        legs.position.set(600, 140);
        this.character.addChild(legs);

        let boot = new ItemSlot(this.game.player.boots, this.loader);
        boot.position.set(600, 240);
        this.character.addChild(boot);

        let weapon2 = new ItemSlot(this.game.player.weapon2, this.loader);
        weapon2.position.set(600, 340);
        this.character.addChild(weapon2);

        this.character.addChild(avatar);
    };

    drawStats = () => {

    };

    drawInventory = () => {
        let inventory = this.game.player.bag;

        for (let i = 0; i < inventory.length; i++) {
            let slot = new ItemSlot(inventory[i], this.loader);
            let row = Math.floor(i/8);
            let x = (i - 8*row) * slot.width;
            let y = row * slot.height;
            slot.position.set(x, y);
            this.inventory.addChild(slot);
        }
        this.inventory.interactive = true;
        this.inventory.visible = true;

    };

    clearCanvas = () => {
        this.inventory.interactive = false;
        this.inventory.visible = false;
        this.stats.visible = false;
        this.character.removeChildren(0, this.character.children.length);
        this.inventory.removeChildren(0, this.inventory.children.length);
        this.stats.removeChildren(0, this.stats.children.length);
    };

    equipItem = (e) => {
        let x = Math.floor((e.data.global.x - 92)/89.6);
        let y = Math.floor((e.data.global.y - 550)/89.6);

        let index = y*8 + x;
        if(this.clickTime + 500 > Date.now() && this.clicked === index){
            this.game.player.equip(index);
            this.repaint = true;
            this.clicked = -1;
        } else {
            this.clickTime = Date.now();
            this.clicked = index;
        }
        return false;
    }
}