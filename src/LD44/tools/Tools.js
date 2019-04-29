export default class Tools {
    static getRndInteger(min, max) {
        return Math.floor(Math.random() * ((max + 1) - min)) + min;
    }

    static collision = (object1, object2) => {
        object1 = object1.hitArea;
        object2 = object2.hitArea;

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
    };
}