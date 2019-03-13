export default class Wall {
    constructor(xFrom, yFrom, xTo, yTo){
        this.xFrom = xFrom;
        this.yFrom = yFrom;
        this.xTo = xTo;
        this.yTo = yTo;
    }

    getPoints(){
        let points = [];
        points[0] = {x: this.xFrom, y: this.yFrom};
        points[1] = {x: this.xTo, y: this.yTo};

        return points;
    }

    getPointFrom(){
        return {x: this.xFrom, y: this.yFrom};
    }

    getPointTo(){
        return {x: this.xTo, y: this.yTo};
    }

}