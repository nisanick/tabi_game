import Item from "../model/Item";

export default class ItemGenerator {
    constructor () {

    }

    getJunkItem = () => {
        return new Item("noItem", -1, "Nope Fish");
    };

    getRandomEquipableItem = () => {
        let type = Math.ceil(Math.random() * 8);
        return this.getItemForType(type);
    };

    getItemForType = (type) => {

    };
}