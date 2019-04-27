import BasicBonus from "./BasicBonus";

export default class ShieldBonus extends BasicBonus {
    constructor(level){
        super(level);

        super.name = "shield";
        super.cooldown = 7;
        super.maxCooldown = 7;
        super.duration = 10;
        super.maxDuration = 10;
        super.imgPath = "assets/dominik/bonus/shield.png";

        super.init();
    }

    getCopy(){
        return new ShieldBonus(this.level)
    }
}