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
    }
}