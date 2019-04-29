import * as PIXI from "pixi.js"

export default class Window {
    constructor(loader, container, text) {
        let size = text.includes("\n") ? 30 : 60;
        this.text = new PIXI.Text(text, new PIXI.TextStyle({fill: "#AB9117", align: 'center', fontSize: size, fontWeight: 'bold', fontFamily: "Linepixels"}));
        this.loader = loader;
        this.gWindow = this.loader.getGameSprite('window');
        this.container = container;
        this.initHeight = 100;
        this.initWidth = 350;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;

        this.init();
    }

    init = () => {
        this.width = this.text.width >  this.initWidth ? this.initWidth + (this.initWidth - this.text.width + 40) : this.initWidth;
        this.height = this.text.height >  this.initHeight ? this.initHeight + (this.initHeight - this.text.height + 40) : this.initHeight;
        this.x = (this.loader.app.renderer.width / 2) - (this.width / 2);
        this.y = (this.loader.app.renderer.height / 2) - (this.height / 2);

        this.text.x = (this.loader.app.renderer.width / 2) - (this.text.width / 2);
        this.text.y = (this.loader.app.renderer.height / 2) - (this.text.height / 2);

        this.gWindow.x = this.x;
        this.gWindow.y = this.y;
        this.gWindow.width = this.width;
        this.gWindow.height = this.height;

        this.gWindow.visible = false;
        this.text.visible = false;
        this.container.addChild(this.gWindow);
        this.container.addChild(this.text);
    };

    showWindow = () => {
        this.gWindow.visible = true;
        this.text.visible = true;
    };

    hideWindow = () => {
        this.gWindow.visible = false;
        this.text.visible = false;
    }
}