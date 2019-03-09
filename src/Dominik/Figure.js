import * as PIXI from "pixi.js";

class Figure {

    constructor( /*Container*/container, x, y){
        this.container = container;
        this.loader = PIXI.Loader;
        this.resources = PIXI.Loader.resources;
        this.moves = [];// 1-left leg, 2-stay, 3- right leg

        this.x = x;
        this.y = y;

        this.initImage();
    }

    iniImage(){
        this.loader.add("assets/dominik/char.png").load(this.setup.bind(this));
    }

    setup(){
        let texture = PIXI.TextureCache[["assets/dominik/char.png"]];

        let x = 0;
        for (let i = 0; i < 3; i++) {
            let rectangle = new PIXI.Rectangle(x,0 ,100,150);

            texture.frame = rectangle;
            x += 100

            let move = new PIXI.Sprite(texture);
            move.x = this.x;
            move.y = this.y;

            this.moves.push(move);
        }
    }

    addMovesToStage(app){
        this.moves.forEach((move) => {
            app.stage.addChild(move);
        })
    }


}