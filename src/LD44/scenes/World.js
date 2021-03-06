import * as PIXI from "pixi.js";
import BasicScene from "./BasicScene";
import TileBuffer from "../tools/TileBuffer";
import StatusBar from "../objects/StatusBar";
import Animation from "./Animation";
import Window from "./Window";

export default class World extends BasicScene {
    constructor(loader, game) {
        super(loader);
        this.debug = window.gameDebugMode;
        this.game = game;
        this.tileWidth = 100;
        this.tileHeight = 100;
        this.loader = loader;

        this.interactive = true;
        this.animWalk = {};
        this.animBounds = {};
        this.actualFlip = 2;
        this.initPlayerPoint = {};
        this.player = this.createPlayer();
        this.locationText = new PIXI.Text("Test", new PIXI.TextStyle({fill: "white", fontSize: 30, fontFamily: "Linepixels"}));
        this.hpBar = new StatusBar(1, this.loader);
        this.hpBar.scale.set(0.3, 0.5);
        this.hpBar.position.set(60, 10);

        this.goldText = new PIXI.Text("", new PIXI.TextStyle({fill: "white", fontSize: 30, fontFamily: "Linepixels"}));
        this.goldText.position.set(60,60);

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

        this.cross = this.loader.getGameSprite("cross");
        this.cross.visible = false;

        this.addChild(this.tileContainer);

        this.animWalk = new Animation(this.loader, 'player', 'walk', this, this.animBounds, true);
        this.animWalk.init();
        this.addChild(this.player);

        this.attackWindow = new Window(loader, this, "You were attacked!", 30);
        this.windowCounter = 0;
        this.windowDisplayed = false;

        this.addChild(this.ui);
        loader.app.stage.addChild(this);
    }


    createPlayer = () => {
        let player = this.loader.getGameSprite('player_stay');
        player.width = 140;
        player.height = 150;
        player.x = 425 - 50;
        player.y = 425 - 50;
        this.initPlayerPoint = {x: player.x, y: player.y, width: player.width, height: player.height};
        this.animBounds = {x: player.x, y: player.y, width: player.width, height: player.height};
        return player;
    };

    // 1 - left , 2 - right
    flipPlayer = (type) => {
        if (this.actualFlip !== type) {
            this.actualFlip = type;
            this.player.width *= -1;
            if (type === 1){
                this.player.x += this.initPlayerPoint.width;
                this.animBounds.x += this.initPlayerPoint.width;
            } else {
                this.player.x = this.initPlayerPoint.x;
                this.animBounds.x = this.initPlayerPoint.x;
            }
            this.animWalk.flipSprites(this.animBounds, type);
        }
    };

