import * as PIXI from "pixi.js";

export default class Player {
    constructor(/*PIXI.Loader*/loader, /*PIXI*/ app) {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);

        loader.add("assets/Robo/player.png").load(this.init.bind(this));
        this.resources = loader.resources;

        this.canvas = app.stage;
        this.sprite = {};

        this.moveX = 0;
        this.moveY = 0;
        this.moveConstant = 2;

        this.move = 0;
    }

    init = () => {
        this.sprite = new PIXI.Sprite(this.resources["assets/Robo/player.png"].texture);
        this.sprite.scale.set(2,2);
        this.canvas.addChild(this.sprite);
    };

    moveSprite = () => {
        this.sprite.x += this.moveX;
        this.sprite.y += this.moveY;
    };

    handleKeyDown = (event) => {
        let moveConstant = this.moveConstant;
        if (event && event.key) {
            let key = event.key;
            switch (key) {
                /* movement */
                case "ArrowUp":
                case "W":
                case "w":
                    if ((this.move & 1) !== 1) {
                        this.moveY -= moveConstant;
                        this.move = this.move | 1;
                    }
                    break;

                case "ArrowDown":
                case "S":
                case "s":
                    if ((this.move & 2) !== 2) {
                        this.moveY += moveConstant;
                        this.move = this.move | 2;
                    }
                    break;

                case "ArrowLeft":
                case "A":
                case "a":
                    if ((this.move & 4) !== 4) {
                        this.moveX -= moveConstant;
                        this.move = this.move | 4;
                    }
                    break;

                case "ArrowRight":
                case "D":
                case "d":
                    if ((this.move & 8) !== 8) {
                        this.moveX += moveConstant;
                        this.move = this.move | 8;
                    }
                    break;
                /* movement end */

                default:
                    break;
            }
        }

        this.validateMoves();
    };

    handleKeyUp = (event) => {
        let moveConstant = this.moveConstant;
        if (event && event.key) {
            let key = event.key;
            switch (key) {
                /* movement */
                case "ArrowUp":
                case "W":
                case "w":
                    this.moveY += moveConstant;
                    this.move = this.move ^ 1;
                    break;

                case "ArrowDown":
                case "S":
                case "s":
                    this.moveY -= moveConstant;
                    this.move = this.move ^ 2;
                    break;

                case "ArrowLeft":
                case "A":
                case "a":
                    this.moveX += moveConstant;
                    this.move = this.move ^ 4;
                    break;

                case "ArrowRight":
                case "D":
                case "d":
                    this.moveX -= moveConstant;
                    this.move = this.move ^ 8;
                    break;
                /* movement end */

                default:
                    break;
            }
        }
        this.validateMoves();
    };

    validateMoves = () => {
        if (this.moveY > this.moveConstant) {
            this.moveY = this.moveConstant;
        }
        if (this.moveX > this.moveConstant) {
            this.moveY = this.moveConstant1;
        }
        if (this.moveY < -this.moveConstant) {
            this.moveY = -this.moveConstant;
        }
        if (this.moveX < -this.moveConstant) {
            this.moveX = -this.moveConstant;
        }
    };
}