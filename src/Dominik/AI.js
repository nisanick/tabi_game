import Figure from "./Figure";
import Tools from "./Tools";
import * as PIXI from "pixi.js";

export default class AI extends Figure {
    constructor(level, x, y, stage, difficulty){
        super(level, x, y, stage, "enemy");

        this.health = 1;
        this.maxHealth = 1;
        this.angleRange = 20;
        this.seeLength = 50;
        this.bulletCooldown = 0;
        this.counter = 0;
        this.moveCounter = 10;
        this.player = this.level.getPlayer();
        this.difficulty = difficulty;
        if (difficulty === 2){
            this.health = 2;
            this.maxHealth = 2;
            this.angleRange = 10;
            this.seeLength = 70;
        } else if (difficulty >= 3){
            this.health = 3;
            this.maxHealth = 3;
            this.angleRange = 5;
            this.seeLength = 100;
            this.difficulty = 3;
            this.moveCounter = 7;
        } else {
            this.difficulty = 1;
        }

        this.barWidth = 0;
        this.healthBar = new PIXI.Graphics();
        this.healthProgress = new PIXI.Container();
        this.progress = [];
        this.init();
    }

    clearObject(){
        this.healthBar.visible = false;
        this.healthProgress.visible = false;
    }

    init(){
        this.healthBar = new PIXI.Graphics();
        this.healthBar.lineStyle(1, 0x474747, 1);
        this.healthBar.beginFill(0xd6d6d6);
        this.healthBar.drawRect(0, 0, 120, 5);
        this.healthBar.endFill();
        this.healthBar.x = this.x;
        this.healthBar.y = this.y + 50;
        this.healthBar.visible = false;
        this.stage.addChild(this.healthBar);

        this.barWidth = 120 / this.health;
        let x = 0;
        for (let i = 0; i < this.health; i++) {
            let progress = new PIXI.Graphics();
            progress.beginFill(0xa32000);
            progress.drawRect(0, 0, this.barWidth, 5);
            progress.endFill();
            progress.x = this.x + x;
            progress.y = this.y + 50;
            progress.visible = false;
            x += this.barWidth;

            this.healthProgress.addChild(progress);

            this.stage.addChild(this.healthProgress);
            this.progress[i] = progress;
        }
    }

    setVisibility(visible) {
        super.setVisibility(visible);
        this.healthBar.visible = visible;
        this.progress.forEach(bar => {
            bar.visible = visible;
        })
    }

    getClosestBullet(){
        let bulletPosition = null;
        let bullets = this.level.getBullets();

        let minHalfWidth = 0;
        let minHalfHeight = 0;

        bullets.forEach((bullet) => {
            let combinedHalfWidths, combinedHalfHeights, vx, vy;
            let bCenterX, bCenterY, bHalfWidth, bHalfHeight;
            let fCenterX, fCenterY, fHalfWidth, fHalfHeight;
            //hit will determine whether there's a collision

            //Find the center points of each sprite
            fCenterX = this.hitRectangle.x + (this.hitRectangle.width + this.seeLength) / 2;
            fCenterY = this.hitRectangle.y + (this.hitRectangle.height + this.seeLength) / 2;
            bCenterX = bullet.x + bullet.width / 2;
            bCenterY = bullet.y + bullet.height / 2;

            //Find the half-widths and half-heights of each sprite
            fHalfWidth = (this.hitRectangle.width + this.seeLength) / 2;
            fHalfHeight = (this.hitRectangle.height + this.seeLength) / 2;
            bHalfWidth = bullet.width / 2;
            bHalfHeight = bullet.height / 2;

            //Calculate the distance vector between the sprites
            vx = fCenterX - bCenterX;
            vy = fCenterY - bCenterY;

            //Figure out the combined half-widths and half-heights
            combinedHalfWidths = fHalfWidth + bHalfWidth;
            combinedHalfHeights = fHalfHeight + bHalfHeight;

            //Check for a collision on the x axis
            if (Math.abs(vx) < combinedHalfWidths) {
                if (Math.abs(vy) < combinedHalfHeights) {
                    if (minHalfHeight > combinedHalfHeights && minHalfWidth > combinedHalfWidths) {
                        bulletPosition = {};
                        minHalfHeight = combinedHalfHeights;
                        minHalfWidth = combinedHalfWidths;
                        bulletPosition.x = bullet.x;
                        bulletPosition.y = bullet.y;
                        bulletPosition.distanceX = Math.abs(vx);
                        bulletPosition.distanceY = Math.abs(vy);
                    }
                }
            }
        });

        return bulletPosition;
    }

    bulletLoader(){
        if (this.bulletCooldown > 0) {
            //bullet cooldown setter
            if (this.counter === 50){
                this.bulletCooldown--;
                this.counter = 0;
            }
            this.counter++;
        }
    }

    moveBar(){
        this.healthBar.x = this.x - this.width + 10;
        this.healthBar.y = this.y - 55;

        let x = 0;

        for (let i = 0; i < this.progress.length; i++) {
            if (i < this.health){
                this.progress[i].visible = true;
            } else {
                this.progress[i].visible = false;
            }
            this.progress[i].x = this.x - this.width + 10 + x;
            x += this.barWidth;
            this.progress[i].y = this.y - 55;
        }

    }

    dodgeBullet(closestBullet){
        if (this.x > closestBullet.x) {
            this.moveX = -this.speed;
        } else {
            this.moveX = this.speed;
        }

        if (this.y > closestBullet.y) {
            this.moveY = -this.speed;
        } else {
            this.moveY = this.speed;
        }
    }

