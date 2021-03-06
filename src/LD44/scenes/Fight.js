import BasicScene from "./BasicScene";
import * as PIXI from "pixi.js";
import FightPlayer from "./figures/FightPlayer";
import FightEnemy from "./figures/FightEnemy";
import HealthBar from "./figures/HealthBar";
import SpellIcon from "./SpellIcon";
import Window from "./Window"

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
        this.area = {};
        this.moveEnabled = true;

        this.imgContainer = new PIXI.Container();
        this.windowContainer = new PIXI.Container();

        this.enemyHealthBar = {};
        this.playerHealthBar = {};
        this.selectedSpells = [];
        this.winWindowEmpty = new Window(loader, this.windowContainer, 'You Won', 30);
        this.winWindowLoot = new Window(loader, this.windowContainer, 'You Won\nYou find loot!', 30);
        this.loseWindow = new Window(loader, this.windowContainer, 'You Lose', 30);
        this.readyBtn = {};
        this.ready = false;
    }

    init = () => {
        let x = 0;
        let width = this.loader.app.renderer.width / 2;
        let height = this.loader.app.renderer.height - 353;
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
        bg.width = this.loader.app.renderer.width;
        bg.height = this.loader.app.renderer.height - height;
        this.addChild(bg);

        let spellBar = this.loader.getGameSprite("frame_char");
        spellBar.x = 0;
        spellBar.y = this.loader.app.renderer.height - 130;
        spellBar.height = this.loader.app.renderer.height;
        spellBar.width = this.loader.app.renderer.width;
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
        let spellIcons = ['melee_attack', 'fireball', 'iceball', 'thrown', 'shield'];
        for (let i = 0; i < spellIcons.length; i++) {
            let spellCase = new PIXI.Graphics();
            spellCase.lineStyle(5, 0xa3a3a3, 1);
            spellCase.drawRect(x - 5, spellBar.y + 50 - 5, 60 + 10, 60 + 10);

            let spellSelected = this.loader.getGameSprite("selected");
            spellSelected.width = 70;
            spellSelected.height = 70;
            spellSelected.x = x - 5;
            spellSelected.y = spellBar.y + 50 - 5;
            spellSelected.visible = false;
            this.selectedSpells[i] = spellSelected;

            let spell = new SpellIcon(this.loader.spriteLoader.resources[spellIcons[i] + "_icon"].texture, spellIcons[i]);
            spell.width = 60;
            spell.height = 60;
            spell.x = x;
            spell.y = spellBar.y + 50;
            spell.interactive = true;
            spell.on('click', () => {
                this.fightPlayer.selectSpell(i);
            });
            spell.on("mouseover", this.loader.mouseover);
            spell.on("mouseout", this.loader.mouseout);

            this.spells.push();
            this.addChild(spellCase);
            this.addChild(spell);
            this.addChild(spellSelected);
            x += moveX + 4;
        }

        this.area = {x: 0, y: height, width: this.loader.app.renderer.width, height: spellBar.y};
        this.fightPlayer = new FightPlayer(this.loader, 20, height + 50, this, this.area, this.game);


        this.readyBtn = this.loader.getGameSprite('ready_btn');
        this.readyBtn.x = (this.loader.app.renderer.width / 2) - (this.readyBtn.width / 2);
        this.readyBtn.y = (this.loader.app.renderer.height / 2) - (this.readyBtn.height / 2);
        this.readyBtn.interactive = true;
        this.readyBtn.on('click', () => {
            this.readyBtn.visible = false;
            this.readyText.visible = false;
            this.ready = true;
        });
        this.readyText = new PIXI.Text("Start", new PIXI.TextStyle({fill: "black", fontSize: 40, fontFamily: "Linepixels"}));
        this.readyText.x = (this.loader.app.renderer.width / 2) - (this.readyText.width / 2);
        this.readyText.y = (this.loader.app.renderer.height / 2) - (this.readyText.height / 2);

        this.imgContainer.addChild(this.player);
        this.imgContainer.addChild(this.enemy);
        this.addChild(this.imgContainer);
        this.loader.app.stage.addChild(this.windowContainer);
        this.enemyHealthBar = new HealthBar(this, this.enemy.x - 1, height - 70, this.player.width, 25);
        this.playerHealthBar = new HealthBar(this, this.player.x - 1, height - 70, this.player.width, 25);

        this.addChild(this.readyBtn);
        this.addChild(this.readyText);
        this.enemyHealthBar.setHealth(100);
        this.playerHealthBar.setHealth(100);

    };

    setEnemy = (spriteName) => {
        this.enemy = this.loader.getGameSprite(spriteName);
        this.enemy.x = width + 30;
        this.enemy.y = 20;
        this.enemy.scale.set(0.174);
        this.addChild(this.enemy);
    };

    initEnemy = () => {
        let height = this.loader.app.renderer.height - 353;
        this.fightEnemy = new FightEnemy(this.loader, this.loader.app.renderer.width - 100, height + 50, this, this.area, this.game, this.game.getEnemy().name);
        let x = this.enemy.x;
        let y = this.enemy.y;
        this.enemy.visible = false;

        this.enemy = this.loader.getGameSprite(this.game.getEnemy().name + "_full");
        this.enemy.x = x;
        this.enemy.y = y;
        this.enemy.scale.set(0.174);
        this.enemy.visible = true;
        this.imgContainer.addChild(this.enemy);
    };

    clear = () => {
        this.fightPlayer.staySprite.visible = false;
        this.fightPlayer.animDie.stopAnimate();
        this.fightPlayer.animWalk.stopAnimate();
        this.fightPlayer.animAttack.stopAnimate();
        this.fightEnemy.staySprite.visible = false;
        this.fightEnemy.animDie.stopAnimate();
        this.fightEnemy.animWalk.stopAnimate();
        this.fightEnemy.animAttack.stopAnimate();

        let height = this.loader.app.renderer.height - 353;
        this.fightPlayer = new FightPlayer(this.loader, 20, height + 50, this, this.area, this.game);
    };

    enableReadyButton = () => {
        this.readyBtn.visible = true;
        this.readyText.visible = true;
        this.ready = false;
    };

    repaintScene = () => {
        if (this.ready) {
            this.fightPlayer.doMove();
            this.fightEnemy.doMove();
            this.enemyHealthBar.setHealth(this.game.getEnemy().health);
            this.playerHealthBar.setHealth(this.game.getPlayer().getHealth());
        }
    };
}