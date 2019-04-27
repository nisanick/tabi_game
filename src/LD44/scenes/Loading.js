import * as PIXI from "pixi.js";
import BasicScene from "./BasicScene";
import ProgressBar from "../tools/ProgressBar";

export default class Loading extends BasicScene{
    constructor(/* SceneLoader */ loader){
        super(loader);
        this.background = loader.getSprite("bgLoad");
        this.background.width = loader.app.renderer.width;
        this.background.height = loader.app.renderer.height;
        let container = new PIXI.Container();

        this.text = new PIXI.Text("LOADING", new PIXI.TextStyle({fill: "black", fontSize: 39, fontFamily: "Linepixels"}));
        container.width = this.text.width;
        container.addChild(this.text);
        this.pb = new ProgressBar(container);
        container.position.set((this.background.width - container.width)/2,(this.background.height - container.height)/2);


        this.addChild(this.background);
        this.addChild(container);
        loader.app.stage.addChild(this);
    }

    setProgress =  (percentage) => {
        this.pb.setProgress(percentage);
    }

}