import * as PIXI from "pixi.js";
import Bullet from "./Bullet";
import Tools from "./Tools";

import "howler";

export default class Figure {

    constructor( /*BasicLevel*/level, x, y, stage, type) {
        this.level = level;
        this.loader = new PIXI.Loader();
        this.moves = [];// 0-left leg, 1-stay, 2- right leg
        this.moveIndex = 1;
        this.moveRepeat = 0;
        this.stage = stage;
        this.dead = false;

        this.bonuses = [];

        this.maxHealth = 1;
        this.health = 1;

        this.shield = false;
        this.shotgun = false;
        this.noReload = false;

        this.moveX = 0;
        this.moveY = 0;
        this.width = 90 * 0.7;
        this.height = 140 * 0.7;

        let rndPoint = level.getRandomSpawn(this.width, this.height);

        this.x = rndPoint.x;
        this.y = rndPoint.y;

        this.angle = 0;
        this.speed = 5;
        this.maxSpeed = 5;
        this.rotation = "";
        this.type = type;

        this.shootSound = [];
        for (let i = 1; i < 9; i++) {
            this.shootSound.push(new Howl({
                src: ['assets/dominik/sounds/Shot0' + i + '.wav']
            }));
        }
        this.bonusSound = new Howl({
            src: ['assets/dominik/sounds/PowerUp01.wav']
        });


        this.moveSound = new Howl({
            src: ['assets/dominik/sounds/Footstep.wav']
        });


        this.hitRectangle = {x: 0, y: 0, width: this.width, height: this.width};

        this.initImage(type);
    }

    initImage(type) {
        let texture;
        if (type === "player"){
            texture = PIXI.BaseTexture.from("assets/dominik/char.png");
        } else {
            texture = PIXI.BaseTexture.from("assets/dominik/enemy.png");
        }

        let x = 0;
        for (let i = 0; i < 3; i++) {
            let rectangle = new PIXI.Rectangle(x, 0, 90, 140);

            let texture2 = new PIXI.Texture(texture, rectangle);
            this.moves[i] = PIXI.Sprite.from(texture2);
            this.moves[i].name = "move" + i;
            this.moves[i].x = this.x;
            this.moves[i].y = this.y;
            this.moves[i].width = this.width;
            this.moves[i].height = this.height;
            //this.moves[i].texture = PIXI.Texture.WHITE;
            //this.moves[i].tint = 0xe8e8e8;

            this.moves[i].anchor.x = 0.5;
            this.moves[i].anchor.y = 0.5;
            this.moves[i].zIndex = 1;

            this.moves[i].visible = (i === 1);
            this.stage.addChild(this.moves[i]);
            x += 90;
        }
        this.hitRectangle.x = this.x - this.width / 2;
        this.hitRectangle.y = this.y - this.width / 4;
    }

    addBonus(bonus){
        this.bonuses.push(bonus);
    }

    removeBonus(bonus){
        this.bonuses.splice(bonus);
    }

    checkBonusesDuration(){
        this.bonuses.forEach(bonus => {
            if (bonus.active && bonus.duration <= 0){
                if (bonus.name === "reload") this.noReload = false;
                else if (bonus.name === "shield") this.shield = false;
                else if (bonus.name === "shotgun") this.shotgun = false;
                else if (bonus.name === "speed") this.speed = this.maxSpeed;

                bonus.active = false;
            } else if (bonus.active){
                bonus.durationLoader();
            }
        });
    }

    setVisibility(visible){
        this.moves.forEach( (move) => {
            move.visible = visible;
        })
    }

    wasHit() {
        this.health -= 1;
        if (this.health <= 0) {
            this.dead = true;
            this.moves.forEach((move) => {
                move.visible = false;
            })
        }
    }

    isDead() {
        return this.dead;
    }

    checkMoves() {
        if (this.moveX > 0 && this.moveY > 0) this.rotation = 'RD';
        else if (this.moveX > 0 && this.moveY < 0) this.rotation = 'RU';
        else if (this.moveX < 0 && this.moveY > 0) this.rotation = 'LD';
        else if (this.moveX < 0 && this.moveY < 0) this.rotation = 'LU';
        else if (this.moveX === 0 && this.moveY > 0) this.rotation = "D";
        else if (this.moveX === 0 && this.moveY < 0) this.rotation = "U";
        else if (this.moveX > 0 && this.moveY === 0) this.rotation = "R";
        else if (this.moveX < 0 && this.moveY === 0) this.rotation = "L";

        let newY = this.y + this.moveY;
        let newX = this.x + this.moveX;
        if (this.level.isWallOnX(this.x, this.x + this.moveX, newY)) {
            this.moveX = 0;
        }
        if (this.level.isWallOnY(this.y, this.y + this.moveY, newX)) {
            this.moveY = 0;
        }
    }

    move(delta) {
        if (!this.dead) {
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

                        this.width = move.width;
                        this.height = move.height;
                    });

