import BasicBonus from "./BasicBonus";

export default class FirstAidBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "firstaid";
        this.cooldown = 10;
        this.maxCooldown = 10;
        this.imgPath = "assets/dominik/bonus/firstaid.png";
        this.duration = 0;
        this.maxDuration = 0;

        super.init();
    }

    getCopy(){
        return new FirstAidBonus(this.level)
    }
}