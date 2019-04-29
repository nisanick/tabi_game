import * as PIXI from "pixi.js";

export default class Tooltip extends PIXI.Container{
    constructor(){
        super();

        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x5D412C);
        this.bg.lineStyle(3, 0xa3a3a3, 1);
        this.bg.drawRoundedRect(0,0, 200,200,5);

        this.title = new PIXI.Text('Test',  new PIXI.TextStyle({fill: "white", fontSize: 24, fontFamily: "Linepixels"}));
        this.type = new PIXI.Text('test',  new PIXI.TextStyle({fill: "white", fontSize: 14, fontFamily: "Linepixels"}));
        this.addChild(this.bg);
        this.addChild(this.title);

    }

    repaintTooltip = (info) => {
        this.removeChildren(0, this.children.length);
        this.title.text = info.name;

        let width = this.title.width + 40;

        if(width < 300 && Object.keys(info.details).length > 1){
            width = 300;
        }
        this.title.position.set(width/2 - this.title.width/2,5);


        this.type.text = info.type;
        this.type.position.set((width) - this.type.width - 10, 39);

        let height = 39 + this.type.height + 5 + Math.ceil(Object.keys(info.details).length/2) * 21 + 10;


        this.bg.clear();
        this.bg.beginFill(0x5D412C);
        this.bg.lineStyle(3, 0xa3a3a3, 1);
        this.bg.drawRoundedRect(0,0, width, height,5);
        this.bg.moveTo(0,34);
        this.bg.lineTo(width, 34);
        this.bg.endFill();



        this.addChild(this.bg);
        this.addChild(this.title);
        this.addChild(this.type);


        Object.keys(info.details).forEach((el, index) => {
            let row = Math.floor(index/2);
            let col = index % 2;
            let detail = new PIXI.Text(el + ": " + info.details[el],  new PIXI.TextStyle({fill: "white", fontSize: 18, fontFamily: "Linepixels"}));
            detail.position.set(col * (width)/2  + 5,  39 + this.type.height + 5  + row * 21);
            this.addChild(detail);
        });
    };

    setPosition = (e) => {
        let x = e.data.global.x;
        let y = e.data.global.y;

        let w = this.width;
        let h = this.height;

        let tx = x + 20;
        let ty = y + 20;

        if(tx + w > 900){
            tx = x - 20 - w;
        }
        if(ty + h > 900){
            ty = y - 20 - h;
        }

        this.position.set(tx, ty);
    };
}