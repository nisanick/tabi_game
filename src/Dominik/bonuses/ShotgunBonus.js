import BasicBonus from "./BasicBonus";

export default class ShotgunBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "shotgun";
        this.cooldown = 20;
        this.maxCooldown = 20;
        this.imgPath = "assets/dominik/bonus/shotgun.png";

        super.init();
    }

    getCopy(){
        return new ShotgunBonus(this.level)
    }
}