import * as PIXI from "pixi.js";

export default class SpriteLoader extends PIXI.Loader {
    constructor() {
        super();
    }

    init = (started) => {
        this.add("player_avatar", "assets/images/player/player_avatar.png")
            .add("player_full", "assets/images/player/player_full.png")
            .add("frame_avatar", "assets/images/frame_avatar.png")
            .add("frame_char", "assets/images/frame_char.png")
            .add("bg_fight", "assets/images/bg_fight.png")
            .add("hp_1", "assets/images/world/scale_03_04.png")
            .add("hp_2", "assets/images/world/scale_03_05.png")
            .add("hp_3", "assets/images/world/scale_03_06.png")
            .add("hp_4", "assets/images/world/scale_03_07.png")
            .add("bag", "assets/images/world/BagsAndBoxes_54.png")
            .add("tileForest", "assets/images/world/forest.png")
            .add("tileGrass", "assets/images/world/grass.png")
            .add("tileMountain", "assets/images/world/mountain.png")
            .add("tileWater", "assets/images/world/water.png")
            .load(started)
    };
}