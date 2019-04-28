import Spell from "./Spell";

export default class Shield extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        this.effect = loader.getGameSprite('shield');
        this.type = 'shield';

        this.container.addChild(this.effect);

        this.effect.visible = false;
        if (this.figureType !== 'player'){
            this.effect.scale.x = -1;
        }
    }
}