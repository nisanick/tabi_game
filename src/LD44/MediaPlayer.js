import "howler";

/*
https://github.com/goldfire/howler.js#documentation
*/

export default class MediaPlayer{
    constructor(){
        this.sounds = {};
    }

    add(/*Howl*/howl, name){
        this.sounds[name] = howl;
    }

    play(name, loop = false){
        this.sounds[name].loop(loop);
        this.sounds[name].play();
    }

    pause(name){
        this.sounds[name].pause();
    }

    stop(name){
        this.sounds[name].stop();
    }
}