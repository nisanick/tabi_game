import * as PIXI from "pixi.js";
import ProgressBar from "./ProgressBar";

export default class Player {
    constructor(/*PIXI.Loader*/loader, /*PIXI*/ canvas) {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);

        this.resources = loader.resources;

        this.canvas = canvas;
        this.sprite = {};
        this.graphic = {};
        this.progressBar = {};

        this.moveX = 0;
        this.moveY = 0;
        this.moveConstant = 2;

        this.move = 0;

        this.charge = false;
    }

    init = () => {
        this.graphic = new PIXI.Container();

        this.sprite = new PIXI.Sprite(this.resources["assets/Robo/player.png"].texture);
        this.sprite.scale.set(2, 2);
        this.sprite.position.set(0, 0);
        this.graphic.addChild(this.sprite);

        this.progressBar = new ProgressBar(this.graphic);

        this.canvas.addChild(this.graphic);
    };

    repaint = () => {
        this.graphic.position.set(this.graphic.x + this.moveX, this.graphic.y + this.moveY);
        if (this.charge) {
            this.progress = (this.progress + 1.5) % 100;
        }
        this.progressBar.setProgress(this.progress / 100);
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

                case " ":
                    if (!this.charge) {
                        this.progress = 0;
                    }
                    this.charge = true;

                    break;

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
                    if ((this.move & 1) === 1) {
                        this.moveY += moveConstant;
                        this.move = this.move ^ 1;
                    }
                    break;

                case "ArrowDown":
                case "S":
                case "s":
                    if ((this.move & 2) === 2) {
                        this.moveY -= moveConstant;
                        this.move = this.move ^ 2;
                    }
                    break;

                case "ArrowLeft":
                case "A":
                case "a":
                    if ((this.move & 4) === 4) {
                        this.moveX += moveConstant;
                        this.move = this.move ^ 4;
                    }
                    break;

                case "ArrowRight":
                case "D":
                case "d":
                    if ((this.move & 8) === 8) {
                        this.moveX -= moveConstant;
                        this.move = this.move ^ 8;
                    }
                    break;
                /* movement end */

                case " ":
                    this.charge = false;
                    this.progress = 0;
                    break;

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
            this.moveY = this.moveConstant;
        }
        if (this.moveY < -this.moveConstant) {
            this.moveY = -this.moveConstant;
        }
        if (this.moveX < -this.moveConstant) {
            this.moveX = -this.moveConstant;
        }
    };
}