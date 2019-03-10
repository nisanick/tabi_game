import * as PIXI from "pixi.js";

export default class Bullet {

    constructor( /*Container*/container, x, y, angle, stage){
        this.container = container;
        this.loader = new PIXI.Loader();
        this.bulletTexture = {};
        this.speed = 5;
        this.stage = stage;

        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 10;
        this.angle = angle;

        this.initImage();

        this.container.addBullet(this);
    }

    initImage(){
        this.loader.add("assets/dominik/bullet-final.png").load(this.setup.bind(this));
    }

    setup(){
        this.bulletTexture = new PIXI.Sprite(
            this.loader.resources["assets/dominik/bullet-final.png"].texture);

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
        this.stage.removeChild(this.bulletTexture);
    }

    move(){
        let newX = this.x + this.speed * Math.cos(this.angle);
        let newY = this.y + Math.abs(this.speed) * Math.sin(this.angle);

        if (this.container.isWallOnX(this.x, newX)) {
            this.speed *= -1;
            newX = this.x + this.speed * Math.cos(this.angle);
            newY = this.y + Math.abs(this.speed) * Math.sin(this.angle);
            this.bulletTexture.rotation *= -1;
            this.bulletTexture.scale.x *= -1;
        }
        if (this.container.isWallOnY(this.y, newY)){
            this.angle *= -1;
            newX = this.x + this.speed * Math.cos(this.angle);
            newY = this.y + Math.abs(this.speed) * Math.sin(this.angle);
            this.bulletTexture.rotation *= -1;
        }

        this.x = newX;
        this.y = newY;

        this.bulletTexture.x = this.x;
        this.bulletTexture.y = this.y;
    }

    wasHit(figures){
        figures.forEach((figure)=>{
            if (this.collision(figure)) {
                return true;
            }
        });

        return false;
    }

    collision(figure){
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        let bCenterX, bCenterY, bHalfWidth, bHalfHeight;
        let fCenterX, fCenterY, fHalfWidth, fHalfHeight;
        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        fCenterX = figure.x + figure.width / 2;
        fCenterY = figure.y + figure.height / 2;
        bCenterX = this.x + this.width / 2;
        bCenterY = this.y + this.height / 2;

        //Find the half-widths and half-heights of each sprite
        fHalfWidth = figure.width / 2;
        fHalfHeight = figure.height / 2;
        bHalfWidth = this.width / 2;
        bHalfHeight = this.height / 2;

        //Calculate the distance vector between the sprites
        vx = fCenterX - bCenterX;
        vy = fCenterY - bCenterY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = fHalfWidth + bHalfWidth;
        combinedHalfHeights = fHalfHeight + bHalfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
            if (Math.abs(vy) < combinedHalfHeights) {
                hit = true;
            } else {
                hit = false;
            }
        } else {
            hit = false;
        }
        return hit;
    }
}