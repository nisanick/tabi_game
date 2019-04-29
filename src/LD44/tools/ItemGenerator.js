import Item from "../model/Item";

export default class ItemGenerator {
    constructor () {
        this.gloves = [
            {
                icon: 'default_hands',
                name: 'Crimson Cowl',
                stats: {}
            },
            {
                icon: 'gloves1',
                name: 'Plated Gloves',
                stats: {defense: 10, cost: -5}
            },
            {
                icon: 'gloves2',
                name: 'Padded Snatchers',
                stats: {defense: 5, cost: -2}
            },
            {
                icon: 'gloves3',
                name: 'Linen Fingers',
                stats: {defense: 2, cost: -2}
            }
        ];
    }

    getJunkItem = () => {
        return new Item("noItem", -1, "Nope Fish");
    };

    getRandomEquipableItem = () => {
        let type = Math.ceil(Math.random() * 8);
        return this.getItemForType(type);
    };

    getItemForType = (type) => {
        switch(type) {
            default:
                return this.getJunkItem();
            case 4:
                return this.getGloves();
        }
    };

    getGloves = () => {
        let info = this.gloves[Math.ceil(Math.random() * this.gloves.length)];
        return new Item(info.icon, 4, info.name, info.stats);
    }
}