import * as PIXI from "pixi.js";

export default class TileBuffer {
    constructor(spriteName, tileWidth, tileHeight, loader) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.buffer = [];

        this.loader = loader;
        this.spriteName = spriteName;

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
        // tile.beginFill(0xffffff);
        // tile.lineStyle(5, 0xa3a3a3, 1);
        // tile.drawRect(0, 0, this.tileWidth, this.tileHeight);
        // container.addChild(tile);

        let sprite = this.loader.getGameSprite(this.spriteName);
        sprite.width = this.tileWidth;
        sprite.height = this.tileHeight;
        container.addChild(sprite);
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