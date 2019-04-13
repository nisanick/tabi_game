require("@babel/polyfill");
import * as PIXI from "pixi.js";
import Dominik from "./Dominik/Dominik";

let pixi_cnt = document.getElementById("Dominik");
let app = new PIXI.Application({width: 900, height: 900, transparent: false, antialias: true, resolution: 1});
let model = new Dominik(app);


if (pixi_cnt && pixi_cnt.children.length <= 0) {
    pixi_cnt.appendChild(app.view);
    //The setup function is a custom function that we created to add the sprites. We will this below
    //this.setup();
}