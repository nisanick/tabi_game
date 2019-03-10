import Figure from "./Figure";
import Tools from "./Tools";

export default class Player extends Figure {

    constructor(container, x, y, stage){
        super(container, x, y, stage);

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);

        this.time = 0;
        this.spacePressed = false;
    }

    handleKeyDown = (event) => {
        if (event && event.key) {
            let key = event.key;
            switch (key) {
                case "ArrowUp":
                    this.moveY = -this.speed;
                    break;

                case "ArrowDown":
                    this.moveY = this.speed;
                    break;

                case "ArrowLeft":
                    this.moveX = -this.speed;
                    break;

                case "ArrowRight":
                    this.moveX = this.speed;
                    break;

                case " ":
                    if (!this.spacePressed) {
                        this.time = new Date().getMilliseconds();
                        this.spacePressed = true;
                    }
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
                    this.moveY = 0;
                    break;

                case "ArrowDown":
                    this.moveY = 0;
                    break;

                case "ArrowLeft":
                    this.moveX = 0;
                    break;

                case "ArrowRight":
                    this.moveX = 0;
                    break;

                case " ":
                    //if (new Date().getMilliseconds() - this.time > 50){
                        let angle =  (this.angle - 90 + Tools.getRndInteger(-20, 20)) * (Math.PI / 180); //test
                        this.shoot(angle);
                        this.spacePressed = false;
                    //}
                    break;

                default:
                    break;
            }
        }
    };
}