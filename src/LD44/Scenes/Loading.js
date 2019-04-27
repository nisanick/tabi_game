import BasicScene from "./BasicScene";

export default class Loading extends BasicScene{
    constructor(/* SceneLoader */ loader){
        super(loader);
        this.background = loader.getSprite("bgLoad");
        this.background.width = loader.app.renderer.width;
        this.background.height = loader.app.renderer.height;

        this.text = new PIXI.Text("LOADING", {fontFamily:'IM16', })

        this.addChild(this.background);
        loader.app.stage.addChild(this);
    }

}