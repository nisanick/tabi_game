import * as PIXI from "pixi.js";
import Bullet from "./Bullet";

export default class Figure {

    constructor( /*Container*/container, x, y, stage){
        this.container = container;
        this.loader = new PIXI.Loader();
        this.moves = [];// 0-left leg, 1-stay, 2- right leg
        this.moveIndex = 1;
        this.moveRepeat = 0;
        this.health = 3;
        this.stage = stage;
        this.dead = false;

        this.x = x;
        this.y = y;
        this.moveX = 0;
        this.moveY = 0;
        this.width = 100;
        this.height = 150;
        this.angle = 0;
        this.speed = 5;
        this.rotation = "";

        this.initImage();
    }

    initImage(){
        this.loader.add("assets/dominik/char.png").load(this.setup.bind(this));
    }

    setup(){
        let texture = new PIXI.BaseTexture("assets/dominik/char.png");

        let x = 0;
        for (let i = 0; i < 3; i++) {
            let rectangle = new PIXI.Rectangle(x,0 ,100,149);

            let texture2 = new PIXI.Texture(texture, rectangle);
            this.moves[i] = PIXI.Sprite.from(texture2);
            this.moves[i].name = "move" + i;
            this.moves[i].x = this.x;
            this.moves[i].y = this.y;
            this.moves[i].scale.x = 0.7;
            this.moves[i].scale.y = 0.7;
            this.moves[i].anchor.x = 0.5;
            this.moves[i].anchor.y = 0.5;

            this.moves[i].visible = (i === 1);
            this.stage.addChild(this.moves[i]);
            x += 99;
        }

        this.moves.forEach((move) => {
            console.log(move);
        })
    }

    wasHit(){
        this.health -= 1;
        if (this.health <= 0) {
            this.dead = true;
            this.moves.forEach((move) => {
                this.stage.removeChild(move);
            })
        }
    }

    isDead(){
        return this.dead;
    }

    checkMoves(){
        if (this.moveX > 0 && this.moveY > 0) this.rotation = 'RD';
        else if (this.moveX > 0 && this.moveY < 0) this.rotation = 'RU';
        else if (this.moveX < 0 && this.moveY > 0) this.rotation = 'LD';
        else if (this.moveX < 0 && this.moveY < 0) this.rotation = 'LU';
        else if (this.moveX === 0 && this.moveY > 0) this.rotation = "D";
        else if (this.moveX === 0 && this.moveY < 0) this.rotation = "U";
        else if (this.moveX > 0 && this.moveY === 0) this.rotation = "R";
        else if (this.moveX < 0 && this.moveY === 0) this.rotation = "L";

        if (this.container.isWallOnX(this.x,this.x + this.moveX)) {
            this.moveX = 0;
        }
        if (this.container.isWallOnY(this.y,this.y + this.moveY)) {
            this.moveY = 0;
        }
    }

    move(){
        if (this.moveX === 0 && this.moveY === 0) {
            for (let i = 0; i < this.moves.length; i++) {
                this.moves[i].visible = i === 1;
            }
            this.moveRepeat = 0;
        } else {
            this.checkMoves();
            if (this.moveX !== 0 || this.moveY !== 0) {
                this.x += this.moveX;
                this.y += this.moveY;

                this.moves.forEach((move) => {
                    move.x = this.x;
                    move.y = this.y;

                    this.rotateImage(move);
                });

                if (this.moveRepeat >= 10) {
                    this.moveIndex++;
                    this.moveRepeat = 0;
                    if (this.moveIndex > 2) this.moveIndex = 0;
                }

                for (let i = 0; i < this.moves.length; i++) {
                    this.moves[i].visible = (i === this.moveIndex);
                }
                this.moveRepeat++;
            }
        }
    }

    rotateImage(move){
        if (this.rotation === 'RD') this.angle = 135;
        if (this.rotation === 'RU') this.angle = 45;
        if (this.rotation === 'R') this.angle = 90;
        if (this.rotation === 'LD') this.angle = 225;
        if (this.rotation === 'LU') this.angle = 315;
        if (this.rotation === 'L') this.angle = 270;
        if (this.rotation === 'U') this.angle = 0;
        if (this.rotation === 'D') this.angle = 180;

        move.rotation = this.angle * (Math.PI / 180);
    }

    shoot(angle){
        let point = this.getPoint();
        new Bullet(this.container, point.x, point.y, angle, this.stage);
    }

    getPoint(){
        let point = {};
        point.x = 0;
        point.y = 0;
        if (this.rotation === 'RD') {
            point.x = this.x + this.width / 2 - 15;
            point.y = this.y + this.height / 2 - 15;
        } else if (this.rotation === 'RU'){
            point.x = this.x + this.width / 2 - 15;
            point.y = this.y - this.height / 2 + 15;
        } else if (this.rotation === 'LD'){
            point.x = this.x - this.width / 2 + 15;
            point.y = this.y + this.height / 2 - 15;
        } else if (this.rotation === 'LU'){
            point.x = this.x - this.width / 2;
            point.y = this.y - this.height / 2 + 15;
        } else if (this.rotation === 'U'){
            point.y = this.y - this.height / 2 - 15;
            point.x = this.x;
        } else if (this.rotation === 'D'){
            point.y = this.y + this.height / 2 + 10;
            point.x = this.x;
        } else if (this.rotation === 'R'){
            point.x = this.x + this.width / 2 + 10;
            point.y = this.y;
        } else if (this.rotation === 'L'){
            point.x = this.x - this.width / 2 - 10;
            point.y = this.y;
        } else {
            point.x = this.x - this.width / 2 - 10;
            point.y = this.y - this.height / 2 - 10;
        }

        return point;
    }




}