import Animation from "../Animation";

export default class FightFigure {
    constructor(loader, x, y, container, area, type) {
        this.bounds = {x: x, y: y, width: 192, height: 192};
        this.hitArea = {x: x + 60, y: y + 55, width: 192 - 100, height: 192 - 100};
        this.loader = loader;
        this.container = container;
        this.staySprite = this.loader.getGameSprite(type + "_stay");
        this.staySprite.x = this.bounds.x;
        this.staySprite.y = this.bounds.y;
        this.staySprite.width = this.bounds.width;
        this.staySprite.height = this.bounds.height;

        if (type !== 'player'){
            this.staySprite.scale.x = -1;
        }

        this.container.addChild(this.staySprite);
        this.animWalk = new Animation(this.loader, type, "walk", container, this.bounds);
        this.animWalk.init();
        this.animAttack = new Animation(this.loader, type, "attack", container, this.bounds);
        this.animAttack.init();

        this.walking = false;
        this.moveConstant = 2;
        this.moveX = 0;
        this.moveY = 0;

        this.area = area;
    }

    doMove = () => {
        if (this.moveX !== 0 || this.moveY !== 0) {
            if (this.canMove()) {
                this.walk();
                this.walking = true;
                this.setBounds();
                this.staySprite.visible = false;
            } else {
                this.stopWalk();
                this.staySprite.visible = true;
            }
        } else if (this.walking){
            this.stopWalk();
            this.staySprite.visible = true;
            this.walking = false;
        }
    };

    setBounds = () => {
        this.bounds.x += this.moveX;
        this.bounds.y += this.moveY;
        this.hitArea.x += this.moveX;
        this.hitArea.y += this.moveY;
        this.staySprite.x += this.moveX;
        this.staySprite.y += this.moveY;
    };

    canMove = () => {
        if ((this.hitArea.x + this.moveX) <= this.area.x || (this.hitArea.x + this.moveX) >= ((this.area.width / 2) - this.hitArea.width)) {
            this.moveX = 0;
        }
        if ((this.hitArea.y + this.moveY) <= this.area.y || (this.hitArea.y + this.moveY) >= (this.area.height - this.hitArea.height)) {
            this.moveY = 0;
        }

        return (this.moveX !== 0 || this.moveY !== 0);
    };

    attack = () => {
        this.animAttack.animate(this.bounds);
    };

    stopAttack = () => {
        this.animAttack.stopAnimate();
    };

    walk = () => {
        this.animWalk.animate(this.bounds);
    };

    stopWalk = () => {
        this.animWalk.stopAnimate();
    };
}