    repaintScene = () => {

        let player = this.game.player;

        // let x = this.finalPoisiton.x;
        // let y = this.finalPoisiton.y;
        //
        // if(x < 0){
        //     x = 1000 + x;
        // }
        // if(y < 0){
        //     y = 1000 + y;
        // }
        //
        // x = x % 1000;
        // y = y % 1000;

        if (!this.windowDisplayed) {
            if (((this.finalPoisiton.x - player.x) !== 0) || ((this.finalPoisiton.y - player.y) !== 0)) {
                if (this.skipFrame) {
                    this.skipFrame = false;
                } else {
                    this.checkMoves();
                    this.skipFrame = false;
                }
                this.cross.visible = true;
            } else {
                this.moving = false;
                this.cross.visible = false;
            }
        } else {
            if (this.windowCounter === 120) {
                this.attackWindow.hideWindow();
                this.windowDisplayed = false;
                this.windowCounter = 0;
                this.loader.setScene(2);
            } else {
                this.cross.visible = false;
                this.windowCounter++;
            }
        }
        if (this.repaint) {
            this.goldText.text = this.game.player.gold.toLocaleString();
            this.skipFrame = false;
            this.tileContainer.position.set(-this.tileHeight, -this.tileWidth);
            this.cleanBuffers();

            for (let i = 0; i < 11; i++) {
                for (let j = 0; j < 11; j++) {
                    let tile;
                    let x = i * this.tileWidth;
                    let y = j * this.tileHeight;

                    let drawX = this.game.player.x + parseInt(x / 100) - 5;
                    let drawY = this.game.player.y + parseInt(y / 100) - 5;

                    let mapTile = this.game.getTile(drawX, drawY);


                    if(mapTile === undefined) {
                        continue;
                    }

                    if(mapTile.city){

                        switch(this.game.getTileType(drawX, drawY)){
                            case 1: tile = this.blueBuffer.getCity();break;
                            default:
                            case 2: tile = this.yellowBuffer.getCity(); break;
                            case 3: tile = this.greenBuffer.getCity(); break;
                            case 4: tile = this.brownBuffer.getCity(); break;
                            case -10: continue;
                        }
                    } else {
                        if(mapTile.chest){

                            switch(this.game.getTileType(drawX, drawY)){
                                case 1: tile = this.blueBuffer.getChest();break;
                                default:
                                case 2: tile = this.yellowBuffer.getChest(); break;
                                case 3: tile = this.greenBuffer.getChest(); break;
                                case 4: tile = this.brownBuffer.getChest(); break;
                                case -10: continue;
                            }
                        } else {
                            switch(this.game.getTileType(drawX, drawY)){
                                case 1: tile = this.blueBuffer.getTile();break;
                                default:
                                case 2: tile = this.yellowBuffer.getTile(); break;
                                case 3: tile = this.greenBuffer.getTile(); break;
                                case 4: tile = this.brownBuffer.getTile(); break;
                                case -10: continue;
                            }
                        }
                    }

                    if(drawX === this.finalPoisiton.x && drawY === this.finalPoisiton.y ){
                        this.cross.position.set(x, y);
                    }
                    tile.position.set(x, y);
                    if (this.debug) {
                        tile.children[tile.children.length -1].text = (this.game.player.x + parseInt(x / 100) - 5) + "," + (this.game.player.y + parseInt(y / 100) - 5) + " | " + this.game.getTileType((this.game.player.x + parseInt(x / 100) - 5), (this.game.player.y + parseInt(y / 100) - 5));
                    }
                    tile.visible = true;
                    this.tileContainer.addChild(tile);
                }
            }
            this.tileContainer.addChild(this.cross);
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

        let prevX = this.playerX;
        this.playerX = 0;
        this.playerY = 0;
        if (Math.abs(toX) >= Math.abs(toY)) {
            this.tileContainer.x += this.moveSpeed * Math.sign(toX);
            this.playerX = Math.sign(toX) * -1;
        } else {
            this.tileContainer.y += this.moveSpeed * Math.sign(toY);
            this.playerY = Math.sign(toY) * -1;
        }

        if  (prevX > this.playerX){
            this.flipPlayer(1);
        } else if (prevX < this.playerX){
            this.flipPlayer(2);
        }
        this.animate();
        if ((this.tileContainer.x % 100) === 0 && (this.tileContainer.y % 100) === 0) {
            this.repaint = true;
            let action = this.game.movePlayer(this.playerX, this.playerY);
            if(action > 0){
                this.finalPoisiton = {x: this.game.player.x, Y: this.game.player.y};
                //this.moving = false;
                if(action === 2) {
                    this.loader.setScene(5);
                    this.stopAnimate();
                }
                if (action === 3){
                    this.attackWindow.showWindow();
                    this.windowDisplayed = true;
                    this.stopAnimate();
                }
            }
            this.stopAnimate();
            //zisti co je na policku
        }

    };

    onClick = (e) => {
        if(e.cancelMove){
            e.cancelMove = false;
            return;
        }
        if (this.moving === true) {
            return;
        }
        let x = this.game.player.x + parseInt(e.data.global.x / 100) - 4;
        let y = this.game.player.y + parseInt(e.data.global.y / 100) - 4;
        if(x < 0){
            x = 0;
        }
        if(y < 0){
            y = 0;
        }
        if(x > 999){
            x = 999;
        }
        if(y > 999){
            y = 999;
        }
        this.finalPoisiton = {x, y};
        this.cross.position.set( parseInt(e.data.global.x / 100) *100 +100, parseInt(e.data.global.y / 100) *100 +100);
        this.moving = true;
    };

    createWorldUI = () => {
        let fill;
        let frame;
        let icon;
        let uiContainer = new PIXI.Container();

        let status = new PIXI.Container();
        status.position.set(0,0);
        fill = new PIXI.Graphics();
        fill.beginFill(0x000000);
        fill.drawRect(0, 0, 280, 125);


        let heart = this.loader.getGameSprite("heart");
        heart.scale.set(0.13,0.13);
        heart.position.set(10, 15);

        let coin = this.loader.getGameSprite("coin");
        coin.scale.set(0.15,0.15);
        coin.position.set(10, 60);

        frame = this.loader.getGameSprite("frame_char");
        frame.x = -20;
        frame.y = -415;
        frame.height = 540;
        frame.width = 300;
        status.addChild(fill);
        status.addChild(this.hpBar);
        status.addChild(heart);
        status.addChild(coin);
        status.addChild(this.goldText);
        status.addChild(frame);

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
        uiContainer.addChild(status);

        player.on("click", (e) => {window.statsShown = 1; e.cancelMove = true; this.loader.setScene(4)});
        bag.on("click", (e) => {window.statsShown = 2; e.cancelMove = true; this.loader.setScene(4)});

        return uiContainer;
    };

    animate = () => {
        this.player.visible = false;
        this.animWalk.animate(this.animBounds);
    };

    stopAnimate = () => {
        this.player.visible = true;
        this.animWalk.stopAnimate();
    };

    resetMovement = () => {
        this.finalPoisiton = {x: this.game.player.x, y: this.game.player.y};
        this.moving = false;
        this.repaint = true;
    }
}