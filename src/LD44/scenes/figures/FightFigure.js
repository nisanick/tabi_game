import Animation from "../Animation";
import * as PIXI from "pixi.js";
import MeleeAttack from "../attack/MeleeAttack";
import SpellAttack from "../attack/SpellAttack";
import Melee from "../../model/spells/Melee";
import Fireball from "../../model/spells/Fireball";
import Iceball from "../../model/spells/Iceball";
import Thrown from "../../model/spells/Thrown";
import Shield from "../../model/spells/Shield";

export default class FightFigure {
    constructor(loader, x, y, container, area, game, type) {
        this.bounds = {x: x, y: y, width: 192, height: 192};
        this.type = type;
        this.game = game;
        this.hitArea = {};
        if (type === 'player') {
            this.hitArea = {x: x + 60, y: y + 55, width: 192 - 100, height: 192 - 100};
        } else {
            this.hitArea = {x: x - 145, y: y + 45, width: 192 - 100, height: 192 - 90};
        }
        this.loader = loader;
        this.container = container;
        this.staySprite = this.loader.getGameSprite(type + "_stay");
        let rectangle = new PIXI.Rectangle((this.staySprite.width / 2) - (192 / 2), (this.staySprite.height / 2) - (192 / 2), 192, 192);
        this.staySprite = PIXI.Sprite.from(new PIXI.Texture(this.staySprite.texture, rectangle));
        this.staySprite.x = this.bounds.x;
        this.staySprite.y = this.bounds.y;
        this.staySprite.width = this.bounds.width;
        this.staySprite.height = this.bounds.height;
        this.health = 100;
        if (type !== 'player'){
            this.staySprite.scale.x = -1;
        }

        this.container.addChild(this.staySprite);
        this.animWalk = new Animation(this.loader, type, "walk", container, this.bounds, true);
        this.animWalk.init();
        this.animAttack = new Animation(this.loader, type, "attack", container, this.bounds, false);
        this.animAttack.init();
        this.animDie = new Animation(this.loader, type, "die", container, this.bounds, false);
        this.animDie.init();

        this.dead = false;
        this.attacking = false;
        this.spellFlying = false;
        this.walking = false;
        this.dying = false;
        this.moveConstant = 2;
        this.moveX = 0;
        this.moveY = 0;

        this.meleeAttack = new MeleeAttack(this);
        this.spellAttack = new SpellAttack(this, container, type);

        this.attackPointTo = {x: 0, y:0};
        this.selectedSpell = [];
        this.selectedSpell[0] = new Melee(loader, container, type);
        this.selectedSpell[1] = new Fireball(loader, container, type);
        this.selectedSpell[2] = new Iceball(loader, container, type);
        this.selectedSpell[3] = new Thrown(loader, container, type);
        this.selectedSpell[4] = new Shield(loader, container, type);
        this.selectedSpellIndex = 0;

        this.casting = false;
        this.shield = false;
        this.shieldCounter = 0;
        this.area = area;
    }

    getHealth = () => {
        if (this.type === 'player'){
            return this.game.getPlayer().health;
        } else {
            return this.game.getEnemy().health;
        }
    };

    doMeleeAttack = () => {
        if (!this.meleeAttack.active) {
            this.meleeAttack.startAttack({x: this.hitArea.x, y: this.hitArea.y}, this.attackPointTo, this.selectedSpell[this.selectedSpellIndex - 1]);
        }

        if (!this.meleeAttack.onPoint) {
            if (!this.meleeAttack.done && !this.meleeAttack.charging && !this.meleeAttack.goingBack) {
                this.meleeAttack.charge({x: this.hitArea.x, y: this.hitArea.y});
                this.staySprite.visible = false;
                this.walk();
            } else if (this.meleeAttack.charging) {
                this.meleeAttack.charge({x: this.hitArea.x, y: this.hitArea.y});
                this.staySprite.visible = false;
                this.walk();
            } else if (this.meleeAttack.goingBack){
                this.meleeAttack.goBack({x: this.hitArea.x, y: this.hitArea.y});
                this.staySprite.visible = false;
                this.walk();
            }

            this.setBounds();
        } else {
            this.stopWalk();
            this.staySprite.visible = false;
            this.attack();
            if (this.animAttack.isDone()) {
                this.meleeAttack.onPoint = false;
                this.staySprite.visible = true;
                this.animAttack.done = false;
            }
        }

        if (this.meleeAttack.done){
            this.stopWalk();
            this.staySprite.visible = true;
            this.meleeAttack.reset();
            this.attacking = false;
        }
    };

