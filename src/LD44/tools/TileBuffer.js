import * as PIXI from "pixi.js";

export default class TileBuffer {
    constructor(color, tileWidth, tileHeight) {
        this.color = color;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.buffer = [];
        for (let i = 0; i < 11 * 11; i++) {
            let tile = this.createTile();
            this.buffer.push(tile);
        }

        this.used = 0;
    }

    getTile = () => {
        return this.buffer[this.used++];
    };

    createTile = () => {
        let container = new PIXI.Container();
        container.visible = false;
        let tile = new PIXI.Graphics();
        tile.beginFill(0xFFFF00);
        tile.lineStyle(5, 0xa3a3a3, 1);
        tile.drawRect(0, 0, this.tileWidth, this.tileHeight);
        tile.endFill();
        tile.visible = true;
        container.addChild(tile);
        if(window.gameDebugMode) {
            let coord = new PIXI.Text("", {fontSize: 10, fill: "black"});
            coord.x = 10;
            coord.y = 10;
            container.addChild(coord);
        }
        return container;
    };


    cleanBuffer = () => {
        this.buffer.forEach((el) => el.visible = false);
        this.used = 0;
    }
}