import Tools from "../../tools/Tools";

export default class MeleeAttack {
    constructor(figure) {
        this.figure = figure;
        this.pointFrom = {x: 0, y: 0};
        this.pointTo = {x: 0, y: 0};
        this.onPoint = false;
        this.chargeSpeed = 15;
        this.charging = false;
        this.goingBack = false;
        this.done = false;
        this.active = false;
        this.spell = {};
    }

    startAttack = (pointFrom, pointTo, spell) => {
        this.pointFrom = pointFrom;
        this.spell = spell;
        let area = this.figure.area;
        this.pointTo = pointTo;
        if (this.figure.type === 'player') {
            this.pointTo.x = this.pointTo.x - (this.figure.hitArea.width / 2);
            this.figure.container.game.getPlayer().health -= this.spell.cost;
        } else {
            this.pointTo.x = this.pointTo.x + (this.figure.hitArea.width / 2);
            this.figure.container.game.getEnemy().health -= this.spell.cost;
        }

        if (pointTo.y  > (area.height - 100) && pointTo.y < (area.height)){
            this.pointTo.y = area.height - 100;
        }
        if (pointTo.x > (area.width - 80) && pointTo.x < (area.width)) {
            this.pointTo.x = area.width - 80;
        }
        this.active = true;
    };

    setMoves = (xTo, xFrom, yTo, yFrom) => {
        let moveX = 0;
        let moveY = 0;

        if (xTo > xFrom) {
            let diff = xTo - xFrom;
            if (diff > this.chargeSpeed) {
                moveX = this.chargeSpeed;
            } else {
                moveX = diff;
            }
        } else {
            let diff = xTo - xFrom;
            if (diff < (-this.chargeSpeed)) {
                moveX = -this.chargeSpeed;
            } else {
                moveX = diff;
            }
        }

        if (yTo > yFrom) {
            let diff = yTo - yFrom;
            if (diff > this.chargeSpeed) {
                moveY = this.chargeSpeed;
            } else {
                moveY = diff;
            }
        } else {
            let diff = yTo - yFrom;
            if (diff < (-this.chargeSpeed)) {
                moveY = -this.chargeSpeed;
            } else {
                moveY = diff;
            }
        }

        if (moveX === 0 && moveY === 0) {
            if (this.goingBack) {
                this.done = true;
            }

            if (this.figure.type === 'player') {
                if (Tools.collision(this.figure, this.figure.container.fightEnemy)) {
                    if (!this.figure.container.fightEnemy.shield) {
                        let damage = Tools.getRndInteger(this.spell.damageFrom, this.spell.damageTo);
                        if (Tools.getRndInteger(0, 100) > (100 - this.spell.critChance)) {
                            damage *= 2;
                        }

                        this.figure.loader.game.getEnemy().health -= damage;
                    } else {
                        this.figure.container.fightEnemy.removeShield();
                    }
                }
            } else {
                if (Tools.collision(this.figure, this.figure.container.fightPlayer)) {
                    if (!this.figure.container.fightPlayer.shield) {
                        let damage = Tools.getRndInteger(this.spell.damageFrom, this.spell.damageTo);
                        if (Tools.getRndInteger(0, 100) > (100 - this.spell.critChance)) {
                            damage *= 2;
                        }
                        this.figure.loader.game.getPlayer().health -= damage;
                        console.log(this.figure.loader.game.getPlayer().health);
                    } else {
                        this.figure.container.fightPlayer.removeShield();
                    }
                }
            }

            if (this.charging) {
                this.onPoint = true;
                this.charging = false;
                this.goingBack = true;
            }
        }

        this.figure.moveX = moveX;
        this.figure.moveY = moveY;
    };

    goBack = (actualPoint) => {
        let xTo = parseInt(this.pointFrom.x);
        let yTo = parseInt(this.pointFrom.y);
        let xFrom = parseInt(actualPoint.x);
        let yFrom = parseInt(actualPoint.y);
        this.goingBack = true;

        this.setMoves(xTo, xFrom, yTo, yFrom)
    };

    charge = (actualPoint) => {
        let xTo = parseInt(this.pointTo.x);
        let yTo = parseInt(this.pointTo.y);
        let xFrom = parseInt(actualPoint.x);
        let yFrom = parseInt(actualPoint.y);
        this.charging = true;

        this.setMoves(xTo, xFrom, yTo, yFrom)
    };

    reset = () => {
        this.onPoint = false;
        this.charging = false;
        this.goingBack = false;
        this.done = false;
        this.active = false;
    }
}