import * as PIXI from "pixi.js";
import BasicScene from "./BasicScene";
import TileBuffer from "../tools/TileBuffer";

export default class World extends BasicScene {
    constructor(loader, game) {
        super(loader);
        this.debug = window.gameDebugMode;
        this.game = game;
        this.tileWidth = 100;
        this.tileHeight = 100;
        this.loader = loader;

        this.interactive = true;
        this.on("mousedown", this.onClick);

        this.player = this.createPlayer();

        this.yellowBuffer = new TileBuffer(1, this.tileWidth, this.tileHeight);
        this.greenBuffer = new TileBuffer(2, this.tileWidth, this.tileHeight);
        this.tileContainer = new PIXI.Container();

        this.repaint = true;

        this.moveSpeed = 5;
        this.skipFrame = false;
        this.moveX = 0;
        this.moveY = 0;
        this.finalPoisiton = {x: this.game.player.x, y: this.game.player.y};

        this.playerX = 0;
        this.playerY = 0;

        this.addChild(this.tileContainer);
        this.addChild(this.player);

        loader.app.stage.addChild(this);
    }



    createPlayer = () => {
        let player = new PIXI.Graphics();
        player.beginFill(0x09FF00);
        player.lineStyle(5, 0xa3a3a3, 1);
        player.drawRect(425, 425, 50, 50);
        return player;
    };

    repaintScene = () => {

        let player = this.game.player;

        if(((this.finalPoisiton.x - player.x) !== 0) || ((this.finalPoisiton.y - player.y) !== 0)) {
            if(this.skipFrame){
                this.skipFrame = false;
            } else {
                this.checkMoves();
                this.skipFrame = false;
            }
        } else {
            this.moving = false;
        }
        if(this.repaint) {
            this.skipFrame = false;
            this.tileContainer.position.set(-this.tileHeight, -this.tileWidth);
            this.cleanBuffers();
            let tilecount = 0;
            for (let i = 0; i < 11; i++) {
                for (let j = 0; j < 11; j++) {
                    // TODO kontrola na farbu policka
                    let tile = this.yellowBuffer.getTile();
                    let x = i * this.tileWidth;
                    let y = j * this.tileHeight;
                    tile.position.set(x, y);
                    if(this.debug) {
                        tile.children[1].text = (this.game.player.x + parseInt(x / 100) - 5) + "," + (this.game.player.y + parseInt(y / 100) - 5);
                    }
                    tile.visible = true;
                    this.tileContainer.addChild(tile);
                }
            }
            this.repaint = false;
        }
    };

    cleanBuffers = () => {
        this.tileContainer.removeChildren(0, this.children.length);
        this.yellowBuffer.cleanBuffer();
        this.greenBuffer.cleanBuffer();
    };

    checkMoves = () => {
        let toX = this.game.player.x - this.finalPoisiton.x;
        let toY = this.game.player.y - this.finalPoisiton.y;

        this.playerX = 0;
        this.playerY = 0;
        if(Math.abs(toX) >= Math.abs(toY)){
            this.tileContainer.x += this.moveSpeed*Math.sign(toX);
            this.playerX = Math.sign(toX) * -1;
        } else {
            this.tileContainer.y += this.moveSpeed*Math.sign(toY);
            this.playerY = Math.sign(toY) * -1;
        }

        if ((this.tileContainer.x % 100) === 0 && (this.tileContainer.y % 100) === 0) {
            this.game.movePlayer(this.playerX, this.playerY);
            this.repaint = true;
            //zisti co je na policku
        }

    };

    onClick = (e) => {
        if(this.moving === true) {
            return;
        }
        let x = this.game.player.x + parseInt(e.data.global.x / 100) - 4;
        let y = this.game.player.y + parseInt(e.data.global.y / 100) - 4;
        this.finalPoisiton = {x, y};
        this.moving = true;
    };
}