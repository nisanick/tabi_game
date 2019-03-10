import Figure from "./Figure";

export default class Container {

    constructor (width, height, stage){
        this.figures = [];
        this.bullets = [];
        this.width = width;
        this.height = height;
        this.stage = stage;
    }

    addFigure(/*Figure*/figure){
        this.figures.push(figure);
    }

    addBullet(/*Bullet*/bullet){
        this.bullets.push(bullet);
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