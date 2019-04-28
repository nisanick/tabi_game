import ItemGenerator from "../tools/ItemGenerator";
import Item from "./Item";

export default class NpcInventory {
    constructor(type){

        this.type = type;
        this.max = 8*3;
        this.inventory = new Array(this.max);
        let generator = new ItemGenerator();

        this.cash = this.cash = Math.ceil(Math.random() * 10000) + 1000;

        this.itemCount = Math.ceil(Math.random() * this.max/type);
        for (let i = 0; i < this.itemCount; i++) {
            this.inventory[i] = generator.getJunkItem();
        }

        if(this.type === 2){
            this.inventory[0] = new Item("coins", 0, "Pile of gold");
            this.inventory[0].value = this.cash / 5;
        }
    }

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