import ItemGenerator from "../tools/ItemGenerator";
import Item from "./Item";

export default class NpcInventory {
    constructor(type){

        this.type = type;
        this.max = 8*3;
        this.inventory = new Array(this.max);
        let generator = new ItemGenerator();

        this.cash = (Math.ceil(Math.random() * 10000) + 1000) * 10;

        this.itemCount = Math.ceil(Math.random() * this.max/type / 2);
        for (let i = 0; i < this.itemCount; i++) {
            let chance = Math.random()*100;
            if(this.type === 2){
                chance -= 25;
            }
            if(chance < 49){
                this.inventory[i] = generator.getJunkItem();
            } else {
                this.inventory[i] = generator.getRandomEquipableItem();
            }
        }

        if(this.type === 2){
            this.inventory[0] = new Item("coins", 0, "Pile of gold", {}, 1);
            this.inventory[0].value = Math.ceil(this.cash / 50);
        }
    }

    isGold = (index) => {
        return this.inventory[index].slot === 0;
    };

    haveSpace = () => {
        return this.itemCount < this.max;
    };

    addItem = (item) => {
        let empty;
        for (let i = 0; i < this.max; i++) {
            if(this.inventory[i] === undefined){
                empty = i;
                break;
            }
        }
        if(this.type === 1){
            this.cash -= item.value;
        }
        this.inventory[empty] = item;
        this.itemCount++;
    };

    removeItem = (index) => {
        let item = this.inventory[index];
        this.inventory[index] = undefined;
        if(item !== undefined){
            this.itemCount--;
            if(this.type === 1){
                this.cash += item.value;
            }
        }
        return item;
    }
}