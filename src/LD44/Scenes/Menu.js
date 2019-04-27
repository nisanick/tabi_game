import BasicScene from "./BasicScene";
import Button from "../Objects/Button";

export default class Menu extends BasicScene {
    constructor(/*SceneLoader*/ sceneLoader) {
        super();
        this.sceneLoader = sceneLoader;
        this.btnStart = {};
    }

    init = () => {
        let x = this.sceneLoader.app.renderer.width / 2 - 50;
        let y = this.sceneLoader.app.renderer.height / 2 - 25;
        this.btnStart = new Button("Start Game", x, y, 100, 50, this,)
    };


}