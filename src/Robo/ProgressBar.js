import * as PIXI from "pixi.js";

export default class ProgressBar {
    constructor(/* PIXI.Container */canvas) {
        this.progress = 0;
        this.bar = new PIXI.Container();

        let border = new PIXI.Graphics();
        border.lineStyle(2, 0x878787, 1);
        border.drawRoundedRect(0, 0, 60, 8, 5);
        this.bar.addChild(border);
        this.bar.position.set(2, 64);

        this.fill = new PIXI.Graphics();
        this.fill.beginFill(0xB9B635);
        this.fill.drawRoundedRect(0, 1, 58, 6, 4);
        this.fill.setTransform(1, 0, this.progress, 0, 0, 0);
        this.bar.addChild(this.fill);
        canvas.addChild(this.bar);

        // this.bar.visible = false;
        this.fill.visible = false;
    }

    setProgress = (percent) => {
        this.progress = percent;
        this.fill.setTransform(1, 0, this.progress, 0, 0, 0);
        console.log(this.fill.width);
        this.fill.visible = this.progress > 0;
        this.bar.visible = this.progress > 0;
    }


}