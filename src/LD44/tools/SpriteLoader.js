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
            .add("bg_fight", "assets/images/bg_fight.png");

        let figures = ['player', 'elf_female', 'gargoyle', 'goblin', 'lizard_man', 'medusa', 'minotaur', 'orc', 'skeleton', 'wizard', 'treant', 'dwarf', 'troll'];
        let actions = ['stay', 'walk', 'attack'];
        let actionImgs = [1, 8, 3];

        for (let i = 0; i < figures.length; i++) {
            for (let j = 0; j < actions.length; j++) {
                for (let k = 0; k < actionImgs[j]; k++) {
                    let index = (k + 1).toString();
                    if (actionImgs[j] === 1)
                        index = "";
                    let name = figures[i] + "_" + actions[j] + index;
                    let path = "assets/images/fight/" + name + ".png";
                    console.log (name + " " + path);
                    this.add(name, path);
                }
            }
        }


        this.add("hp_1", "assets/images/world/scale_03_04.png")
            .add("hp_2", "assets/images/world/scale_03_05.png")
            .add("hp_3", "assets/images/world/scale_03_06.png")
            .add("hp_4", "assets/images/world/scale_03_07.png")
            .add("bag", "assets/images/world/BagsAndBoxes_54.png")
            .add("tileForest", "assets/images/world/forest.png")
            .add("tileGrass", "assets/images/world/grass.png")
            .add("tileMountain", "assets/images/world/mountain.png")
            .add("tileWater", "assets/images/world/water.png")
            .load(started);
    };
}