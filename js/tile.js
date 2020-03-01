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

    getAdjacentNeighbors(){
        return shuffle([
            this.getNeighbor(0, -1),
            this.getNeighbor(0, 1),
            this.getNeighbor(-1, 0),
            this.getNeighbor(1, 0)
        ]);
    }

    getAdjacentPassableNeighbor(){
        return this.getAdjacentNeighbors().filter(t => t.passable);
    }

    // manhattan distance
    dist(other){
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    replace(newTileType){
        tiles[this.x][this.y] = new newTileType(this.x, this.y);
        return tiles[this.x][this.y];
    }
}

class Floor extends Tile {
    constructor(x, y){
        super(x, y, spr_floor, true);
    }

    stepOn(monster){
        // do nothing atm. This is used by the exit tile
    }
}

class Wall extends Tile {
    constructor(x, y){
        super(x, y, spr_wall, false);
    }
}

class Exit extends Tile{
    constructor(x, y){
        super(x, y, spr_exit_level, true);
        if (level == numLevels){
            this.sprite = spr_exit_game;
        }
    }

    stepOn(monster){
        if(monster.isPlayer){
            if(level == numLevels){
                showTitle();
            } else {
                level ++;
                startLevel();
            }
        }
    }
}