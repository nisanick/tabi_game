import NpcInventory from "../model/NpcInventory";

export default class Tile {
    constructor(type) {
        this.type = type;
        this.chest = false;
        this.city = false;

        this.inventory = undefined;
    }

    getType = () => {
        return this.type;
    };

    setCity = () => {
        if(!this.chest) {
            this.city = true;
            this.inventory = new NpcInventory();
        }
    };

    setChest = () => {
        if(!this.city){
            this.chest = true;
            this.inventory = new NpcInventory();
        }
    };

    getInventory = () => {
        return this.inventory.inventory;
    }
}