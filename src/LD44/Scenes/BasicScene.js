import * as PIXI from "pixi.js"

export default class BasicScene extends PIXI.Container{
    constructor(){
        super();
    }

    render = () => {
        throw "Invalid scene implementation";
    }
}