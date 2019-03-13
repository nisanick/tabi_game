import BasicBonus from "./BasicBonus";

export default class SpeedBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "speed";
        this.cooldown = 10;
        this.maxCooldown = 10;
        this.imgPath = "assets/dominik/bonus/speed.png";

        super.init();
    }

    getCopy(){
        return new SpeedBonus(this.level)
    }
}