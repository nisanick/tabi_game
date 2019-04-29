import * as PIXI from "pixi.js";

export default class SpellIcon extends PIXI.Sprite {
    constructor(texture, name) {
        super(texture);
        this.name = name;
        this.hoverInfo = {};
        this.initHover();
    }

    initHover = () => {
        let name = '';
        let description = '';
        let type = '';
        let details = {};
        if (this.name === 'melee_attack') {
            name = 'Melee Attack';
            type = 'melee';
            details = {
                Damage: '15 - 20',
                Cost: '3 HP'
            }
        } else if (this.name === 'fireball') {
            name = 'Fireball';
            type = 'spell';
            details = {
                Damage: '20 - 25',
                Cost: '5 HP'
            }
        } else if (this.name === 'iceball') {
            name = 'Iceball';
            type = 'spell';
            details = {
                Damage: '10 - 15',
                Cost: '2 HP'
            }
        } else if (this.name === 'thrown') {
            name = 'Thrown';
            type = 'Ranged';
            details = {
                Damage: '1 - 5',
                Cost: '0 HP'
            }
        } else if (this.name === 'shield') {
            name = 'Shield';
            type = 'shield';
            details = {
                Absorb: '1 Attack',
                Cost: '5 HP',
                Time: '5s'
            }
        }

        this.hoverInfo = {
            name: name,
            type: type,
            description: description,
            details: details
        };

    };
}