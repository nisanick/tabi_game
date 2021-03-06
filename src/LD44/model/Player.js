import Item from "./Item";
import Stats from "./Stats";
import ItemGenerator from "../tools/ItemGenerator";

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 100;
        this.maxHealth = 100;

        this.head = new Item('default_helm', 1, 'Crimson Cowl', {}, 1);
        this.shoulder = new Item('default_shoulder', 2, 'Crimson Shoulders', {}, 1);
        this.chest = new Item('default_chest', 3, "Crimson Robes", {}, 1);
        this.hands = new Item('default_hands', 4, "Crimson Gloves", {}, 1);
        this.legs = new Item('default_legs', 5, "Crimson Skirt", {}, 1);
        this.boots = new Item('default_boots', 6, "Crimson Boots", {}, 1);
        this.weapon1 = new Item('default_weapon1', 7, "Twitching Eye of Zala'tix", {}, 1);
        this.weapon2 = new Item('default_weapon2', 8, "Grimoire of Blood", {}, 1);

        this.max = 8 * 3;
        this.bag = new Array(this.max);
        this.stats = this.calculateStats();

        this.bag[0] = new ItemGenerator().getPotion();
        this.gold = 1000;

        this.itemCount = 0;
    }

    getHealth = () => {
        let health = Math.floor((this.health * 100) / this.maxHealth);
        return health;
    };

    equip = (index) => {
        let item = this.bag[index];
        if(item !== undefined && item.slot > 0){
            switch(item.slot){
                case 1: this.bag[index] = this.head; this.head = item; break;
                case 2: this.bag[index] = this.shoulder; this.shoulder = item; break;
                case 3: this.bag[index] = this.chest; this.chest = item; break;
                case 4: this.bag[index] = this.hands; this.hands = item; break;
                case 5: this.bag[index] = this.legs; this.legs = item; break;
                case 6: this.bag[index] = this.boots; this.boots = item; break;
                case 7: this.bag[index] = this.weapon1; this.weapon1 = item; break;
                case 8: this.bag[index] = this.weapon2; this.weapon2 = item; break;
                case 9: this.bag[index] = undefined; item.onEquip(this); this.itemCount--; break;
            }

            this.stats = this.calculateStats();
        }
    };

    calculateStats = () => {
        let stats = new Stats();
        Object.keys(this.head.stats).forEach((key) => {
            stats[key] += parseFloat(this.head.stats[key]);
        });
        Object.keys(this.shoulder.stats).forEach((key) => {
            stats[key] += parseFloat(this.shoulder.stats[key]);
        });
        Object.keys(this.chest.stats).forEach((key) => {
            stats[key] += parseFloat(this.chest.stats[key]);
        });
        Object.keys(this.hands.stats).forEach((key) => {
            stats[key] += parseFloat(this.hands.stats[key]);
        });
        Object.keys(this.legs.stats).forEach((key) => {
            stats[key] += parseFloat(this.legs.stats[key]);
        });
        Object.keys(this.boots.stats).forEach((key) => {
            stats[key] += parseFloat(this.boots.stats[key]);
        });
        Object.keys(this.weapon1.stats).forEach((key) => {
            stats[key] += parseFloat(this.weapon1.stats[key]);
        });
        Object.keys(this.weapon2.stats).forEach((key) => {
            stats[key] += parseFloat(this.weapon2.stats[key]);
        });

        this.maxHealth = 100 + (100 * (stats.health / 100));
        if (this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
        return stats;
    };

    getStats = () => {
        return this.stats;
    };

    addGold = (gold) => {
        this.gold += Math.floor(gold);
        if (this.gold > 9999999999) {
            this.gold = 9999999999;
        }
    };


    haveSpace = () => {
        return this.itemCount < this.max;
    };

    addItem = (item) => {
        let empty;
        for (let i = 0; i < this.max; i++) {
            if (this.bag[i] === undefined) {
                empty = i;
                break;
            }
        }
        this.bag[empty] = item;
        this.itemCount++;
    };

    removeItem = (index) => {
        let item = this.bag[index];
        this.bag[index] = undefined;
        this.itemCount--;
        return item;
    }
}