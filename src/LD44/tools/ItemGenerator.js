import Item from "../model/Item";

export default class ItemGenerator {
    constructor() {
        this.gloves = [
            {
                icon: 'default_hands',
                name: 'Crimson Gloves',
                stats: {health: 20, cost: 5}
            },
            {
                icon: 'gloves1',
                name: 'Plated Gauntlets',
                stats: {defense: 10, cost: -5}
            },
            {
                icon: 'gloves2',
                name: 'Padded Snatchers',
                stats: {defense: 5, cost: -2}
            },
            {
                icon: 'gloves3',
                name: 'Hunting Gloves',
                stats: {defense: 2, cost: -1}
            }
        ];
        this.boots = [
            {
                icon: 'default_boots',
                name: 'Crimson Boots',
                stats: {health: 10, cost: 2}
            },
            {
                icon: 'boots2',
                name: 'Reinforced Puddle Stompers',
                stats: {defense: 5}
            },
            {
                icon: 'boots1',
                name: 'Leather Boots',
                stats: {defense: 3}
            },
            {
                icon: 'boots3',
                name: 'Shadow Boots',
                stats: {defense: 8, cost: -5}
            }
        ];
        this.pants = [
            {
                icon: 'default_legs',
                name: 'Crimson Skirt',
                stats: {health: 50, cost: 15}
            },
            {
                icon: 'pants1',
                name: 'Elven Leggins',
                stats: {defense: 10, health: 25}
            },
            {
                icon: 'pants2',
                name: 'Steel Pants',
                stats: {defense: 15, cost: -12}
            },
            {
                icon: 'pants3',
                name: 'Comfy Legguards',
                stats: {defense: 7, cost: -10, health: 7}
            }
        ];
        this.weapon2 = [
            {
                icon: 'default_weapon2',
                name: 'Grimoire of Blood',
                stats: {damage: 50, cost: 50, health: -50}
            },
            {
                icon: 'book1',
                name: 'Druidic Lore',
                stats: {health: 85, damage: -25}
            },
            {
                icon: 'knife1',
                name: 'Sacrifical Dagger',
                stats: {cost: 75, health: -25}
            },
            {
                icon: 'shield1',
                name: 'Buckler of a Red Knight',
                stats: {defense: 40, cost: -40}
            },
            {
                icon: 'ring1',
                name: 'Blood Ruby',
                stats: {health: 100}
            },
            {
                icon: 'ring2',
                name: 'Ring of Power',
                stats: {damage: 70}
            },
            {
                icon: 'ring3',
                name: 'Royal Amethyst',
                stats: {cost: 60}
            },
            {
                icon: 'ring4',
                name: 'Circlet of Inner Peace',
                stats: {defense: 30}
            }
        ];
        this.junk = [
            {
                icon: 'pig',
                name: 'Orcish Shiny Hider'
            },
            {
                icon: 'narsil',
                name: 'Shard of Narsil'
            },
            {
                icon: 'rune',
                name: 'Rune of Alph'
            },
            {
                icon: 'feather',
                name: 'Feather of Aviana'
            },
            {
                icon: 'shards',
                name: 'Shards of Tesseract'
            },
            {
                icon: 'elementium1',
                name: 'Stormium'
            },
            {
                icon: 'elementium2',
                name: 'Emberium'
            },
            {
                icon: 'elementium3',
                name: 'Aquium'
            },
            {
                icon: 'elementium4',
                name: 'Dirtium'
            },
            {
                icon: 'ember',
                name: 'Ancient Lizard DNA'
            }
        ];
        this.helm = [
            {
                icon: 'default_helm',
                name: 'Crimson Cowl',
                stats: {cost: 3, health: 25}
            },
            {
                icon: 'helm1',
                name: 'Stoned Helmet',
                stats: {defense: 10, cost: -7}
            },
            {
                icon: 'helm2',
                name: 'Leather Helmet',
                stats: {defense: 10, cost: 2}
            },
            {
                icon: 'helm3',
                name: 'Plated Helmet',
                stats: {defense: 20, cost: -12}
            }
        ];
        this.chest = [
            {
                icon: 'default_chest',
                name: 'Crimson Robes',
                stats: {cost: 10, health: 50}
            },
            {
                icon: 'chest1',
                name: 'Plated Chest',
                stats: {defense: 15, cost: -7, health: 10}
            },
            {
                icon: 'chest2',
                name: 'Leather Chest',
                stats: {defense: 10, cost: -4, health: 7}
            },
            {
                icon: 'chest3',
                name: 'Linen Chest',
                stats: {defense: 5, cost: -1, health: 2}
            }
        ];
        this.shoulders = [
            {
                icon: 'default_shoulder',
                name: 'Crimson Shoulders',
                stats: {cost: 7, health: 35}
            },
            {
                icon: 'shoulder1',
                name: 'Plated Shoulders',
                stats: {defense: 12, cost: -6}
            },
            {
                icon: 'shoulder2',
                name: 'Padded Shoulders',
                stats: {defense: 7, cost: -4}
            },
            {
                icon: 'shoulder3',
                name: 'Linen Shoulders',
                stats: {defense: 3, cost: -2}
            }
        ];
        this.weapon1 = [
            {
                icon: 'default_weapon1',
                name: "Twitching Eye of Zala'tix",
                stats: {damage: 30, health: -20}
            },
            {
                icon: 'mainhand1',
                name: 'Death Blue Blood Axe',
                stats: {damage: 10, cost: -5}
            },
            {
                icon: 'mainhand2',
                name: 'Staff of the Dead Man',
                stats: {damage: 20, health: -10, cost: -5}
            },
            {
                icon: 'mainhand3',
                name: 'Mystic Sword of Infinite Death\'s ',
                stats: {damage: 40, health: -25, cost: -5}
            }
        ];
    }

