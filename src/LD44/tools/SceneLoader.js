import * as PIXI from "pixi.js";
import Loading from "../scenes/Loading";
import SpriteLoader from "./SpriteLoader";
import Menu from "../scenes/Menu";
import World from "../scenes/World";
import Game from "../model/Game";
import Fight from "../scenes/Fight";
import Status from "../scenes/Status";
import Merchant from "../scenes/Merchant";
import Tooltip from "../objects/Tooltip";
import GameOver from "../scenes/GameOver";

export default class SceneLoader {
    constructor(/* PIXI.Application */ app) {
        this.app = app;

        this.scenes = [];
        this.activeScene = 0;
        this.spriteLoader = new SpriteLoader();
        this.loader = new PIXI.Loader();
        this.game;

        this.count = 0;
    }

    init = () => {
        this.loader.add("bgLoad", "assets/images/bgLoading.png")
            .load(this.setupLoading);


    };

    setupLoading = () => {
        this.scenes.push(new Loading(this)); //0
        this.setScene(0);
        this.loader.onProgress.add((loader)=>{this.scenes[0].setProgress(loader.progress/100)});
        requestAnimationFrame(this.renderScene);
        this.loader.add("btn_normal", "assets/images/menu/btn_normal.png")
            .add("btn_clicked", "assets/images/menu/btn_clicked.png")
            .add("bgMenu", "assets/images/menu/background_02.png")
            .load(this.setup);

    };

    setup = () => {
        this.game = new Game();
        this.game.init();
        this.scenes.push(new Menu(this)); //1
        this.setScene(1);
    };

    start = () => {
        this.setScene(0);
        this.spriteLoader.onProgress.add((loader)=>{this.scenes[0].setProgress(loader.progress/100)});
        this.spriteLoader.init(this.started);
    };

    started = () => {
        this.scenes.push(new Fight(this, this.game)); //2
        this.scenes.push(new World(this, this.game)); //3
        this.scenes.push(new Status(this, this.game)); //4
        this.scenes.push(new Merchant(this, this.game)); //5
        this.scenes.push(new GameOver(this)); //6
        this.scenes[2].init();
        this.setScene(3);

        this.tooltip = new Tooltip();
        this.tooltip.visible = false;
        this.tooltip.position.set(50,50);
        this.app.stage.addChild(this.tooltip);
        this.app.stage.interactive = true;
        this.app.stage.on("mousemove", this.tooltip.setPosition);
    };

    getSprite = (name) => {
        return new PIXI.Sprite(this.loader.resources[name].texture);
    };

    getGameSprite = (name) => {
        if(window.gameDebugMode) {
            console.log(name);
        }
        return new PIXI.Sprite(this.spriteLoader.resources[name].texture);
    };

    setScene = (index) => {
        if (index > this.scenes.length || index < 0) {
            throw "Invalid scene index";
        }
        this.activeScene = index;
        if(index === 3){
            this.scenes[index].resetMovement();
        }
        if (index === 2){
            this.scenes[index].initEnemy();
        }
        this.scenes.forEach((el) => { el.visible = false});
        if(window.gameDebugMode) {
            console.log("changing scene to " + index);
        }
    };

    getActiveScene = () => {
        return this.scenes[this.activeScene];
    };

    renderScene = () => {
        this.getActiveScene().visible = true;
        this.getActiveScene().repaintScene();
        requestAnimationFrame(this.renderScene);
    };

    mouseover = (e) => {
        if(e.target.hoverInfo === undefined){
            this.tooltip.visible = false;
            return;
        }
        this.count++;
        this.tooltip.repaintTooltip(e.target.hoverInfo);
        this.tooltip.visible = true;
    };


    mouseout = (e) => {
        if (--this.count <= 0){
            this.tooltip.visible = false;
            this.count = 0;
        }
    }
}