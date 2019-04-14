import BasicBonus from "./BasicBonus";

export default class ShotgunBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "shotgun";
        this.cooldown = 15;
        this.maxCooldown = 15;
        this.width = 45;
        this.height = 25;
        this.imgPath = "assets/dominik/bonus/shotgun.png";

        super.init();

    }

    getCopy(){
        return new ShotgunBonus(this.level)
    }
}