import Player from "./Player";
import Menu from "./Menu";
import Bar from "./Bar";
import Tools from "./Tools";
import AI from "./AI";
import BasicLevel from "./levels/BasicLevel";
import Level_1 from "./levels/Level_1";
import Level_2 from "./levels/Level_2";

import * as PIXI from "pixi.js";
import "howler";

export default class Dominik{
    constructor(app){
        this.app = app;
        this.level = {};
        this.menu = {};
        this.bar = {};
        this.player = {};
        this.AICount = 1;
        this.paused = true;
        this.gameStarted = false;
        this.pauseMessage = {};
        this.loader = new PIXI.Loader();
        this.pauseMessageConst = -0.05;
        this.threadRunning = false;
        this.bgStage = new PIXI.Container();
        this.gameStage = new PIXI.Container();
        this.panelStage = new PIXI.Container();

        this.app.stage.addChildAt(this.bgStage, 0);
        this.app.stage.addChildAt(this.gameStage, 1);
        this.app.stage.addChildAt(this.panelStage, 2);

        this.sound = new Howl({
            src: ['assets/dominik/sounds/test2.wav'],
            loop: true
        });

        this.gameOver = new Howl({
            src: ['assets/dominik/sounds/Death01.wav']
        });

        this.init();
    }

    init(){
        this.pauseMessage = new PIXI.Text("Paused", new PIXI.TextStyle({fill: "white", fontSize: 20}));
        this.pauseMessage.position.set(10, 790);
        this.pauseMessage.visible = false;
        this.app.stage.addChild(this.pauseMessage);

        this.level = new Level_2(this.app.renderer.width, this.app.renderer.height - 80, this.bgStage);
        this.level.init();

        this.player = new Player(this.level, 200, 500, this.gameStage);
        this.player.setVisibility(false);

        this.level.addFigure(this.player);

        for (let i = 0; i < this.AICount; i++) {
            let ai = new AI(this.level, 0, 0, this.gameStage, Tools.getRndInteger(0, 4));
            this.level.addFigure(ai);
            ai.setVisibility(false);
        }

        this.menu = new Menu(this);
        this.menu.showMenu();
        this.bar = new Bar(this, this.player);
    }

    start(){
        if (this.threadRunning) {
            this.paused = false;
            this.gameStarted = true;
            this.restart();
        } else {
            this.paused = false;
            this.gameStarted = true;
            this.sound.play();
            this.level.getFigures().forEach(figure => {
                figure.setVisibility(true);
            });

            //this.app.ticker.add(delta => this.gameLoop(delta));
            requestAnimationFrame(this.gameLoop.bind(this));

            this.threadRunning = true;
        }
    }

    restart(){
        this.level.clearBullets();
        this.level.clearFigures();
        this.level.clearBonuses();
        this.player = new Player(this.level, 200, 500, this.gameStage);
        this.bar.player = this.player;
        this.level.addFigure(this.player);
        for (let i = 0; i < this.AICount; i++) {
            let ai = new AI(this.level, 0, 0, this.gameStage, Tools.getRndInteger(0, 4));
            ai.setVisibility(true);
            this.level.addFigure(ai);
        }
        this.bar.checkHealthBar();
        this.bar.clearTimers();
    }

    pause(){
        if (this.paused){
            this.sound.play();
            this.paused = false;
            this.pauseMessage.visible = false;
        } else {
            this.sound.pause();
            this.paused = true;
            this.pauseMessage.visible = true;
        }
    }

    gameLoop(delta){

        if (!this.paused) {
            let figures = this.level.getFigures();
            let bullets = this.level.getBullets();

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
                } else {
                    figure.checkBonuses();
                    figure.move(delta);
                    figure.bulletLoader();
                    this.level.checkBonuses(figure);
                }
            }

            this.bar.checkHealthBar();
            this.bar.checkBulletTimer();
            this.bar.checkBulletAngle();
            this.bar.checkBonusesTimer();
            this.level.spawnBonuses();
        } else {
            this.pauseMessage.alpha += this.pauseMessageConst;

            if (this.pauseMessage.alpha >= 1){
                this.pauseMessageConst *= -1;
            } else if (this.pauseMessage.alpha <= 0) {
                this.pauseMessageConst *= -1;
            }
        }

        if (this.player.dead || this.level.figures.length === 1){
            if (!this.paused && this.player.dead){
                this.gameOver.play();
            }
            if (!this.paused && this.level.figures.length === 1){

            }
            this.paused = true;
            this.gameStarted = false;
            this.sound.pause();
            this.menu.showMenu();
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }


}