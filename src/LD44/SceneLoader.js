import * as PIXI from "pixi.js";

export default class SceneLoader{
    constructor(/* PIXI.Application */ app){
        this.app = app;

        this.scenes = [];
        this.activeScene = 0;
    }

    init = () => {
        //this.scenes.push(/* new Scene */);
        this.activeScene = 1;
    };

    setScene = (index) => {
        if(index > this.scenes.length || index < 0){
            throw "Invalid scene index";
        }
        this.activeScene = index;
    };

    renderScene = () => {

        requestAnimationFrame(this.renderScene);
    };
}