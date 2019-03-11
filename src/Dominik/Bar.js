import * as PIXI from "pixi.js";

export default class Bar {
    constructor(/*Dominik*/mainWindow, /*Player*/ player) {
        this.mainWindow = mainWindow;
        this.barContainer = new PIXI.Container();
        this.mainWindow.app.stage.addChild(this.barContainer);
        this.loader = new PIXI.Loader();
        this.healthImg = [];
        this.player = player;
        this.bulletTimerTime = {};
        this.progressBar = [];
        this.emptyProgressBar = true;
        this.initBar();
    }

    initBar() {
        this.loader
            .add("assets/dominik/heart.png")
            .load(this.setup.bind(this));

        let mainBar = new PIXI.Graphics();
        mainBar.lineStyle(5, 0x474747, 1);
        mainBar.beginFill(0x2d2d2d);
        mainBar.drawRect(0, 830, 900, 70);
        mainBar.endFill();
        mainBar.x = 0;
        mainBar.y = 0;
        this.barContainer.addChild(mainBar);

        let healthText = new PIXI.Text("Health:", new PIXI.TextStyle({fill: "white", fontSize: 20}));
        healthText.position.set(5, 835);
        this.barContainer.addChild(healthText);

        let bulletTimerText = new PIXI.Text("Bullet timer:", new PIXI.TextStyle({fill: "white", fontSize: 20}));
        bulletTimerText.position.set(130, 835);
        this.barContainer.addChild(bulletTimerText);

        this.bulletTimerTime = new PIXI.Text("Ready", new PIXI.TextStyle({fill: "green", fontSize: 20}));
        this.bulletTimerTime.position.set(130, 865);
        this.barContainer.addChild(this.bulletTimerTime);

        let bulletAngleText = new PIXI.Text("Bullet angle:", new PIXI.TextStyle({fill: "white", fontSize: 20}));
        bulletAngleText.position.set(270, 835);
        this.barContainer.addChild(bulletAngleText);

        let bulletAngleProgress = new PIXI.Graphics();
        bulletAngleProgress.lineStyle(2, 0x474747, 1);
        bulletAngleProgress.beginFill(0x2d2d2d);
        bulletAngleProgress.drawRoundedRect(270, 865, 120, 25, 5);
        bulletAngleProgress.endFill();
        bulletAngleProgress.x = 0;
        bulletAngleProgress.y = 0;
        this.barContainer.addChild(bulletAngleProgress);

        let x = 270;
        for (let i = 0; i < 40; i++) {
            let progress = new PIXI.Graphics();
            progress.beginFill(0x7ebc83);
            progress.drawRect(x, 865, 3, 25);
            progress.endFill();
            progress.x = 0;
            progress.y = 0;
            progress.visible = false;

            this.barContainer.addChild(progress);
            this.progressBar[i] = progress;
            x += 3;
        }

    }

    checkHealthBar() {
        //if (this.player.health < this.player.maxHealth){
        for (let i = 0; i < this.healthImg.length; i++) {
            this.healthImg[i].visible = (this.player.health >= (i + 1));
        }
        //}
    }

    checkBulletTimer() {
        if (this.player.bulletCooldown === 0) {
            this.bulletTimerTime.text = "Ready";
            this.bulletTimerTime.style = {fill: "green", fontSize: 20};
        } else {
            this.bulletTimerTime.text = this.player.bulletCooldown;
            this.bulletTimerTime.style = {fill: "red", fontSize: 20};
        }
    }

    checkBulletAngle() {
        if (this.player.spacePressed) {
            let angle = this.player.bulletAngle + 20;
            if (this.player.bulletConst > 0) {
                this.progressBar[angle].visible = true;
            } else {
                if (angle >= 0 && angle < 40) {
                    this.progressBar[angle].visible = false;
                }
            }

            this.emptyProgressBar = false
        } else if (!this.emptyProgressBar) {
            for (let i = 0; i < this.progressBar.length; i++) {
                this.progressBar[i].visible = false;
            }
        }
    }

    setup() {
        let x = 5;
        for (let i = 0; i < this.player.health; i++) {
            let healthImg = new PIXI.Sprite(this.loader.resources["assets/dominik/heart.png"].texture);
            healthImg.width = 25;
            healthImg.height = 25;
            healthImg.x = x;
            healthImg.y = 865;

            x += 30;
            this.barContainer.addChild(healthImg);
            this.healthImg[i] = healthImg;
        }

    }
}