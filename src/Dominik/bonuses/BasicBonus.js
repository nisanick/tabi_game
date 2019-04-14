import * as PIXI from "pixi.js";

export default class BasicBonus {

    constructor(level){
        this.spawnTime = 10;
        this.maxSpawnTime = 10;
        this.duration = 5;
        this.maxDuration = 5;
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.visible = false;
        this.imgPath = "";
        this.bonusTexture = {};
        this.level = level;
        this.levelStage = this.level.stage;
        this.loader = new PIXI.Loader();
        this.counter = 0;
        this.durationCounter = 0;
        this.name = "basic";
        this.design = {};
        this.available = true;

        this.active = false;
        this.take = false;
    }

    init(){
        this.loader
            .add(this.imgPath)
            .load(this.setup.bind(this));
    }

    setup(){
        this.bonusTexture = new PIXI.Sprite(this.loader.resources[this.imgPath].texture);
        this.bonusTexture.width = this.width;
        this.bonusTexture.height = this.height;
        this.bonusTexture.x = this.x;
        this.bonusTexture.y = this.y;
        this.bonusTexture.visible = false;
        this.levelStage.addChild(this.bonusTexture);
        this.initDesign();
    }

    initDesign(){}

    showDesign(figure){
        if (Object.keys(this.design).length > 0) {

        }
    }

    setVisiblity(visible){
        this.visible = visible;
        this.bonusTexture.visible = visible;
    }

    startCooldown(){
        this.spawnTime = this.maxSpawnTime;
        this.setVisiblity(false);

    }

    spawn(){
        if (this.spawnTime === 0 && !this.visible) {
            let point = this.level.getRandomSpawn(this.bonusTexture.width, this.bonusTexture.height);
            this.x = point.x;
            this.y = point.y;
            this.bonusTexture.x = this.x;
            this.bonusTexture.y = this.y;
            this.setVisiblity(true);
        } else if (!this.visible) {
            this.bonusLoader();
        }
    }

    bonusLoader(){
        if (this.spawnTime > 0) {
            //bullet cooldown setter
            if (this.counter === 50){
                this.spawnTime--;
                this.counter = 0;
            }
            this.counter++;
        }
    }

    getCopy(){
        return this;
    }

    startDuration(){
        this.duration = this.maxDuration;
    }

    durationLoader(){
        if (this.duration > 0) {
            //bullet cooldown setter
            if (this.durationCounter === 50){
                this.duration--;
                this.durationCounter = 0;
            }
            this.durationCounter++;
        }
    }


}