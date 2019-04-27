import * as PIXI from "pixi.js";
import Loading from "./Scenes/Loading";
import SpriteLoader from "./SpriteLoader";
import Menu from "./Scenes/Menu";

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
            .add("IM16", "assets/fonts/IndependentModern8x16.ttf")
            .load(this.setupLoading);


    };

    setupLoading = () => {
        this.scenes.push(new Loading(this));
        this.setScene(0);
        this.loader.onProgress.add((loader)=>{this.scenes[0].setProgress(loader.progress/100)});
        requestAnimationFrame(this.renderScene);
        this.loader.add("btn", "assets/images/menu/button_01_04.png")
            .add("bgMenu", "assets/images/menu/background_02.png")
            .load(this.setup);

    };

    setup = () => {
        this.scenes.push(new Menu(this));
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
        requestAnimationFrame(this.renderScene);
    };
}