import * as PIXI from "pixi.js";
import Tools from "../Tools";

export default class BasicLevel {

    constructor (width, height, stage){
        this.figures = [];
        this.bullets = [];
        this.width = width;
        this.height = height;
        this.stage = stage;
        this.background = {};
        this.bgPath = "assets/dominik/background/bg1.png";
        this.loader = new PIXI.Loader();
        this.bulletContainer = new PIXI.Container();
        this.stage.addChild(this.bulletContainer);
        this.objects = [];
        this.bonuses = [];
        this.bonusesAmount = 0;
        this.initDone = false;

        this.reflectionSound = new Howl({
            src: ['assets/dominik/songs/bullet_reflection.mp3']
        });
    }

    init(){
        this.background = PIXI.Sprite.from(this.bgPath);
        this.setup();
    }

    setup(){
        this.background.width = this.width;
        this.background.height = this.height + 7;
        this.background.x = 0;
        this.background.y = 0;
        this.stage.addChild(this.background);
    }

    hasObjects(){
        return this.objects.length > 0;
    }

    getPlayer(){
        for (let i = 0; i < this.figures.length; i++) {
            if (this.figures[i].type === "player"){
                return this.figures[i];
            }
        }
    }

    clearBullets(){
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].bulletTexture.visible = false;
        }

        this.bullets = [];
    }

    checkBonuses(figure){
        this.bonuses.forEach(bonus => {
            if (bonus.visible && Tools.collision(figure, bonus)){
                let obj = figure.containsBonus(bonus.name);
                if (!obj.contains) {
                    let bonusCopy = bonus.getCopy();
                    bonusCopy.take = true;
                    figure.bonuses.push(bonusCopy);
                } else {
                    obj.bonus.take = true;
                }
                bonus.startCooldown();
            }
        });
    }

    clearBonuses(){
        this.bonuses.forEach(bonus => {
            bonus.startCooldown();
        });
    }

    spawnBonuses(){
        this.bonuses.forEach(bonus => {
            bonus.spawn();
        });
    }

    clearFigures(){
        this.figures.forEach((figure) => {
            figure.clearObject();
            figure.moves.forEach((move) => {
                move.visible = false;
            });
        });
        this.figures = [];
    }

    addFigure(/*Figure*/figure){
        this.figures.push(figure);
    }

    addBullet(/*Bullet*/bullet){
        this.bullets.push(bullet);
    }

    removeBullet(/*Bullet*/bullet){
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].x === bullet.x && this.bullets[i].y === bullet.y) {
                this.bullets.splice(i, 1);
            }
        }
    }

    removeFigure(/*Figure*/figure){
        for (let i = 0; i < this.figures.length; i++) {
            if (this.figures[i].x === figure.x && this.figures[i].y === figure.y) {
                this.figures.splice(i, 1);
            }
        }
    }

    getFigures(){
        return this.figures
    }

    getBullets(){
        return this.bullets;
    }

    isWallOnX(coordinateFrom, coordinateTo, y, figure){
        if (figure != undefined){
            figure = figure.hitRectangle;
            if (y >= figure.y && y <= figure.y + figure.height) {
                if (Tools.isBetweenObject(figure.x, figure.x + figure.width, coordinateTo)) {
                    return true;
                }
            }
        }

        if (this.hasObjects() && this.isObjectOnX(coordinateFrom, coordinateTo, y)){
            return true;
        } else {
            if (coordinateFrom < coordinateTo) {
                return this.width <= coordinateTo;
            } else {
                return coordinateTo <= 0;
            }
        }
    }

    isWallOnY(coordinateFrom, coordinateTo, x, figure){
        if (figure != undefined) {
            figure = figure.hitRectangle;
            if (x >= figure.x && x <= figure.x + figure.width) {
                if (Tools.isBetweenObject(figure.y, figure.y + figure.height, coordinateTo)) {
                    return true;
                }
            }
        }

        if (this.hasObjects() && this.isObjectOnY(coordinateFrom, coordinateTo, x)){
            return true;
        } else {
            if (coordinateFrom < coordinateTo) {
                return this.height <= coordinateTo
            } else {
                return coordinateTo <= 0;
            }
        }
    }

    isObjectOnX(coordinateFrom, coordinateTo, y){
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].simple) {
                if (y >= this.objects[i].y && y <= this.objects[i].y + this.objects[i].height) {
                    if (Tools.isBetweenObject(this.objects[i].x, this.objects[i].x + this.objects[i].width, coordinateTo)) {
                        return true;
                }
                }
            }
        }

        return false;
    }

    isComplexObjectOnX(object){

    }

    isComplexObjectOnY(object){

    }

    isObjectOnY(coordinateFrom, coordinateTo, x){
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].simple) {
                if (x >= this.objects[i].x && x <= this.objects[i].x + this.objects[i].width) {
                    if (Tools.isBetweenObject(this.objects[i].y, this.objects[i].y + this.objects[i].height, coordinateTo)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    getRandomSpawn(width, height){
        let rnd = Tools.getRndInteger(0, 7);
        let y;
        let x;
        if (rnd > 3){
            x = Tools.getRndInteger(0, this.width - width);
            let isEmpty = false;
            y = 0;
            while(!isEmpty){
                y = Tools.getRndInteger(0, this.height - height);
                isEmpty = this.isPoisitionEmpty(x, y, width, height);
            }
        } else {
            y = Tools.getRndInteger(0, this.height - height);
            let isEmpty = false;
            x = 0;
            while(!isEmpty){
                x = Tools.getRndInteger(0, this.width - width);
                isEmpty = this.isPoisitionEmpty(x, y, width, height);
            }
        }

        return {x: x, y: y};
    }

    isPoisitionEmpty(x, y, width, height){
        let isEmpty = true;

        this.figures.forEach(figure => {
            if (figure.hitRectangle) {
                figure = figure.hitRectangle;
            }

            if (Tools.isBetweenObject(figure.x, figure.x + figure.width, x) && Tools.isBetweenObject(figure.y, figure.y + figure.height, y)) {
                isEmpty = false;
            } else if (Tools.isBetweenObject(figure.x, figure.x + figure.width, x + width) && Tools.isBetweenObject(figure.y, figure.y + figure.height, y + height)) {
                isEmpty = false;
            }
        });
        this.objects.forEach(object => {
            if (object.hitRectangle) {
                object = object.hitRectangle;
            }

            if (Tools.isBetweenObject(object.x, object.x + object.width, x) && Tools.isBetweenObject(object.y, object.y + object.height, y)) {
                isEmpty = false;
            } else if (Tools.isBetweenObject(object.x, object.x + object.width, x + width) && Tools.isBetweenObject(object.y, object.y + object.height, y + height)) {
                isEmpty = false;
            }
        });

        return isEmpty;
    }
}