    doSpellAttack = () => {
        if (!this.spellAttack.done) {
            this.casting = true;
            if (!this.spellAttack.active) {
                this.spellAttack.startCast({
                    x: this.hitArea.x,
                    y: this.hitArea.y
                }, this.attackPointTo, this.selectedSpell[this.selectedSpellIndex - 1]);
            } else {
                if (!this.spellAttack.done) {
                    this.spellAttack.cast();
                } else {
                    this.attacking = false;
                    this.spellFlying = false;
                }
            }

            if (!this.spellFlying) {
                if (this.animAttack.isDone()) {
                    this.attacking = false;
                    this.spellFlying = true;
                    this.staySprite.visible = true;
                    this.animAttack.done = false;
                } else {
                    this.stopWalk();
                    this.staySprite.visible = false;
                    this.attack();
                }
            }
        } else {
            this.staySprite.visible = true;
            this.attacking = false;
            this.spellFlying = false;
            this.casting = false;
        }
    };

    doAttack = () => {
        if (this.selectedSpell[this.selectedSpellIndex - 1].type === 'melee') {
            this.doMeleeAttack();
        } else if (this.selectedSpell[this.selectedSpellIndex - 1].type === 'spell'){
            this.spellAttack.done = false;
            this.doSpellAttack();
        } else if (this.selectedSpell[this.selectedSpellIndex - 1].type === 'shield'){
            this.shield = true;
            this.selectedSpell[this.selectedSpellIndex - 1].initShield(this.hitArea.x, this.hitArea.y);
            this.attacking = false;

        }
    };

    doMove() {
        if (!this.dead) {
            if (this.dying || this.getHealth() <= 0) {
                this.stopWalk();
                this.hideAll();
                this.attacking = false;
                this.animAttack.stopAnimate();
                this.staySprite.visible = false;
                this.dying = true;
                this.die();
                if (this.animDie.isDone()) {
                    this.dead = true;
                    this.animDie.done = false;
                }
            } else if (this.attacking){
                this.doAttack();
            } else {
                if (this.spellFlying) {
                    this.doSpellAttack();
                }

                if (this.moveX !== 0 || this.moveY !== 0) {
                    if (this.canMove()) {
                        this.walk();
                        this.walking = true;
                        this.setBounds();
                        this.staySprite.visible = false;
                    } else {
                        this.stopWalk();
                        this.staySprite.visible = true;
                    }
                } else if (this.walking) {
                    this.stopWalk();
                    this.staySprite.visible = true;
                    this.walking = false;
                }

                if (this.shield) {
                    this.checkShield();
                }
            }
        }
    };

    setBounds = () => {
        this.bounds.x += this.moveX;
        this.bounds.y += this.moveY;
        this.hitArea.x += this.moveX;
        this.hitArea.y += this.moveY;
        this.staySprite.x += this.moveX;
        this.staySprite.y += this.moveY;
    };

    canMove = () => {
        if (this.type === 'player') {
            if ((this.hitArea.x + this.moveX) <= this.area.x || (this.hitArea.x + this.moveX) >= ((this.area.width / 2) - this.hitArea.width)) {
                this.moveX = 0;
            }
        } else {
            if ((this.hitArea.x + this.moveX) <= (this.area.width / 2) || (this.hitArea.x + this.moveX) >= (this.area.width - this.hitArea.width)) {
                this.moveX = 0;
            }
        }
        if ((this.hitArea.y + this.moveY) <= this.area.y || (this.hitArea.y + this.moveY) >= (this.area.height - this.hitArea.height)) {
            this.moveY = 0;
        }

        return (this.moveX !== 0 || this.moveY !== 0);
    };

    checkShield = () => {
        if (this.shieldCounter >= 100){
            this.removeShield();
        } else {
            this.selectedSpell[this.selectedSpellIndex - 1].showShield(this.hitArea.x, this.hitArea.y);
            this.shieldCounter++;
        }
    };

    removeShield = () => {
        this.shieldCounter = 0;
        this.shield = false;
        this.selectedSpell[this.selectedSpellIndex - 1].hideShield();
        this.container.selectedSpells[this.selectedSpellIndex - 1].visible = false;
        this.selectedSpellIndex = 0;
    };

    attack = () => {
        this.animAttack.animate(this.bounds);
    };

    walk = () => {
        this.animWalk.animate(this.bounds);
    };

    stopWalk = () => {
        this.animWalk.stopAnimate();
    };

    die = () => {
        this.animDie.animate(this.bounds);
    };

    hideAll = () => {
        for (let i = 0; i < this.selectedSpell.length - 1; i++) {
            this.selectedSpell[i].hide();
        }
    };


    selectSpell = (index) => {
        if (!this.casting && !this.attacking && !this.shield) {
            this.selectedSpellIndex = index + 1;
            if (this.type === 'player') {
                for (let i = 0; i < this.container.selectedSpells.length; i++) {
                    this.container.selectedSpells[i].visible = false;
                }

                this.container.selectedSpells[index].visible = true;
            }
            if (this.selectedSpell[index].type === 'shield') {
                this.attacking = true;
            }
        };
    };

}