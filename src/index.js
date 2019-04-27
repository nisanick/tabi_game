require("@babel/polyfill");


import SceneLoader from "./LD44/SceneLoader";

import * as PIXI from "pixi.js";

let pixi_cnt = document.getElementById("Game");
let app = new PIXI.Application({width: 900, height: 900, transparent: false, antialias: true, resolution: 1});

let sceneLoader = new SceneLoader(app);
sceneLoader.init();


if (pixi_cnt && pixi_cnt.children.length <= 0) {
    pixi_cnt.appendChild(app.view);
    //The setup function is a custom function that we created to add the sprites. We will this below
    //this.setup();
}