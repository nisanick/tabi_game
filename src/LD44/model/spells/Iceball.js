import Spell from "./Spell";

export default class Iceball extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        this.effect = loader.getGameSprite('iceball');
        this.effect.width = 35;
        this.effect.height = 13;
        this.type = 'spell';
        this.hitArea = {x: 0,y: 0, width: 35, height: 13};
        this.type = 'spell';

        this.container.addChild(this.effect);

        this.damageFrom = 10;
        this.damageTo = 15;
        this.cost = 2;

        this.effect.visible = false;
        if (this.figureType !== 'player'){
            this.effect.scale.x = -1;
        }
    }
}