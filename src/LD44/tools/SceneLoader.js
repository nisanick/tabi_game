import * as PIXI from "pixi.js";
import Loading from "../scenes/Loading";
import SpriteLoader from "./SpriteLoader";
import Menu from "../scenes/Menu";
import World from "../scenes/World";
import Game from "../model/Game";
import Fight from "../scenes/Fight";
import Status from "../scenes/Status";

export default class SceneLoader {
    constructor(/* PIXI.Application */ app) {
        this.app = app;

        this.scenes = [];
        this.activeScene = 0;
        this.spriteLoader = new SpriteLoader();
        this.loader = new PIXI.Loader();
        this.game;
    }

    init = () => {
        this.loader.add("bgLoad", "assets/images/bgLoading.png")
            .load(this.setupLoading);


    };

    setupLoading = () => {
        this.scenes.push(new Loading(this));
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
        this.scenes.push(new Menu(this));
        this.setScene(1);
    };

    start = () => {
        this.setScene(0);
        this.spriteLoader.onProgress.add((loader)=>{this.scenes[0].setProgress(loader.progress/100)});
        this.spriteLoader.init(this.started);
    };

    started = () => {
        this.scenes.push(new Fight(this, this.game));
        this.scenes.push(new World(this, this.game));
        this.scenes.push(new Status(this, this.game));
        this.scenes[2].init();
        this.setScene(2);
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
}