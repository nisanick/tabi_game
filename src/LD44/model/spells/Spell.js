
export default class Spell {
    constructor(loader, container, figureType){
        this.hitArea = {x: 0,y: 0, width: 0, height: 0};
        this.loader = loader;
        this.container = container;
        this.figureType = figureType;
        this.type = '';
        this.flySpeed = 15;
        this.moveX = 0;
        this.moveY = 0;
        this.effect = {};
        this.damageFrom = 10;
        this.damageTo = 15;
        this.critChance = 30;
        this.cooldown = 2;
        this.cost = 5;
    }

    setPoint = (x, y) => {
        this.effect.x = x;
        this.effect.y = y;
        this.hitArea.x = x;
        this.hitArea.y = y;
    };

    hide = () => {
        this.effect.visible = false;
    };

    getCost = () => {
        let cost = this.cost - ((this.container.game.getPlayer().getStats().cost / 100) * this.cost);
        return cost;
    };

    getDamage = () => {
        let damageFrom = this.damageFrom + ((this.container.game.getPlayer().getStats().damage / 100) * this.damageFrom);
        let damageTo = this.damageTo + ((this.container.game.getPlayer().getStats().damage / 100) * this.damageTo);

        return {damageFrom, damageTo};
    };
}