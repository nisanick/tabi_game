import Container from "./Container";
import Player from "./Player";
import Menu from "./Menu";
import * as PIXI from "pixi.js";
import Bar from "./Bar";

export default class Dominik{
    constructor(app){
        this.app = app;
        this.container = {};
        this.menu = {};
        this.bar = {};
        this.player = {};
        this.paused = false;
        this.pauseMessage = {};
        this.loader = new PIXI.Loader();

        this.init();
    }

    init(){
        this.pauseMessage = new PIXI.Text("Paused", new PIXI.TextStyle({fill: "white", fontSize: 20}));
        this.pauseMessage.position.set(10, 870);
        this.pauseMessage.visible = false;
        this.app.stage.addChild(this.pauseMessage);

        this.container = new Container(this.app.renderer.width, this.app.renderer.height - 80, this.app.stage, this.bar);

        this.player = new Player(this.container, 200, 200, this.app.stage);

        this.menu = new Menu(this);
        this.bar = new Bar(this, this.player);
        this.container.addFigure(this.player);
        this.app.ticker.add(delta => this.gameLoop(delta));
    }

    restart(){
        this.container.clearBullets();
        this.container.clearFigures();
        this.player = new Player(this.container, 200, 200, this.app.stage);
        this.bar.player = this.player;
        this.container.addFigure(this.player);
        this.bar.checkHealthBar();
    }

    pause(){
        if (this.paused){
            this.paused = false;
            this.pauseMessage.visible = false;
        } else {
            this.paused = true;
            this.pauseMessage.visible = true;
        }
    }

    gameLoop(delta){
        if (!this.paused) {
            let figures = this.container.getFigures();
            let bullets = this.container.getBullets();

            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                let removed = false;
                if (bullet.wasHit(figures)) {
                    removed = true;
                    bullet.bulletTexture.visible = false;
                    bullets.splice(i, 1);
                }
                if (!removed)
                    bullet.move();
            }

            for (let i = 0; i < figures.length; i++) {
                let figure = figures[i];
                if (figure.isDead()) {
                    figure.clearObject();
                    figure.visible = false;
                    figures.splice(i, 1);
                }
                figure.move();
            }

            this.player.bulletLoader();

            this.bar.checkHealthBar();
            this.bar.checkBulletTimer();
            this.bar.checkBulletAngle();
        }

        if (this.player.dead){
            this.paused = true;
            this.menu.showMenu();
        }
    }


}