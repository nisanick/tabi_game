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

        this.value = Math.ceil(Math.random() * 10000);
    }

    getType = () => {
        switch (this.slot) {
            default:
            case -1: return "Junk";
            case 0: return "Coins";
            case 1: return "Helmet";
            case 2: return "Shoulder";
            case 3: return "Chest";
            case 4: return "Hands";
            case 5: return "Legs";
            case 6: return "Feet";
            case 7: return "Main Hand";
            case 8: return "Off Hand";
        }
    }
}