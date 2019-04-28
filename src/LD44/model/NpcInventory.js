import ItemGenerator from "../tools/ItemGenerator";

export default class NpcInventory {
    constructor(){
        this.max = 8*3;
        this.inventory = new Array(this.max);
        let generator = new ItemGenerator();


        this.itemCount = Math.ceil(Math.random() * this.max);
        for (let i = 0; i < this.itemCount; i++) {
            this.inventory[i] = generator.getJunkItem();
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
        this.inventory[empty] = item;
        this.itemCount++;
    };

    removeItem = (index) => {
        let item = this.inventory[index];
        this.inventory[index] = undefined;
        this.itemCount--;
        return item;
    }
}