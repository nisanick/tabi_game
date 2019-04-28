export default class Tile {
    constructor(type) {
        this.type = type;
        this.chest = false;
        this.city = false;
    }

    getType = () => {
        return this.type;
    };

    setCity = () => {
        if(!this.chest)
            this.city = true;
    };

    setChest = () => {
        if(!this.city)
            this.chest = true;
    }
}