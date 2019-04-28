import Spell from "./Spell";

export default class Fireblast extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        this.effect = loader.getGameSprite('fireblast');
        this.type = 'none';
    }
}