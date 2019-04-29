import Item from "../model/Item";

export default class ItemGenerator {
    constructor() {
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
        this.helm = [
            {
                icon: 'default_chest',
                name: 'Crimson Cowl',
                stats: {cost: 3, health: 25}
            },
            {
                icon: 'helm1',
                name: 'Stoned Helmet',
                stats: {defense: 10, cost: -7}
            },
            {
                icon: 'helm2',
                name: 'Leather Helmet',
                stats: {defense: 10, cost: 2}
            },
            {
                icon: 'helm3',
                name: 'Plated Helmet',
                stats: {defense: 20, cost: -12}
            }
        ];
        this.chest = [
            {
                icon: 'default_chest',
                name: 'Crimson Robers',
                stats: {cost: 10, health: 50}
            },
            {
                icon: 'chest1',
                name: 'Plated Chest',
                stats: {defense: 15, cost: -7, health: 10}
            },
            {
                icon: 'chest2',
                name: 'Leather Chest',
                stats: {defense: 10, cost: -4, health: 7}
            },
            {
                icon: 'chest3',
                name: 'Linen Chest',
                stats: {defense: 5, cost: -1, health: 2}
            }
        ];
        this.shoulders = [
            {
                icon: 'default_shoulder',
                name: 'Crimson Shoulders',
                stats: {cost: 7, health: 35}
            },
            {
                icon: 'shoulder1',
                name: 'Plated Shoulders',
                stats: {defense: 12, cost: -6}
            },
            {
                icon: 'shoulder2',
                name: 'Padded Shoulders',
                stats: {defense: 7, cost: -4}
            },
            {
                icon: 'shoulder3',
                name: 'Linen Shoulders',
                stats: {defense: 3, cost: -2}
            }
        ];
        this.weapon1 = [
            {
                icon: 'default_weapon1',
                name: "Twitching Eye of Zala'tix",
                stats: {damage: 30, health: -20}
            },
            {
                icon: 'mainhand1',
                name: 'Death Blue Blood Axe',
                stats: {damage: 10, cost: -5}
            },
            {
                icon: 'mainhand2',
                name: 'Staff of the Dead Man',
                stats: {damage: 20, health: -10, cost: -5}
            },
            {
                icon: 'mainhand3',
                name: 'Mystic Sword of Infinite Death\'s ',
                stats: {damage: 40, health: -25, cost: -5}
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
        switch (type) {
            default:
                return this.getJunkItem();
            case 1:
                return this.getHelm();
            case 2:
                return this.getShoulders();
            case 3:
                return this.getChest();
            case 7:
                return this.getWeapon1();
            case 4:
                return this.getGloves();
        }
    };

    getGloves = () => {
        let info = this.gloves[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 4, info.name, info.stats);
    };
    getChest = () => {
        let info = this.chest[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 3, info.name, info.stats);
    };
    getHelm = () => {
        let info = this.helm[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 1, info.name, info.stats);
    };
    getShoulders = () => {
        let info = this.shoulders[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 2, info.name, info.stats);
    };
    getWeapon1 = () => {
        let info = this.weapon1[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 7, info.name, info.stats);
    };
}