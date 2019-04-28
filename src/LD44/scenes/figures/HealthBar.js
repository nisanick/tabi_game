import * as PIXI from "pixi.js";

export default class HealthBar {
    constructor(loader, x, y, width, height) {
        this.loader = loader;
        this.x = x;
        this.y = y;
        this.height = height;
        this.progress = 0;
        this.bar = new PIXI.Container();

        let border = new PIXI.Graphics();
        border.lineStyle(3, 0x000000, 1);
        border.drawRoundedRect(x, y, width, height, 5);
        this.bar.addChild(border);
        this.bar.position.set(2, height);

        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x4D4D4D);
        this.bg.drawRoundedRect(x, y + 1, width - 2, height - 2, 4);
        this.bar.addChild(this.bg);

        this.fillContainer = new PIXI.Container();
        this.fillContainer.x = x;
        this.fillContainer.y = y;
        this.fill = new PIXI.Graphics();
        this.fill.beginFill(0x00C905);
        this.fill.drawRoundedRect(0, 1, width - 2, height - 2, 4);
        this.fill.setTransform(1, 0, this.progress, 0, 0, 0);
        console.log(this.fill);
        this.fillContainer.addChild(this.fill);
        this.bar.addChild(this.fillContainer);
        loader.addChild(this.bar);

        this.fill.visible = false;

        this.fill.position.set(x, y);
    }

    setHealth = (percent) => {
        this.progress = percent / 100;
        this.fill.setTransform(0, 1, this.progress, 0, 0, 0);
        this.fill.visible = this.progress > 0;
        this.fill.position.set(0, 0);
        this.bar.visible = true;
    }
}