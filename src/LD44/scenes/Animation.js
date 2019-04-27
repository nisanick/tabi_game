export default class Animation {
    constructor(loader, spriteName, action, container, bounds) {
        this.sprite = [];
        this.spriteName = spriteName;
        this.action = action;
        this.loader = loader;
        this.counter = 4;
        this.spriteIndex = 0;
        this.counterLimit = 4;
        this.container = container;
        this.bounds = bounds;
    }

    init = () => {
        let amount = 0;
        if (this.action === 'walk')
            amount = 8;
        else if (this.action === 'attack')
            amount = 3;

        for (let i = 0; i < amount; i++) {
            this.sprite[i] = this.loader.getGameSprite(this.spriteName + "_" + this.action + (i + 1));
            this.sprite[i].visible = false;
            this.sprite[i].x = this.bounds.x;
            this.sprite[i].y = this.bounds.y;
            this.sprite[i].width = this.bounds.width;
            this.sprite[i].height = this.bounds.height;
            if (this.spriteName !== 'player'){
                this.sprite[i].scale.x = -1;
            }
            this.container.addChild(this.sprite[i]);
        }
    };

    animate = (bounds) => {
        if (this.counter === this.counterLimit){
            this.hideSprites();
            this.sprite[this.spriteIndex].x = bounds.x;
            this.sprite[this.spriteIndex].y = bounds.y;
            this.sprite[this.spriteIndex].visible = true;
            this.spriteIndex++;
            if (this.spriteIndex >= this.sprite.length - 1){
                this.spriteIndex = 0;
            }

            this.counter = 0;
        } else {
            this.counter++;
        }
    };

    hideSprites = () => {
        this.sprite.forEach(sprite => {
            sprite.visible = false;
        })
    };

    isLastIndex = () => {
       return this.spriteIndex === (this.sprite.length - 1)
    };

    stopAnimate = () => {
        this.counter = this.counterLimit;
        this.hideSprites();
    }
}