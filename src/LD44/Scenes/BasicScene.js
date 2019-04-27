import * as PIXI from "pixi.js"

export default class BasicScene extends PIXI.Container{
    constructor(/* SceneLoader */ loader){
        super();
    }

    render = () => {
        throw "Invalid scene implementation";
    }
}