import Figure from "./Figure";

export default class Player extends Figure {

    constructor(level, x, y, stage){
        super(level, x, y, stage, "player");

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);


        this.time = {};
        this.health = 3;
        this.maxHealth = 3;
        this.bulletCooldown = 0;
        this.spacePressed = false;
        this.counter = 0;
        this.angleCounter = 0;
        this.bulletAngle = -20;
        this.bulletConst = 1;
    }

    clearObject(){
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
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
                    if (!this.spacePressed && this.bulletCooldown === 0) {
                        this.time = new Date();
                        this.spacePressed = true;
                    }
                    break;

                default:
                    break;
            }
        }
    };

    bulletLoader(){
        if (this.spacePressed){
            if (this.angleCounter === 1){
                this.bulletAngle += this.bulletConst;
                if (this.bulletAngle === 20){
                    this.bulletConst *= -1;
                } else if (this.bulletAngle === -20) {
                    this.bulletConst *= -1;
                }
                this.angleCounter = 0;
            }
            this.angleCounter++;
        }

        if (this.bulletCooldown > 0) {
            //bullet cooldown setter
            if (this.counter === 50){
                this.bulletCooldown--;
                this.counter = 0;
            }
            this.counter++;
        }
    }

    shoot(){
        if (this.bulletCooldown === 0 || this.noReload) {
            this.angleCounter = 0;
            if (!this.noReload) this.bulletCooldown = 5;
            //let angle = (this.angle - 90 + Tools.getRndInteger(-20, 20)) * (Math.PI / 180); //test
            let angle = (this.angle - 90 + this.bulletAngle) * (Math.PI / 180);
            super.shoot(angle);

            this.bulletAngle = -20;
        }
    }


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
                    this.shoot();
                    this.spacePressed = false;
                    this.bulletConst = 1;
                    break;

                default:
                    break;
            }
        }
    };
}