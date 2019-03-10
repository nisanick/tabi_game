import Container from "./Container";
import Player from "./Player";
import Figure from "./Figure";


export default class Dominik{
    constructor(app){
        this.app = app;
        this.container = null;

        this.init();
    }

    init(){
        this.container = new Container(this.app.renderer.width, this.app.renderer.height, this.app.stage);
        this.container.addFigure(new Player(this.container, 200, 200, this.app.stage));
        this.app.ticker.add(delta => this.gameLoop(delta));
    }

    gameLoop(delta){
        let figures = this.container.getFigures();
        let bullets = this.container.getBullets();

        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].wasHit(figures)) {
                bullets[i].removeBulletFromStage()
                bullets.splice(i, 1);
            }
            bullets[i].move();
        }

        for (let i = 0; i < figures.length; i++) {
            let figure = figures[i];
            if (figure.isDead()) {
                figure.splice(i, 1);
            }
            figure.move();
        }
    }
}