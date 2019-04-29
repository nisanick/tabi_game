import NpcInventory from "./NpcInventory";
import Tools from "../tools/Tools";

export default class Enemy {
    constructor(name, availableSpells) {
        this.health = 100;
        this.name = name;
        this.availableSpells = availableSpells;
        this.inventory = undefined;
        let rng = Tools.getRndInteger(0, 100);
        if (rng > 70) {
            this.inventory = new NpcInventory(1);
        } else if (rng > 50) {
            this.inventory = new NpcInventory(2);
        }
    }
}