import * as PIXI from "pixi.js";

export default class Container {

    constructor (width, height, stage){
        this.figures = [];
        this.bullets = [];
        this.width = width;
        this.height = height;
        this.stage = stage;
        this.background = {};
        this.loader = new PIXI.Loader();
        //this.init();
    }

    init(){
        this.loader
            .add("assets/dominik/background.png")
            .load(this.setup.bind(this));
    }

    setup(){
        this.background = new PIXI.Sprite(this.loader.resources["assets/dominik/background.png"].texture);
        this.background.width = this.width;
        this.background.height = this.height + 7;
        this.background.x = 0;
        this.background.y = 0;
        this.stage.addChild(this.background);

    }

    clearBullets(){
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].bulletTexture.visible = false;
        }

        this.bullets = [];
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
        this.bullets.splice(bullet);
    }

    removeFigure(/*Figure*/figure){
        this.figures.splice(figure);
    }

    getFigures(){
        return this.figures
    }

    getBullets(){
        return this.bullets;
    }

    getSize(){
        let size = {};
        size.width = this.width;
        size.height = this.height;
        return size;
    }

    isWallOnX(coordinateFrom, coordinateTo){
        if (coordinateFrom < coordinateTo){
            return this.width <= coordinateTo;
        } else {
            return coordinateTo <= 0;
        }
    }

    isWallOnY(coordinateFrom, coordinateTo){
        if (coordinateFrom < coordinateTo){
            return this.height <= coordinateTo
        } else {
            return coordinateTo <= 0;
        }
    }
}