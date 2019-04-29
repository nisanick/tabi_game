import "howler";

export default class SoundLoader {
    constructor() {
        this.mapSceneSound = new Howl({
            src: ['assets/sounds/map_scene.mp3'],
            loop: true,
            volume: 0.05
        });

        this.fightSceneSound = new Howl({
            src: ['assets/sounds/fight_scene.mp3'],
            loop: true,
            volume: 0.05
        });

        this.footStepSound = new Howl({
            src: ['assets/sounds/footstep.wav'],
            loop: true,
            volume: 0.1
        });
    }
}