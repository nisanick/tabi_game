import * as PIXI from "pixi.js";
import Loading from "./scenes/Loading";
import SpriteLoader from "./SpriteLoader";
import Menu from "./scenes/Menu";
import World from "./scenes/World";
import Game from "./model/Game";

export default class SceneLoader {
    constructor(/* PIXI.Application */ app) {
        this.app = app;

        this.scenes = [];
        this.activeScene = 0;
        this.spriteLoader = new SpriteLoader();
        this.loader = new PIXI.Loader();
    }

    init = () => {
        this.loader.add("bgLoad", "assets/images/bgLoading.png")
            //.add("IM16", "assets/fonts/IndependentModern8x16.ttf")
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
        let game = new Game();
        game.init();
        this.scenes.push(new Menu(this));
        this.scenes.push(new World(this, game));
        this.setScene(1);
    };

    start = () => {
      this.setScene(2);
    };

    getSprite = (name) => {
        return new PIXI.Sprite(this.loader.resources[name].texture);
    };

    setScene = (index) => {
        if (index > this.scenes.length || index < 0) {
            throw "Invalid scene index";
        }
        this.activeScene = index;
        this.scenes.forEach((el) => { el.visible = false});
        console.log("changing scene to " + index);
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