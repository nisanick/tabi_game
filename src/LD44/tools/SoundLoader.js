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
        this.gameover = new Howl({
            src: ['assets/sounds/gameover.wav'],
            loop: false,
            volume: 0.1
        });
        this.pickup = new Howl({
            src: ['assets/sounds/pickup.wav'],
            loop: false,
            volume: 0.1
        });
        this.pickupCoin = new Howl({
            src: ['assets/sounds/pickup_coin.wav'],
            loop: false,
            volume: 0.1
        });

        this.fireball = new Howl({
            src: ['assets/sounds/spells/fireball.mp3'],
            loop: false,
            volume: 0.1
        });
        this.frostball = new Howl({
            src: ['assets/sounds/spells/frostball.mp3'],
            loop: false,
            volume: 0.1
        });
        this.melee = new Howl({
            src: ['assets/sounds/spells/melee.mp3'],
            loop: false,
            volume: 0.1
        });
        this.shield = new Howl({
            src: ['assets/sounds/spells/shield.mp3'],
            loop: false,
            volume: 0.1
        });
        this.thrown = new Howl({
            src: ['assets/sounds/spells/thrown.mp3'],
            loop: false,
            volume: 0.1
        });
    }
}