    aimPlayer(){
        if (this.player.x > this.x) {
            this.moveX = this.speed;
        } else {
            this.moveX = -this.speed;
        }
        if (this.player.y > this.y) {
            this.moveY = this.speed;
        } else {
            this.moveY = -this.speed;
        }
    }

    isBulletClose(closestBullet){
        return  closestBullet.distanceX < 70 && closestBullet.distanceY < 70;
    }

    goAwayFromWall(delta) {
        let result = true;
        if (this.level.isWallOnX(this.x + 20, this.x + this.moveX + 20, this.y)){
            result = true;
            this.moveX = -this.speed;
        } else if (this.level.isWallOnX(this.x - 20, this.x - this.moveX - 20, this.y)) {
            if (!result) result = true;
            this.moveX = this.speed;
        }
        if (this.level.isWallOnY(this.y + 20, this.y + this.moveY + 20, this.x)){
            if (!result) result = true;
            this.moveY = -this.speed
        } else if (this.level.isWallOnY(this.y - 20, this.y - this.moveY - 20, this.x)) {
            if (!result) result = true;
            this.moveY = this.speed
        }

        return result;
    }


    getRandomMove(){
        let rnd = Tools.getRndInteger(0, 10);
        if (rnd > 5){
            return this.speed;
        } else {
            return -this.speed;
        }
    }


    /*
    move(delta){
        let closestBullet = this.getClosestBullet();
        if (this.moveCounter === 10) {
            this.moveCounter = 0;
            if (closestBullet === null || (this.difficulty < 3 && closestBullet.distanceX > 20 && closestBullet.distanceY > 20)) {
                if (delta !== undefined && delta > 1 && Math.abs(this.player.x - this.x) > 250) {
                    if (this.player.x > this.x) {
                        this.moveX = this.speed;
                    } else {
                        this.moveX = -this.speed;
                    }
                } else if (delta === undefined || delta < 1) {
                    let rnd = Tools.getRndInteger(0, 3);
                    if (rnd === 0) {
                        this.moveX = 0;
                    } else if (rnd === 1) {
                        this.moveX = this.speed;
                    } else {
                        this.moveX = -this.speed;
                    }
                }

                if (delta !== undefined && delta > 1 && Math.abs(this.player.y - this.y) > 250) {
                    if (this.player.y > this.y) {
                        this.moveY = this.speed;
                    } else {
                        this.moveY = -this.speed;
                    }
                } else if (delta === undefined || delta < 1) {
                    let rnd = Tools.getRndInteger(0, 3);
                    if (rnd === 0) {
                        this.moveY = 0;
                    } else if (rnd === 1) {
                        this.moveY = this.speed;
                    } else {
                        this.moveY = -this.speed;
                    }
                }

                super.move(delta);
                if (this.bulletCooldown === 0) {
                    this.shoot();
                }
            } else {
                if (this.x > closestBullet.x) {
                    this.moveX = -this.speed;
                } else {
                    this.moveX = this.speed;
                }

                if (this.y > closestBullet.y) {
                    this.moveY = -this.speed;
                } else {
                    this.moveY = this.speed;
                }
                super.move(delta);
            }
        } else if (this.difficulty === 3 && closestBullet.distanceX < 20 && closestBullet.distanceY < 20) {
            if (this.x > closestBullet.x) {
                this.moveX = -this.speed;
            } else {
                this.moveX = this.speed;
            }

            if (this.y > closestBullet.y) {
                this.moveY = -this.speed;
            } else {
                this.moveY = this.speed;
            }
            super.move(delta)
        } else {
            super.move(delta);
            this.moveCounter++;
        }


        this.moveBar();
    }
    */

    doSmartMove(closestBullet, delta){
        if (closestBullet !== null && this.isBulletClose(closestBullet)) {
            this.dodgeBullet(closestBullet);
            super.move(delta);
        } else if (this.bulletCooldown === 0){
            this.aimPlayer();
            this.move(delta);
        } else if (this.goAwayFromWall(delta)) {
            super.move(delta);
        } else {
            this.moveX = this.getRandomMove();
            this.moveY = this.getRandomMove();
            super.move(delta);
        }
    }

    move(delta){
        let closestBullet = this.getClosestBullet();

        if (this.moveCounter === 10 && this.difficulty === 1) {
            this.moveCounter = 0;

            this.moveX = this.getRandomMove();
            this.moveY = this.getRandomMove();
            super.move(delta);
        } else if (this.difficulty === 3 && this.moveCounter === 7) {
            this.moveCounter = 0;
            this.doSmartMove(closestBullet, delta);
        } else if (this.difficulty === 2 && this.moveCounter === 10) {
            this.moveCounter = 0;
            let rnd = Tools.getRndInteger(0, 10);
            if (rnd > 4){
                this.doSmartMove(closestBullet, delta);
            } else {
                this.moveX = this.getRandomMove();
                this.moveY = this.getRandomMove();
                super.move(delta);
            }
        } else {
            this.goAwayFromWall(delta);
            super.move(delta);
            this.moveCounter++;
        }

        if (this.bulletCooldown === 0){
            this.shoot();
        }

        this.moveBar();
    }

    shoot(){
        let angle = (this.angle - 90 + Tools.getRndInteger(-this.angleRange, this.angleRange)) * (Math.PI / 180);
        super.shoot(angle);
        if (this.noReload) this.bulletCooldown = 1;
        else this.bulletCooldown = 5;
    }
}