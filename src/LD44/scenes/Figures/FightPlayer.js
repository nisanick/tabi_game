import FightFigure from "./FightFigure";

export default class FightPlayer extends FightFigure {
    constructor(loader, x, y, container, area) {
        super(loader, x, y, container, area, 'player');

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    handleKeyDown = (event) => {
        if (event && event.key) {
            let key = event.key;
            switch (key) {
                /* movement */
                case "ArrowUp":
                case "W":
                case "w":
                    this.moveY = -this.moveConstant;
                    break;

                case "ArrowDown":
                case "S":
                case "s":
                    this.moveY = this.moveConstant;
                    break;

                case "ArrowLeft":
                case "A":
                case "a":
                    this.moveX = -this.moveConstant;
                    break;

                case "ArrowRight":
                case "D":
                case "d":
                    this.moveX = this.moveConstant;
                    break;

                default:
                    break;
            }
        }
    };

    handleKeyUp = (event) => {
        if (event && event.key) {
            let key = event.key;
            switch (key) {
                /* movement */
                case "ArrowUp":
                case "W":
                case "w":
                    this.moveY = 0;
                    break;

                case "ArrowDown":
                case "S":
                case "s":
                    this.moveY = 0;
                    break;

                case "ArrowLeft":
                case "A":
                case "a":
                    this.moveX = 0;
                    break;

                case "ArrowRight":
                case "D":
                case "d":
                    this.moveX = 0;
                    break;

                default:
                    break;
            }
        }
    };
}