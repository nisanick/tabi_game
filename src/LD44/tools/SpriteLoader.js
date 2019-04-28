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
                    if(window.gameDebugMode) {
                        console.log(name + " " + path);
                    }
                    this.add(name, path);
                }
            }
        }


        this.add("barBorder", "assets/images/world/scale_03_04.png")
            .add("bar1", "assets/images/world/scale_03_05.png")
            .add("bar2", "assets/images/world/scale_02_06.png")
            .add("bar3", "assets/images/world/scale_01_06.png")
            .add("barBorder2", "assets/images/world/scale_03_06.png")
            .add("barBg", "assets/images/world/scale_03_07.png")
            .add("bag", "assets/images/world/BagsAndBoxes_54.png")
            .add("tileForest", "assets/images/world/forest.png")
            .add("tileGrass", "assets/images/world/grass.png")
            .add("tileMountain", "assets/images/world/mountain.png")
            .add("tileWater", "assets/images/world/water.png")
            .add("tileForestCity", "assets/images/world/forest-city.png")
            .add("tileGrassCity", "assets/images/world/grass-city.png")
            .add("tileMountainCity", "assets/images/world/mountain-city.png")
            .add("tileWaterCity", "assets/images/world/water-city.png")
            .add("tileForestChest", "assets/images/world/forest-chest.png")
            .add("tileGrassChest", "assets/images/world/grass-chest.png")
            .add("tileMountainChest", "assets/images/world/mountain-chest.png")
            .add("tileWaterChest", "assets/images/world/water-chest.png")
            .add("heart", "assets/images/world/heart.png")
            .add("coin", "assets/images/world/152_t.PNG")
            .add("cross", "assets/images/world/cross.png")
            .add("book", "assets/images/stats/book.png")
            .add("slot", "assets/images/stats/slot_01.png")
            .add("noItem", "assets/images/items/none.png")
            .add("default_chest", "assets/images/items/default/armor_cl_b_01.PNG")
            .add("default_weapon2", "assets/images/items/default/book_cl_b_01.PNG")
            .add("default_boots", "assets/images/items/default/boot_cl_b_01.PNG")
            .add("default_hands", "assets/images/items/default/gloves_cl_b_01.PNG")
            .add("default_helm", "assets/images/items/default/hood_cl_b_01.PNG")
            .add("default_legs", "assets/images/items/default/pants_cl_b_01.PNG")
            .add("default_shoulder", "assets/images/items/default/shoulders_cl_b_01.PNG")
            .add("default_weapon1", "assets/images/items/default/staff_cl_b_01.PNG")
            .load(started);
    };
}