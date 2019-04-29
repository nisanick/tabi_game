import Stats from "./Stats";

export default class Item {
    /*
    Slot explanation
    1 - helm
    2 - shoulder
    3 - chest
    4 - hands
    5 - legs
    6 - boots
    7 - wep 1
    8 - wep 2

    -1 - can't equip
     */
    constructor(icon, slot, name, stats, override) {
        this.icon = icon;
        this.slot = slot;
        this.name = name;

        let rarity = Math.floor(Math.random() * 100);
        if (rarity < 55) {
            rarity = 1;
        } else if (rarity < 82) {
            rarity = 2;
        } else if (rarity < 94) {
            rarity = 3;
        } else if (rarity < 98) {
            rarity = 4;
        } else {
            rarity = 5;
        }

        this.rarity = rarity;
        if(override !== undefined){
            this.rarity = override;
        }

        switch(this.rarity){
            default:
            case 1:
                this.value = Math.ceil(Math.random() * 190) + 10; break;
            case 2:
                this.value = Math.ceil(Math.random() * 1300) + 200; break;
            case 3:
                this.value = Math.ceil(Math.random() * 3500) + 1500; break;
            case 4:
                this.value = Math.ceil(Math.random() * 15000) + 5000; break;
            case 5:
                this.value = Math.ceil(Math.random() * 130000) + 20000; break;
        }

        if (this.slot > 0) {
            this.stats = {};
            if (stats === undefined) stats = {};
            Object.keys(stats).forEach((key) => {
                let mod = Math.random() + 0.40 * rarity;
                this.stats[key] = (stats[key] * mod).toFixed(2);
            });
        }

    }

    getType = () => {
        switch (this.slot) {
            default:
            case -1:
                return "Junk";
            case 0:
                return "Coins";
            case 1:
                return "Helmet";
            case 2:
                return "Shoulder";
            case 3:
                return "Chest";
            case 4:
                return "Hands";
            case 5:
                return "Legs";
            case 6:
                return "Feet";
            case 7:
                return "Main Hand";
            case 8:
                return "Off Hand";
            case 9:
                return "Potion";
        }
    }
}