import * as PIXI from "pixi.js";

export default class SpriteLoader extends PIXI.Loader {
    constructor() {
        super();
        this.loaded = false;
    }

    init = () => {
        this.add("NAME", "IMG")
            .add("NAME", "IMG")
            .load(this.setup)
    };

    setup = () => {
        this.loaded = true;
    };

    isLoaded = () => {
        return this.loaded;
    }
}