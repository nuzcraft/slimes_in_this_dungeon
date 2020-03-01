class Tile{
    constructor(x, y, sprite, passable){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.passable = passable;
    }

    draw(){
        drawSprite(this.sprite, this.x, this.y);
    }

    getNeighbor(dx, dy){
        return getTile(this.x + dx, this.y + dy);
    }
}

class Floor extends Tile {
    constructor(x, y){
        super(x, y, spr_floor, true);
    }
}

class Wall extends Tile {
    constructor(x, y){
        super(x, y, spr_wall, false);
    }
}