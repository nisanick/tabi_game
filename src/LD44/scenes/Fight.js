import BasicScene from "./BasicScene";
import * as PIXI from "pixi.js";
import FightPlayer from "./Figures/FightPlayer";
import FightEnemy from "./Figures/FightEnemy";

export default class Fight extends BasicScene {
    constructor(loader, game) {
        super(loader);
        this.game = game;
        this.panels = [];
        this.loader = loader;
        this.player = {};
        this.enemy = {};
        this.spells = [];
        this.loader.app.stage.addChild(this);
        this.fightPlayer = {};
        this.fightEnemy = {};

        this.fightArea = new PIXI.Container();
    }

    init = () => {
        let x = 0;
        let width = this.loader.app.stage.width / 2;
        let height = this.loader.app.stage.height - 353;
        for (let i = 0; i < 2; i++) {
            let fightPanel = this.loader.getGameSprite("frame_char");
            fightPanel.width = width;
            fightPanel.height = height;
            fightPanel.x = x;
            x += width;
            this.panels[i] = fightPanel;
            this.addChild(fightPanel);
        }

        let bg = this.loader.getGameSprite("bg_fight");
        bg.x = 0;
        bg.y = height;
        bg.width = this.loader.app.stage.width;
        bg.height = this.loader.app.stage.height - height;
        this.addChild(bg);

        let spellBar = this.loader.getGameSprite("frame_char");
        spellBar.x = 0;
        spellBar.y = this.loader.app.stage.height - 130;
        spellBar.height = this.loader.app.stage.height;
        spellBar.width = this.loader.app.stage.width;
        this.addChild(spellBar);


        this.player = this.loader.getGameSprite("player_full");
        this.player.x = 30;
        this.player.y = 20;
        this.player.scale.set(0.174);

        this.enemy = this.loader.getGameSprite("player_full");
        this.enemy.x = width + 30;
        this.enemy.y = 20;
        this.enemy.scale.set(0.174);

        x = 100;
        let moveX = 780 / 5;
        for (let i = 0; i < 5; i++) {
            let spell = new PIXI.Graphics();
            spell.beginFill(0x09FF00);
            spell.lineStyle(5, 0xa3a3a3, 1);
            spell.drawRect(x, spellBar.y + 50, 60, 60);

            this.spells.push();
            this.addChild(spell);
            x += moveX;
        }

        let area = {x: 0, y: height, width: this.loader.app.stage.width, height: spellBar.y};
        this.fightPlayer = new FightPlayer(this.loader, 20, height + 50, this.fightArea, area);
        this.fightEnemy = new FightEnemy(this.loader, this.loader.app.stage.width - 100, height + 50, this.fightArea, area, 'troll');

        this.addChild(this.player);
        this.addChild(this.enemy);
        this.addChild(this.fightArea);

    };

    setEnemy = (spriteName) => {
        this.enemy = this.loader.getGameSprite("spriteName");
        this.enemy.x = width + 30;
        this.enemy.y = 20;
        this.enemy.scale.set(0.174);
        this.addChild(this.enemy);
    };

    repaintScene = () => {
        this.fightPlayer.doMove();
    };
}