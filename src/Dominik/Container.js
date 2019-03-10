export default class Container {

    constructor (width, height){
        this.figures = {};
        this.bullets = {};
        this.width = width;
        this.height = height;
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
        let position = {};
        position.width = this.width;
        position.height = this.height;
        return position;
    }

    isOnXWall(coordinateFrom, coordinateTo){
        if (coordinateFrom > coordinateTo){
            return !this.width > coordinateTo;
        } else {
            return !this.width < coordinateTo;
        }
    }

    isOnYWall(coordinateFrom, coordinateTo){
        if (coordinateFrom > coordinateTo){
            return !this.height > coordinateTo
        } else {
            return !this.height > coordinateTo;
        }
    }
}