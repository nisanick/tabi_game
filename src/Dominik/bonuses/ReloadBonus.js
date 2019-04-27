import BasicBonus from "./BasicBonus";

export default class ReloadBonus extends BasicBonus {
    constructor(level){
        super(level);

        this.name = "reload";
        this.cooldown = 12;
        this.maxCooldown = 12;
        this.imgPath = "assets/dominik/bonus/reload.png";
        this.duration = 3;
        this.maxDuration = 3;

        super.init();
    }

    getCopy(){
        return new ReloadBonus(this.level)
    }

    initDesign(){

    }
}