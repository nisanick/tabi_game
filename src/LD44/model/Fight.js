import BasicScene from "../scenes/BasicScene";
import * as PIXI from "pixi.js";

export default class Fight extends BasicScene {
    constructor(loader, game) {
        super(loader);
        this.game = game;
        this.panels = [];
    }

    init = () => {
        let x = 0;
        let width = this.loader.app.stage.width / 3;
        let height = this.loader.app.stage.height - 200;
        for (let i = 0; i < 3; i++) {
            let fightPanel = new PIXI.Graphics();
            fightPanel.lineStyle(5, 0xa3a3a3, 1);
            fightPanel.drawRect(x, 0, width, height);

            x += width;
            this.panels[i] = fightPanel;
            this.addChild(fightPanel);
        }
    };

    repaintScene = () => {

    };
}