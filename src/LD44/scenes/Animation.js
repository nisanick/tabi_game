import * as PIXI from "pixi.js";


export default class Animation {
    constructor(loader, spriteName, action, container, bounds, repeat) {
        this.sprite = [];
        this.spriteName = spriteName;
        this.action = action;
        this.loader = loader;
        this.counter = 2;
        this.spriteIndex = 0;
        this.counterLimit = 2;
        this.container = container;
        this.bounds = bounds;
        this.done = false;
        this.repeat = repeat;
    }

    init = () => {
        let amount = 0;
        if (this.action === 'walk')
            amount = 8;
        else if (this.action === 'attack')
            amount = 3;
        else if (this.action === 'die')
            amount = 3;


        for (let i = 0; i < amount; i++) {
            this.sprite[i] = this.loader.getGameSprite(this.spriteName + "_" + this.action + (i + 1));
            let rectangle = new PIXI.Rectangle((this.sprite[i].width / 2) - (192 / 2), (this.sprite[i].height / 2) - (192 / 2), 192, 192);
            this.sprite[i] = PIXI.Sprite.from(new PIXI.Texture(this.sprite[i].texture, rectangle));
            this.sprite[i].visible = false;
            this.sprite[i].x = this.bounds.x;
            this.sprite[i].y = this.bounds.y;
            this.sprite[i].width = this.bounds.width;
            this.sprite[i].height = this.bounds.height;
            if (this.spriteName !== 'player') {
                this.sprite[i].scale.x = -1;
            }
            this.container.addChild(this.sprite[i]);
        }
    };

    animate = (bounds) => {
        if (this.counter === this.counterLimit) {
            this.hideSprites();
            this.sprite[this.spriteIndex].x = bounds.x;
            this.sprite[this.spriteIndex].y = bounds.y;
            if (this.spriteName !== 'player') {
                this.sprite[this.spriteIndex].scale.x = -1;
            }
            this.sprite[this.spriteIndex].visible = true;
            this.spriteIndex++;

            if (this.spriteIndex > this.sprite.length - 1) {
                this.spriteIndex = 0;
                if (!this.repeat) {
                    this.done = true;
                    if (this.action !== 'die') {
                        this.stopAnimate();
                    }
                    return;
                }
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

    isDone = () => {
        return this.done;
    };

    isLastIndex = () => {
        return this.spriteIndex === (this.sprite.length - 1)
    };

    stopAnimate = () => {
        this.counter = this.counterLimit;
        this.hideSprites();
    }
}