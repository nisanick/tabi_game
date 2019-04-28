import Spell from "./Spell";

export default class Thrown extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        this.effect = loader.getGameSprite('thrown');

        this.container.addChild(this.effect);

        this.effect.visible = false;
        if (this.figureType !== 'player'){
            this.effect.scale.x = -1;
        }
        this.type = 'spell';
        this.damageFrom = 1;
        this.damageTo = 5;
        this.cost = 0;
    }
}