import FightFigure from "./FightFigure";
import Tools from "../../tools/Tools";

export default class FightEnemy extends FightFigure {
    constructor(loader, x, y, container, area, game, type) {
        super(loader, x, y, container, area, game, type);

        this.hold = 7;
        this.holdCounter = 7;
        this.cooldown = 2;
        this.stay = false;
    }

    doMove() {
        this.setMoves();
        super.doMove();
    };

    setMoves = () => {
        if (this.stay) {
            this.moveX = 0;
            this.moveY = 0;
            if (this.holdCounter === this.hold) {
                this.stay = false;
                this.holdCounter = 0;
            } else {
                this.holdCounter++;
            }
        } else if (this.holdCounter === this.hold) {
            let x = Tools.getRndInteger(-5, 5);
            let y = Tools.getRndInteger(-5, 5);

            if (x > 0) this.moveX = 2;
            else if (x < 0) this.moveX = -2;
            else this.moveX = 0;

            if (y > 0) this.moveY = 2;
            else if (y < 0) this.moveY = -2;
            else this.moveY = 0;

            this.holdCounter = 0;
        } else {
            this.holdCounter++;
        }

        if (!this.stay) {
            this.stay = Tools.getRndInteger(0, 10) > 9;
            if (this.stay) {
                this.holdCounter = 0;
            }
        }
    };
}