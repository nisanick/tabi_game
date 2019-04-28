import Spell from "./Spell";

export default class Shield extends Spell {
    constructor(loader, container, figureType) {
        super(loader, container, figureType);
        this.effect = loader.getGameSprite('shield');
        this.type = 'shield';

        this.container.addChild(this.effect);

        this.effect.width = 100;
        this.effect.height = 100;
        this.effect.visible = false;
        if (this.figureType !== 'player'){
            this.effect.scale.x = -1;
        }
        this.cost = 10;
    }

    initShield = (x, y) => {
        if (this.figureType === 'player') {
            this.container.game.getPlayer().health -= this.cost;
        } else {
            this.container.game.getEnemy().health -= this.cost;
        }
        this.effect.x = x - 15;
        this.effect.y = y - 5;
        this.effect.visible = true;
    }

    showShield = (x, y) => {
        this.effect.x = x - 15;
        this.effect.y = y - 5;
    };

    hideShield = () => {
        this.effect.visible = false;
    }
}