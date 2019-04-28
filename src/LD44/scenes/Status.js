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
        this.stats = new PIXI.Container();
        this.stats.position.set(485,55);
        this.stats.visible = false;

        this.addChild(this.character);
        this.addChild(this.inventory);
        this.addChild(this.stats);

        this.repaint = false;
        loader.app.stage.addChild(this);
    }

    repaintScene = () => {
        if(this.shown !== window.statsShown){
            this.repaint = true;
        }
        if(this.repaint){
            this.clearCanvas();
            console.log(window.statsShown, this.shown);

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
        helm.position.set(440, 40);
        this.character.addChild(helm);

        let shoulder = new ItemSlot(this.game.player.chest, this.loader);
        shoulder.position.set(440, 140);
        this.character.addChild(shoulder);

        let chest = new ItemSlot(this.game.player.shoulder, this.loader);
        chest.position.set(440, 240);
        this.character.addChild(chest);

        let weapon1 = new ItemSlot(this.game.player.weapon1, this.loader);
        weapon1.position.set(440, 340);
        this.character.addChild(weapon1);

        let hand = new ItemSlot(this.game.player.hands, this.loader);
        hand.position.set(650, 40);
        this.character.addChild(hand);

        let legs = new ItemSlot(this.game.player.legs, this.loader);
        legs.position.set(650, 140);
        this.character.addChild(legs);

        let boot = new ItemSlot(this.game.player.boots, this.loader);
        boot.position.set(650, 240);
        this.character.addChild(boot);

        let weapon2 = new ItemSlot(this.game.player.weapon2, this.loader);
        weapon2.position.set(650, 340);
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
        this.inventory.visible = true;

    };

    clearCanvas = () => {
        this.character.removeChildren(0, this.character.children.length);
        this.inventory.removeChildren(0, this.inventory.children.length);
        this.stats.removeChildren(0, this.stats.children.length);
    };
}