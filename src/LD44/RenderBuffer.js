export default class RenderBuffer{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    add(object){
        if (this.last !== null){
            this.last.next = object;
        }
        object.previous = this.last;
        this.last = object;
        if (this.first === null) {
            this.first = object;
        }
        this.size++;
    }

    remove(object){
        if (this.first === object){
            this.first = object.next;
            if (this.first !== null){
                this.first.previous = null;
            }
        } else {
            object.previous.next = object.next;
        }

        if (this.last === object){
            this.last = object.previous;
            if (this.last !== null){
                this.last.next = null;
            }
        } else {
            object.next.previous = object.previous;
        }
        this.size--;
    }

}