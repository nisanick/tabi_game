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

        this.player = this.createPlayer();
        this.locationText = new PIXI.Text("Test", new PIXI.TextStyle({fill: "white", fontSize: 30, fontFamily: "Linepixels"}));
        this.ui = this.createWorldUI();

        this.on("click", this.onClick);

        this.blueBuffer = new TileBuffer("tileWater", this.tileWidth, this.tileHeight,loader);
        this.yellowBuffer = new TileBuffer("tileGrass", this.tileWidth, this.tileHeight,loader);
        this.greenBuffer = new TileBuffer("tileForest", this.tileWidth, this.tileHeight,loader);
        this.brownBuffer = new TileBuffer("tileMountain", this.tileWidth, this.tileHeight,loader);
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
        this.addChild(this.ui);
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

        if (((this.finalPoisiton.x - player.x) !== 0) || ((this.finalPoisiton.y - player.y) !== 0)) {
            if (this.skipFrame) {
                this.skipFrame = false;
            } else {
                this.checkMoves();
                this.skipFrame = false;
            }
        } else {
            this.moving = false;
        }
        if (this.repaint) {
            this.skipFrame = false;
            this.tileContainer.position.set(-this.tileHeight, -this.tileWidth);
            this.cleanBuffers();
            let tilecount = 0;
            for (let i = 0; i < 11; i++) {
                for (let j = 0; j < 11; j++) {
                    // TODO kontrola na farbu policka
                    let tile;
                    let x = i * this.tileWidth;
                    let y = j * this.tileHeight;
                    switch(this.game.getTileType((this.game.player.x + parseInt(x / 100) - 5), (this.game.player.y + parseInt(y / 100) - 5))){
                        case 1: tile = this.blueBuffer.getTile();break;
                        default:
                        case 2: tile = this.yellowBuffer.getTile(); break;
                        case 3: tile = this.greenBuffer.getTile(); break;
                        case 4: tile = this.brownBuffer.getTile(); break;
                    }
                    tile.position.set(x, y);
                    if (this.debug) {
                        tile.children[tile.children.length -1].text = (this.game.player.x + parseInt(x / 100) - 5) + "," + (this.game.player.y + parseInt(y / 100) - 5) + " | " + this.game.getTileType((this.game.player.x + parseInt(x / 100) - 5), (this.game.player.y + parseInt(y / 100) - 5));
                    }
                    tile.visible = true;
                    this.tileContainer.addChild(tile);
                }
            }
            this.locationText.text = this.game.getTileTypeText(player.x, player.y);
            this.locationText.position.set(900/2 - this.locationText.width/2, 60/2);
            this.repaint = false;
        }
    };

    cleanBuffers = () => {
        this.tileContainer.removeChildren(0, this.children.length);
        this.yellowBuffer.cleanBuffer();
        this.blueBuffer.cleanBuffer();
        this.brownBuffer.cleanBuffer();
        this.greenBuffer.cleanBuffer();
    };

    checkMoves = () => {
        let toX = this.game.player.x - this.finalPoisiton.x;
        let toY = this.game.player.y - this.finalPoisiton.y;

        this.playerX = 0;
        this.playerY = 0;
        if (Math.abs(toX) >= Math.abs(toY)) {
            this.tileContainer.x += this.moveSpeed * Math.sign(toX);
            this.playerX = Math.sign(toX) * -1;
        } else {
            this.tileContainer.y += this.moveSpeed * Math.sign(toY);
            this.playerY = Math.sign(toY) * -1;
        }

        if ((this.tileContainer.x % 100) === 0 && (this.tileContainer.y % 100) === 0) {
            this.game.movePlayer(this.playerX, this.playerY);
            this.repaint = true;
            //zisti co je na policku
        }

    };

    onClick = (e) => {
        if(e.canceled){
            return;
        }
        if (this.moving === true) {
            return;
        }
        let x = this.game.player.x + parseInt(e.data.global.x / 100) - 4;
        let y = this.game.player.y + parseInt(e.data.global.y / 100) - 4;
        this.finalPoisiton = {x, y};
        this.moving = true;
    };

    createWorldUI = () => {
        let fill;
        let frame;
        let icon;
        let uiContainer = new PIXI.Container();

        let hp = new PIXI.Container();
        hp.position.set(0,0);
        fill = new PIXI.Graphics();
        fill.beginFill(0x000000);
        fill.drawRect(0, 0, 280, 125);

        frame = this.loader.getGameSprite("frame_char");
        frame.x = -20;
        frame.y = -415;
        frame.height = 540;
        frame.width = 300;
        hp.addChild(fill);
        hp.addChild(frame);

        let bottom = new PIXI.Container();

        let player = new PIXI.Container();
        player.interactive = true;
        player.position.set(0,760);
        fill = new PIXI.Graphics();
        fill.beginFill(0x000000);
        fill.drawRect(0, 0, 450/3, 140);

        frame = this.loader.getGameSprite("frame_char");
        frame.height = 540;
        frame.width = 300;
        frame.x = -2*frame.width/3 + 50;

        icon = this.loader.getGameSprite("player_avatar");
        icon.scale.set(0.25,0.25);
        icon.position.set(0,20);

        player.addChild(fill);
        player.addChild(icon);
        player.addChild(frame);

        let location = new PIXI.Container();
        location.position.set(0,830);
        fill = new PIXI.Graphics();
        fill.beginFill(0x000000);
        fill.drawRect(0, 0, 900, 70);

        this.locationText.position.set(900/2, 68/2);
        frame = this.loader.getGameSprite("frame_char");
        frame.height = 540;
        frame.width = 900;
        location.addChild(fill);
        location.addChild(frame);
        location.addChild(this.locationText);

        let bag = new PIXI.Container();
        bag.interactive = true;
        bag.position.set(900-450/3,760);
        fill = new PIXI.Graphics();
        fill.beginFill(0x000000);
        fill.drawRect(0, 0, 450/3, 140);

        frame = this.loader.getGameSprite("frame_char");
        frame.height = 540;
        frame.width = 300;
        icon = this.loader.getGameSprite("bag");
        icon.scale.set(0.5,0.5);
        icon.position.set(20,20);

        bag.addChild(fill);
        bag.addChild(icon);
        bag.addChild(frame);


        bottom.addChild(location);
        bottom.addChild(bag);
        bottom.addChild(player);

        uiContainer.addChild(bottom);
        uiContainer.addChild(hp);

        player.on("click", (e) => {console.log("open character screen"); this.loader.setScene(0)});
        bag.on("click", (e) => {console.log("open inventory screen")});

        return uiContainer;
    };
    /*

        let spellBar = this.loader.getGameSprite("frame_char");
        spellBar.x = 0;
        spellBar.y = this.loader.app.stage.height - 130;
        spellBar.height = this.loader.app.stage.height;
        spellBar.width = this.loader.app.stage.width;
        this.addChild(spellBar);
        */
}