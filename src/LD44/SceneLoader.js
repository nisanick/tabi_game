import * as PIXI from "pixi.js";
import Loading from "./Scenes/Loading";
import SpriteLoader from "./SpriteLoader";
import Menu from "./Scenes/Menu";

export default class SceneLoader{
    constructor(/* PIXI.Application */ app){
        this.app = app;

        this.scenes = [];
        this.activeScene = 0;
        this.spriteLoader = new SpriteLoader();
        this.loader = new PIXI.Loader();
    }

    init = () => {
        this.scenes.push(new Loading(this));
        this.loader.add("assets/images/menu/button_01_04.png").load(this.setup);
        this.scenes.push(new Menu(this));
        this.setScene(1);
    };

    setup = () => {

    };

    setScene = (index) => {
        if(index > this.scenes.length || index < 0){
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