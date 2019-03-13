import BasicBonus from "./BasicBonus";

export default class ReloadBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "reload";
        this.cooldown = 10;
        this.maxCooldown = 10;
        this.imgPath = "assets/dominik/bonus/reload.png";

        super.init();
    }

    getCopy(){
        return new ReloadBonus(this.level)
    }
}