import * as PIXI from "pixi.js";

export default class Menu {
    constructor(/*Dominik*/mainWindow) {
        this.mainWindow = mainWindow;
        this.menuContainer = new PIXI.Container();
        this.menuContainer.zIndex = 100;
        this.mainWindow.panelStage.addChild(this.menuContainer);
        this.startText = {};
        this.initMenu();
        window.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event && event.key) {
            let key = event.key;
            switch (key) {
                case "Escape":
                case "Esc":
                    this.mainWindow.pause();
                    this.showMenu();
                    break;

                default:
                    break;
            }
        }
    };

    showMenu() {
        if (!this.mainWindow.gameStarted) {
            this.startText.text = "New Game";
            this.startText.position.set(393, 340);
        } else {
            this.startText.text = "Continue";
            this.startText.position.set(400, 340);
        }

        let children = this.menuContainer.children;
        if (this.mainWindow.paused) {
            children.forEach((obj) =>{
                obj.visible = true;
            });
        } else {
            children.forEach((obj) =>{
                obj.visible = false;
            });
        }
    }

    continue(){
        if (!this.mainWindow.gameStarted){
            this.mainWindow.start();
            this.showMenu();
        } else {
            this.mainWindow.pause();
            this.showMenu();
        }
    }

    restart(){
        this.mainWindow.restart();
        this.mainWindow.paused = false;
        this.showMenu();
    }

    initMenu() {
        let menu = new PIXI.Graphics();
        menu.lineStyle(5, 0x777777, 1);
        menu.beginFill(0x5b5b5b);
        menu.drawRoundedRect(300, 240, 300, 400, 30);
        menu.endFill();
        menu.x = 0;
        menu.y = 0;
        menu.visible = false;
        this.menuContainer.addChild(menu);

        let menuText = new PIXI.Text("Tabi Game - Menu", new PIXI.TextStyle({fill: "black", font: "20px bold"}));
        menuText.position.set(555 - menuText.width, 270);
        menuText.visible = false;
        this.menuContainer.addChild(menuText);

        let btnContinue = new PIXI.Graphics();
        btnContinue.lineStyle(5, 0xa3a3a3, 1);
        btnContinue.beginFill(0x848484);
        btnContinue.drawRoundedRect(350, 330, 200, 50, 10);
        btnContinue.endFill();
        btnContinue.x = 0;
        btnContinue.y = 0;
        btnContinue.visible = false;
        btnContinue.interactive = true;
        btnContinue.on("mousedown", this.continue.bind(this));
        this.menuContainer.addChild(btnContinue);

        this.startText = new PIXI.Text("Continue", new PIXI.TextStyle({fill: "black", font: "15px bold"}));
        this.startText.position.set(400, 340);
        this.startText.visible = false;
        this.menuContainer.addChild(this.startText);

        let btnRestart = new PIXI.Graphics();
        btnRestart.lineStyle(5, 0xa3a3a3, 1);
        btnRestart.beginFill(0x848484);
        btnRestart.drawRoundedRect(350, 410, 200, 50, 10);
        btnRestart.endFill();
        btnRestart.x = 0;
        btnRestart.y = 0;
        btnRestart.visible = false;
        btnRestart.interactive = true;
        btnRestart.on("mousedown", this.restart.bind(this));
        this.menuContainer.addChild(btnRestart);

        let btnRestartText = new PIXI.Text("Restart", new PIXI.TextStyle({fill: "black", font: "15px bold"}));
        btnRestartText.position.set(410, 420);
        btnRestartText.visible = false;
        this.menuContainer.addChild(btnRestartText);

        let btnHideMenu = new PIXI.Graphics();
        btnHideMenu.lineStyle(1, 0xa3a3a3, 1);
        btnHideMenu.beginFill(0x848484);
        btnHideMenu.drawRoundedRect(565, 250, 20, 20, 5);
        btnHideMenu.endFill();
        btnHideMenu.x = 0;
        btnHideMenu.y = 0;
        btnHideMenu.visible = false;
        btnHideMenu.interactive = true;
        btnHideMenu.on("mousedown", this.continue.bind(this));
        this.menuContainer.addChild(btnHideMenu);

        let btnHideMenuText = new PIXI.Text("X", new PIXI.TextStyle({fill: "black", fontSize: 20}));
        btnHideMenuText.position.set(568, 249);
        btnHideMenuText.visible = false;
        this.menuContainer.addChild(btnHideMenuText);
    }

}