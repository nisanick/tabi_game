import Item from "./Item";

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.head = new Item('default_helm', 1);
        this.shoulder = new Item('default_shoulder', 2);
        this.chest = new Item('default_chest', 3);
        this.hands = new Item('default_hands', 4);
        this.legs = new Item('default_legs', 5);
        this.boots = new Item('default_boots', 6);
        this.weapon1 = new Item('default_weapon1', 7);
        this.weapon2 = new Item('default_weapon2', 8);
    }
}