    getJunkItem = () => {
        let info = this.junk[Math.floor(Math.random() * this.junk.length)];
        return new Item(info.icon, -1, info.name);
        // return new Item("noItem", -1, "Nope Fish");
    };

    getPotion = () => {
        let potion = new Item("potionHp", 9, "Health Potion");
        potion.stats.heals = 20 * potion.rarity + " - " + (20 * potion.rarity + 20);
        potion.onEquip = (player) => {
            let effectiveness = (Math.ceil(Math.random() * 20) + (20 * potion.rarity)) / 100;
            let hp = player.maxHealth * effectiveness;
            player.health += hp;
            if (player.health > player.maxHealth) {
                player.health = player.maxHealth;
            }
        };
        return potion;
    };

    getRandomEquipableItem = () => {
        let type = Math.ceil(Math.random() * 8);
        return this.getItemForType(type);
    };

    getItemForType = (type) => {
        switch (type) {
            default:
                return this.getJunkItem();
            case 1:
                return this.getHelm();
            case 2:
                return this.getShoulders();
            case 3:
                return this.getChest();
            case 7:
                return this.getWeapon1();
            case 4:
                return this.getGloves();
            case 5:
                return this.getPants();
            case 6:
                return this.getBoots();
            case 8:
                return this.getWeapon2();
        }
    };

    getGloves = () => {
        let info = this.gloves[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 4, info.name, info.stats);
    };

    getBoots = () => {
        let info = this.boots[Math.floor(Math.random() * this.boots.length)];
        return new Item(info.icon, 6, info.name, info.stats);
    };

    getPants = () => {
        let info = this.pants[Math.floor(Math.random() * this.pants.length)];
        return new Item(info.icon, 5, info.name, info.stats);
    };

    getWeapon2 = () => {
        let info = this.weapon2[Math.floor(Math.random() * this.weapon2.length)];
        return new Item(info.icon, 8, info.name, info.stats);
    };

    getChest = () => {
        let info = this.chest[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 3, info.name, info.stats);
    };
    getHelm = () => {
        let info = this.helm[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 1, info.name, info.stats);
    };
    getShoulders = () => {
        let info = this.shoulders[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 2, info.name, info.stats);
    };
    getWeapon1 = () => {
        let info = this.weapon1[Math.floor(Math.random() * this.gloves.length)];
        return new Item(info.icon, 7, info.name, info.stats);
    };
}