import FightFigure from "./FightFigure";
import Tools from "../../tools/Tools";

export default class FightEnemy extends FightFigure {
    constructor(loader, x, y, container, area, game, type) {
        super(loader, x, y, container, area, game, type);

        this.hold = 7;
        this.holdCounter = 7;
        this.cooldown = 10;
        this.cdCounter = 0;
        this.stay = false;
    }

    doMove() {
        this.setMoves();
        super.doMove();
    };

    chooseAttack = () => {
        this.cdCounter = 0;
        let index = Tools.getRndInteger(0, this.game.getEnemy().availableSpells.length - 1);
        let x = Tools.getRndInteger(0, this.container.width / 2);
        let y = Tools.getRndInteger(this.container.y, this.container.height);

        this.selectSpell(this.game.getEnemy().availableSpells[index]);
        if (!this.casting) {
            if (this.selectedSpellIndex !== 0) {
                if (x > this.area.x && x < this.area.width) {
                    if (y > this.area.y && y < this.area.height) {
                        this.attackPointTo = {x, y};
                        this.attacking = true;
                    }
                }
            }
        }
    };

    setMoves = () => {
        let rnd = 0;
        if (this.cdCounter === this.cooldown){
            rnd = Tools.getRndInteger(0, 10);
        } else {
            this.cdCounter++;
        }

        if (rnd > 5){
            this.chooseAttack();
        } else {
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
                this.stay = Tools.getRndInteger(0, 10) > 8;
                if (this.stay) {
                    this.holdCounter = 0;
                }
            }
        }
    };
}