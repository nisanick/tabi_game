export default class Renderable{
    constructor(type, sprite){
        this.previous = null;
        this.next = null;

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.state = "";
        this.rotation = 0;
        this.type = type;
        this.sprite = sprite;
    }

    setData(object){
        this.x = object.x;
        this.y = object.y;
        this.width = object.width;
        this.height = object.height;
        this.rotation = object.rotation;
        this.state = object.state;
    }

}