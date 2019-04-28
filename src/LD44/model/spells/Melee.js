import Spell from "./Spell";

export default class Melee extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        //this.effect = loader.getGameSprite('fireblast');
        this.type = 'melee';

        this.damageFrom = 15;
        this.damageTo = 20;
        this.cost = 7;
    }
}