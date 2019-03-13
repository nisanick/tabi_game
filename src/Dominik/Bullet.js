import * as PIXI from "pixi.js";
import Tools from "./Tools";

export default class Bullet {

    constructor( /*BasicLevel*/level, x, y, angle, stage, type){
        this.level = level;
        this.loader = new PIXI.Loader();
        this.bulletTexture = {};
        this.speed = 10;
        this.stage = stage;

        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 10;
        this.angle = angle;
        this.maxReflection = 20;
        this.actualReflection = 0;
        this.shooter = type;

        this.initImage();

        this.level.addBullet(this);
    }
/*
    initImage(){
        this.loader.add("assets/dominik/bullet-final.png").load(this.setup.bind(this));
    }
*/
    initImage(){
        this.bulletTexture = PIXI.Sprite.from("assets/dominik/bullet-final.png");

        this.bulletTexture.width = this.width;
        this.bulletTexture.height = this.height;
        this.bulletTexture.x = this.x;
        this.bulletTexture.y = this.y;
        this.bulletTexture.rotation = this.angle;
        this.bulletTexture.anchor.x = 0.5;
        this.bulletTexture.anchor.y = 0.5;

        this.addBulletToStage()
    }

    addBulletToStage(){
        if (this.bulletTexture !== null) this.stage.addChild(this.bulletTexture);
    }

    removeBulletFromStage(){
        this.bulletTexture.visible = false;
        this.stage.removeChild(this.bulletTexture);
    }

    move(){
        let newX = this.x + this.speed * Math.cos(this.angle);
        let newY = this.y + Math.abs(this.speed) * Math.sin(this.angle);

        if (this.level.isWallOnX(this.x, newX, this.y)) {
            this.speed *= -1;
            newX = this.x + this.speed * Math.cos(this.angle);
            newY = this.y + Math.abs(this.speed) * Math.sin(this.angle);
            this.bulletTexture.rotation *= -1;
            this.bulletTexture.scale.x *= -1;
            this.actualReflection++;
        }
        if (this.level.isWallOnY(this.y, newY, this.x)){
            this.angle *= -1;
            newX = this.x + this.speed * Math.cos(this.angle);
            newY = this.y + Math.abs(this.speed) * Math.sin(this.angle);
            this.bulletTexture.rotation *= -1;
            this.actualReflection++;
        }

        this.x = newX;
        this.y = newY;

        this.bulletTexture.x = this.x;
        this.bulletTexture.y = this.y;

        if (this.actualReflection >= this.maxReflection){
            this.bulletTexture.visible = false;
            this.level.removeBullet(this);
        }
    }

    wasHit(figures){
        for (let i = 0; i < figures.length; i++) {
            if (figures[i].shield){
                if (Tools.reflectFromX(figures[i], this)){
                    this.speed *= -1;
                    this.bulletTexture.rotation *= -1;
                    this.bulletTexture.scale.x *= -1;
                    this.actualReflection++;
                }

                if (Tools.reflectFromY(figures[i], this)){
                    this.angle *= -1;
                    this.bulletTexture.rotation *= -1;
                    this.actualReflection++;
                }
            } else {
                if (this.collision(figures[i])) {
                    figures[i].wasHit();
                    return true;
                }
            }
        }

        return false;
    }

    collision(figure){
        if (this.shooter === "player" || this.shooter !== figure.type) {
            return Tools.collision(figure, this);
        } else {
            return false;
        }
    }
}