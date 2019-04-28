import Enemy from "../model/Enemy";
import Tools from "./Tools";

export default class EnemyGenerator {
    constructor() {
        this.lakeEnemies = ['medusa', 'skeleton', 'goblin'];
        this.grasslandEnemies = ['elf_female', 'wizard', 'lizard_man'];
        this.forestEnemies = ['orc', 'treant', 'dwarf'];
        this.mountainsEnemies = ['minotaur', 'troll', 'gargoyle'];
    }

    generate = (tileType) => {
        let enemyName = '';
        let rnd = Tools.getRndInteger(0, 2);
        if (tileType === 1){
            enemyName = this.lakeEnemies[rnd];
        } else if (tileType === 2){
            enemyName = this.grasslandEnemies[rnd];
        } else if (tileType === 3){
            enemyName = this.forestEnemies[rnd];
        } else {
            enemyName = this.mountainsEnemies[rnd];
        }

        return new Enemy(enemyName, this.getAvailableSpells(enemyName));
    };

    getAvailableSpells = (name) => {
        if (name === 'troll' ||
            name === 'orc' ||
            name === 'minotaur' ||
            name === 'skeleton' ||
            name === 'dwarf' ||
            name === 'treant' ||
            name === 'lizard_man' ||
            name === 'goblin') {

            return [0, 3];
        } else {
            return [1, 2];
        }
    };
}