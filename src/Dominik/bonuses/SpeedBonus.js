import BasicBonus from "./BasicBonus";

export default class SpeedBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "speed";
        this.cooldown = 7;
        this.maxCooldown = 7;
        this.imgPath = "assets/dominik/bonus/speed.png";

        super.init();
    }

    getCopy(){
        return new SpeedBonus(this.level)
    }
}