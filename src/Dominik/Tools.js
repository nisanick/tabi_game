import FirstAidBonus from "./bonuses/FirstAidBonus";
import ReloadBonus from "./bonuses/ReloadBonus";
import ShieldBonus from "./bonuses/ShieldBonus";
import ShotgunBonus from "./bonuses/ShotgunBonus";
import SpeedBonus from "./bonuses/SpeedBonus";

export default class Tools {

    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static isBetweenObject(min, max, point){
        return (point >= min && point <= max);
    }

    static reflectFromX(object1, object2){
        if (object1.hitRectangle) {
            object1 = object1.hitRectangle;
        }
        if (object2.hitRectangle) {
            object2 = object2.hitRectangle;
        }

        if (object1.y >= object2.y && object1.y <= object2.y + object2.height) {
            if (Tools.isBetweenObject(object2.x, object2.x + object2.width, object2.x)) {
                return true;
            }
        }
    }

    static reflectFromY(object1, object2){
        if (object1.hitRectangle) {
            object1 = object1.hitRectangle;
        }
        if (object2.hitRectangle) {
            object2 = object2.hitRectangle;
        }

        if (object1.x >= object2.x && object1.x <= object2.x + object2.width) {
            if (Tools.isBetweenObject(object2.y, object2.y + object2.height, object2.y)) {
                return true;
            }
        }
    }

    static toRadians(degree){
        return degree * (Math.PI / 180);
    }

    static getAllBonuses(level){
        let bonuses = [];
        bonuses[0] = new FirstAidBonus(level);
        bonuses[1] = new ReloadBonus(level);
        bonuses[2] = new ShieldBonus(level);
        bonuses[3] = new ShotgunBonus(level);
        bonuses[4] = new SpeedBonus(level);

        return bonuses;
    }

    static collision(object1, object2){
        if (object1.hitRectangle) {
            object1 = object1.hitRectangle;
        }
        if (object2.hitRectangle) {
            object2 = object2.hitRectangle;
        }

        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        let bCenterX, bCenterY, bHalfWidth, bHalfHeight;
        let fCenterX, fCenterY, fHalfWidth, fHalfHeight;
        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        fCenterX = object1.x + object1.width / 2;
        fCenterY = object1.y + object1.height / 2;
        bCenterX = object2.x + object2.width / 2;
        bCenterY = object2.y + object2.height / 2;

        //Find the half-widths and half-heights of each sprite
        fHalfWidth = object1.width / 2;
        fHalfHeight = object1.height / 2;
        bHalfWidth = object2.width / 2;
        bHalfHeight = object2.height / 2;

        //Calculate the distance vector between the sprites
        vx = fCenterX - bCenterX;
        vy = fCenterY - bCenterY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = fHalfWidth + bHalfWidth;
        combinedHalfHeights = fHalfHeight + bHalfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
            if (Math.abs(vy) < combinedHalfHeights) {
                hit = true;
            } else {
                hit = false;
            }
        } else {
            hit = false;
        }
        return hit;
    }

}