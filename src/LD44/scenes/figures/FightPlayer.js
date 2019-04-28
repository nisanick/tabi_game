import FightFigure from "./FightFigure";

export default class FightPlayer extends FightFigure {
    constructor(loader, x, y, container, area, game) {
        super(loader, x, y, container, area, game, 'player');

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
        this.container.interactive = true;
        this.container.on('click', this.onClick);
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

                case "1":
                case "+":
                    this.selectSpell(0);
                    break;

                case "2":
                case "ľ":
                    this.selectSpell(1);
                    break;

                case "3":
                case "š":
                    this.selectSpell(2);
                    break;

                case "4":
                case "č":
                    this.selectSpell(3);
                    break;

                case "5":
                case "ť":
                    this.selectSpell(4);
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

    selectSpell = (index) => {
        if (!this.casting && !this.attacking) {
            this.selectedSpellIndex = index + 1;
            for (let i = 0; i < this.container.selectedSpells.length; i++) {
                this.container.selectedSpells[i].visible = false;
            }

            this.container.selectedSpells[index].visible = true;
        }
    };

    onClick = (e) => {
        let x = e.data.global.x;
        let y = e.data.global.y;

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
}