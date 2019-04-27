import * as PIXI from "pixi.js";
import BasicScene from "./BasicScene";

export default class World extends BasicScene {
    constructor(loader, game) {
        super(loader);
        this.game = game;
        this.tileWidth = 100;
        this.tileHeight = 100;
        this.loader = loader;

        this.tiles = [];
        this.interactive = true;
        this.on("mousedown", this.onClick);
        this.player = new PIXI.Graphics();
        this.init = true;

        this.moveSpeed = 2;
        this.moveX = 0;
        this.moveY = 0;
        this.finalPoisiton = {x: this.game.player.x, y: this.game.player.y};

        this.playerX = 0;
        this.playerY = 0;

        loader.app.stage.addChild(this);
    }

    repaintScene = () => {
        if (this.game.player.x - this.finalPoisiton.x !== 0 || this.game.player.y - this.finalPoisiton.y !== 0) {
            this.checkMoves();
        }

        if (this.moveX !== 0 || this.moveY !== 0 || this.init) {
            let player = this.game.getPlayer();
            this.removeChildren(0, this.children.length);
            let y = -this.tileHeight * 4 + this.moveY;
            for (let i = player.y - 8; i < player.y + 8; i++) {
                let x = -this.tileWidth * 4 + this.moveX;
                for (let j = player.x - 8; j < player.x + 8; j++) {
                    this.createTile(x, y);
                    x += this.tileWidth;
                }
                y += this.tileHeight;
            }

            this.player.x = 0;
            this.player.y = 0;

            this.player.beginFill(0x09FF00);
            this.player.lineStyle(5, 0xa3a3a3, 1);
            this.player.drawRect(425, 425, 50, 50);
            this.addChild(this.player);

            this.init = false;
        }
    };

    checkMoves = () => {
        let toX = Math.abs(this.game.player.x - this.finalPoisiton.x);
        let toY = Math.abs(this.game.player.y - this.finalPoisiton.y);

        if (toY > toX) {
            this.moveX = 0;
            if (this.game.player.y - this.finalPoisiton.y > 0) {
                this.moveY = this.moveSpeed + this.moveY;
                this.playerY = -1;
            } else {
                this.moveY = -this.moveSpeed + this.moveY;
                this.playerY = 1;
            }

        } else {
            this.moveY = 0;
            if (this.game.player.x - this.finalPoisiton.x > 0) {
                this.moveX = this.moveSpeed + this.moveX;
                this.playerX = -1;
            } else {
                this.moveX = -this.moveSpeed + this.moveX;
                this.playerX = 1;
            }
        }


        if ((this.moveY % 100) === 0 && (this.moveX % 100) === 0) {
            if (this.playerX !== 0) {
                this.game.movePlayer(this.game.player.x + this.playerX, this.game.player.y);
            } else if (this.playerY !== 0) {
                this.game.movePlayer(this.game.player.x, this.game.player.y + this.playerY);
            }
            //zisti co je na policku
        }
    };

    onClick = (e) => {
        let x = this.game.player.x + parseInt(e.data.global.x / 100) - 4;
        let y = this.game.player.y + parseInt(e.data.global.y / 100) - 4;
        this.finalPoisiton = {x, y};
        console.log({x, y});
    };

    createTile = (x, y) => {
        let tile = new PIXI.Graphics();
        tile.interactive = true;
        tile.x = 0;
        tile.y = 0;
        tile.beginFill(0xFFFF00);
        tile.lineStyle(5, 0xa3a3a3, 1);
        tile.drawRect(x, y, this.tileWidth, this.tileHeight);
        tile.endFill();
        tile.visible = true;
        this.addChild(tile);
        //this.tiles.push(tile);
    };


    removeTileEvent = () => {
        this.tiles.forEach(tile => {
            tile.off("mousedown");
        });
    };
}