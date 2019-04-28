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
        this.title.position.set(20,5);

        this.type.text = info.type;
        this.type.position.set((this.title.width + 40) - this.type.width - 10, 39);

        this.bg.clear();
        this.bg.beginFill(0x5D412C);
        this.bg.lineStyle(3, 0xa3a3a3, 1);
        this.bg.drawRoundedRect(0,0, this.title.width + 40,200,5);
        this.bg.moveTo(0,34);
        this.bg.lineTo(this.title.width + 40, 34);
        this.bg.endFill();



        this.addChild(this.bg);
        this.addChild(this.title);
        this.addChild(this.type);
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