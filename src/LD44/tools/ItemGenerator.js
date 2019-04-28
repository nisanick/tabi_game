export default class ItemGenerator {
    constructor () {

    }

    getJunkItem = () => {

    };

    getRandomEquipableItem = () => {
        let type = Math.ceil(Math.random() * 8);
        return this.getItemForType(type);
    };

    getItemForType = (type) => {

    };
}