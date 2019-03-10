import Container from "./Container";

export default class Dominik{
    constructor(app){
        this.app = app;
        this.container = null;
    }

    init(){
        this.container = new Container(this.app.renderer.width, this.app.renderer.height);
        let figures = this.container.getFigures();
        let bullets = this.container.getBullets();

        bullets.forEach((bullet) => {
            this.app.stage.addChild(bullet);
        });

        figures.forEach((figure) => {
            this.app.stage.addChild(figure);
        });
    }

    gameLoop(delta){

    }
}