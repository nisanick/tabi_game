import Spell from "./Spell";

export default class Fireball extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        this.effect = loader.getGameSprite('fireball');
        this.effect.width = 35;
        this.effect.height = 13;
        this.type = 'spell';
        this.hitArea = {x: 0,y: 0, width: 35, height: 13};

        this.container.addChild(this.effect);

        this.damageFrom = 20;
        this.damageTo = 25;
        this.cost = 5;
        this.sound = this.loader.soundLoader.fireball;
        this.effect.visible = false;
        if (this.figureType !== 'player'){
            this.effect.scale.x = -1;
        }
    }
}