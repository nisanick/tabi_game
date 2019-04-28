import * as PIXI from "pixi.js"
import BasicScene from "./BasicScene";

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
        this.inventory.position.set(485,55);
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
        avatar.position.set(75, 35);
        avatar.scale.set(0.12);
        this.character.addChild(avatar);
    };

    drawStats = () => {

    };

    drawInventory = () => {

    };

    clearCanvas = () => {
        this.character.removeChildren(0, this.character.children.length);
        this.inventory.removeChildren(0, this.inventory.children.length);
        this.stats.removeChildren(0, this.stats.children.length);
    };
}