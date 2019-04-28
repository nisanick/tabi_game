import Tools from "../../tools/Tools";

export default class SpellAttack {
    constructor(container, figureType) {
        this.spell = {};

        this.container = container;
        this.figureType = figureType;
        this.pointFrom = {x: 0, y: 0};
        this.pointTo = {x: 0, y: 0};
        this.active = false;
        this.done = false;
        this.angle = 0;
        this.area = {};
        this.area.width = this.container.width;
        this.area.height = this.container.height;
        this.area.x = this.container.x;
        this.area.y = this.container.y;
    }

    setBounds(){
        this.spell.effect.x += this.moveX;
        this.spell.effect.y += this.moveY;
        this.spell.hitArea.x += this.moveX;
        this.spell.hitArea.y += this.moveY;
    }

    startCast = (pointFrom, pointTo, spell) => {
        this.done = false;
        this.spell = spell;
        this.pointFrom = pointFrom;
        this.pointTo = pointTo;
        this.active = true;
        if (this.figureType === 'player') {
            this.container.game.getPlayer().health -= this.spell.cost;
            this.spell.setPoint(pointFrom.x + 100, pointFrom.y);
        } else {
            this.container.game.getEnemy().health -= this.spell.cost;
            this.spell.setPoint(pointFrom.x, pointFrom.y);
        }
        this.spell.effect.visible = true;

        let a = Math.abs(this.pointTo.x - this.pointFrom.x);
        let b = Math.abs(this.pointTo.y - this.pointFrom.y);
        this.angle = Math.atan((a/b));
        console.log(this.angle);
    };

    checkCollision = () => {
        if (this.isWall()) {
            this.spell.effect.visible = false;
            this.active = false;
            this.done = true;
            console.log("som tu");
            return;
        }
        if (this.figureType === 'player') {
            if (Tools.collision(this.spell, this.container.fightEnemy)){
                if (!this.container.fightEnemy.shield) {
                    let damage = Tools.getRndInteger(this.spell.damageFrom, this.spell.damageTo);
                    if (Tools.getRndInteger(0, 100) > (100 - this.spell.critChance)) {
                        damage *= 2;
                    }

                    this.container.game.getEnemy().health -= damage;
                } else {
                    this.container.fightEnemy.removeShield();
                }
                this.spell.effect.visible = false;
                this.active = false;
                this.done = true;
            }
        } else {
            if (Tools.collision(this.spell, this.container.fightPlayer)){
                if (!this.container.fightEnemy.shield) {
                    let damage = Tools.getRndInteger(this.spell.damageFrom, this.spell.damageTo);
                    if (Tools.getRndInteger(0, 100) > (100 - this.spell.critChance)) {
                        damage *= 2;
                    }

                    this.container.game.getPlayer().health -= damage;
                } else {
                    this.container.fightPlayer.removeShield();
                }
                this.spell.effect.visible = false;
                this.active = false;
                this.done = true;
            }
        }
    };

    cast = () => {
        if (this.pointTo.x > this.pointFrom.x) {
            this.moveX = this.spell.flySpeed * Math.sin(this.angle);
        } else {
            this.moveX = -this.spell.flySpeed * Math.sin(this.angle);
        }

        if (this.pointTo.y > this.pointFrom.y) {
            this.moveY = this.spell.flySpeed * Math.cos(this.angle);
        } else {
            this.moveY = -this.spell.flySpeed * Math.cos(this.angle);
        }

        this.setBounds();
        this.checkCollision();
    };

    isWall = () => {
        if (this.spell.hitArea.x >= this.area.width || this.spell.hitArea.x <= this.area.x) {
            return true;
        }
        if (this.spell.hitArea.y >= this.area.height || this.spell.hitArea.y <= this.area.y) {
            return true;
        }

        return false;
    };
}