                    if (this.moveRepeat >= 10) {
                        this.moveIndex++;
                        this.moveRepeat = 0;
                        if (this.moveIndex > 2) this.moveIndex = 0;

                        this.moveSound.play();
                    }

                    for (let i = 0; i < this.moves.length; i++) {
                        this.moves[i].visible = (i === this.moveIndex);
                    }
                    this.moveRepeat++;
                }

                if (this.rotation === 'U'){
                    this.hitRectangle.x = this.x - this.width / 2;
                    this.hitRectangle.y = this.y - this.width / 4;
                } else if (this.rotation === 'L') {
                    this.hitRectangle.x = this.x - this.width / 4;
                    this.hitRectangle.y = this.y - this.width / 2;
                } else if (this.rotation === 'R'){
                    this.hitRectangle.x = this.x - this.width / 2 - 10;
                    this.hitRectangle.y = this.y - this.width / 2;
                } else if (this.rotation === 'LU') {
                    this.hitRectangle.x = this.x - this.width / 4;
                    this.hitRectangle.y = this.y - this.width / 4;
                } else if (this.rotation === 'RU') {
                    this.hitRectangle.x = this.x - this.width / 2 - 10;
                    this.hitRectangle.y = this.y - this.width / 4;
                } else if (this.rotation === 'LD') {
                    this.hitRectangle.x = this.x - this.width / 2 + 10;
                    this.hitRectangle.y = this.y - this.width / 2 - 10;
                } else if (this.rotation === 'RD') {
                    this.hitRectangle.x = this.x - this.width / 2 - 10;
                    this.hitRectangle.y = this.y - this.width / 2 - 10;
                } else {
                    this.hitRectangle.x = this.x - this.width / 2;
                    this.hitRectangle.y = this.y - this.height / 2;
                }
            }
        }
    }

    rotateImage(move) {
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

    containsBonus(bonusName){
        for (let i = 0; i < this.bonuses.length; i++) {
            if (this.bonuses[i].name === bonusName) {
                return {contains: true, bonus: this.bonuses[i]}
            }
        }

        return {contains: false, bonus: null};
    }

    shoot(angle) {
        if (this.shotgun){
            let point = this.getFirstBulletPoint();
            new Bullet(this.level, point.x, point.y, Tools.toRadians(this.angle - 90 - 20), this.stage, this.type);
            new Bullet(this.level, point.x, point.y, Tools.toRadians(this.angle - 90), this.stage, this.type);
            new Bullet(this.level, point.x, point.y, Tools.toRadians(this.angle - 90 + 20), this.stage, this.type);
        } else {
            let point = this.getFirstBulletPoint();
            new Bullet(this.level, point.x, point.y, angle, this.stage, this.type);
        }

        let rnd = Tools.getRndInteger(1, 8);
        this.shootSound[rnd].play();
    }

    clearObject() {
    }

    bulletLoader(){}

    checkBonuses(){
        this.bonuses.forEach(bonus => {
            if (bonus.take) {
                if (bonus.name === "firstaid") {
                    this.health = this.maxHealth;
                } else if (bonus.name === "reload") {
                    this.noReload = true;
                    bonus.startDuration();
                } else if (bonus.name === "shield") {
                    this.shield = true;
                    bonus.startDuration();
                } else if (bonus.name === "shotgun") {
                    this.shotgun = true;
                    bonus.startDuration();
                } else if (bonus.name === "speed") {
                    bonus.startDuration();
                    this.speed = this.maxSpeed * 2;
                }

                bonus.active = true;
                bonus.take = false;
                this.bonusSound.loop(true);
                this.bonusSound.play();

            }
        });
        //if (this.type === 'player')
            //console.log(this.bonuses);

        this.checkBonusesDuration();
    }

    getFirstBulletPoint() {
        let point = {};
        point.x = 0;
        point.y = 0;
        if (this.rotation === 'RD') {
            point.x = this.x + this.width;
            point.y = this.y + this.height;
        } else if (this.rotation === 'RU') {
            point.x = this.x + this.width;
            point.y = this.y - this.height;
        } else if (this.rotation === 'LD') {
            point.x = this.x - this.width;
            point.y = this.y + this.height;
        } else if (this.rotation === 'LU') {
            point.x = this.x - this.width;
            point.y = this.y - this.height;
        } else if (this.rotation === 'U') {
            point.y = this.y - this.height;
            point.x = this.x;
        } else if (this.rotation === 'D') {
            point.y = this.y + this.height;
            point.x = this.x;
        } else if (this.rotation === 'R') {
            point.x = this.x + this.width;
            point.y = this.y;
        } else if (this.rotation === 'L') {
            point.x = this.x - this.width;
            point.y = this.y;
        } else {
            point.x = this.x - this.width;
            point.y = this.y - this.height;
        }

        return point;
    }


}