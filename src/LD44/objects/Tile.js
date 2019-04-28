import NpcInventory from "../model/NpcInventory";

export default class Tile {
    constructor(type) {
        this.type = type;
        this.chest = false;
        this.city = false;

        this.inventory = undefined;
    }

    getType = () => {
        if(this.chest && this.inventory.itemCount === 0){
            this.chest = false;
        }
        return this.type;
    };

    setCity = () => {
        if(!this.chest) {
            this.city = true;
            this.inventory = new NpcInventory(1);
        }
    };

    setChest = () => {
        if(!this.city){
            this.chest = true;
            this.inventory = new NpcInventory(2);
        }
    };

    getInventory = () => {
        return this.inventory.inventory;
    }
}