import Item from "./Item";

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.head = new Item('default_helm', 1, 'Crimson Cowl');
        this.shoulder = new Item('default_shoulder', 2, 'Crimson Shoulders');
        this.chest = new Item('default_chest', 3, "Crimson Robers");
        this.hands = new Item('default_hands', 4, "Crimson Gloves");
        this.legs = new Item('default_legs', 5, "Crimson Skirt");
        this.boots = new Item('default_boots', 6, "Crimson Boots");
        this.weapon1 = new Item('default_weapon1', 7, "Twitching Eye of Zala'tix");
        this.weapon2 = new Item('default_weapon2', 8, "Grimoire of Blood");

        this.bag = new Array(8*3);

        //this.bag[0] = new Item("noItem", 3, "Nope Fish");
        this.gold = 1000;
    }

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
            }
        }
    }

    addGold = (gold) => {
        this.gold += Math.floor(gold);
        if(this.gold > 9999999999){
            this.gold = 9999999999;
        }
    }
}