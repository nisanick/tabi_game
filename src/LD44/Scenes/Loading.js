import BasicScene from "./BasicScene";

export default class Loading extends BasicScene{
    constructor(/* SceneLoader */ loader){
        super(loader);
        let background = loader.getSprite("bgLoad");
        background.position.set(0,0);
        this.addChild(background);
    }

    render = () => {

    }
}