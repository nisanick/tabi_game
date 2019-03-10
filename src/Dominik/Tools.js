export default class Tools {

    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}