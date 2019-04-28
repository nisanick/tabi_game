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
    constructor(icon, slot, name){
        this.icon = icon;
        this.slot = slot;
        this.name = name;
    }
}