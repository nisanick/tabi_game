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
        this.loader.add("LOADER")
            .add("FONT")
            .load(this.setupLoading);

    };

    setupLoading = () => {
        this.scenes.push(new Loading(this));
        this.setScene(0);
        requestAnimationFrame(this.renderScene);
        this.loader.add("assets/images/menu/button_01_04.png").load(this.setup);

    };

    setup = () => {
        this.scenes.push(new Menu(this));
    };

    setScene = (index) => {
        if (index > this.scenes.length || index < 0) {
            throw "Invalid scene index";
        }
        this.activeScene = index;
        console.log("changing scene to " + index);
    };

    renderScene = () => {
        this.scenes.render();
        requestAnimationFrame(this.renderScene);
    };
}