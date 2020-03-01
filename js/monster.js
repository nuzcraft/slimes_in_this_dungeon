class Monster{
    constructor(tile, sprite){
        this.move(tile);
        this.isPlayer = false;
        this.sprite = sprite;
        this.offsetX = 0;
        this.offsetY = 0;
        this.lastMove = [-1, 0];
    }

    draw(){
        drawSprite(this.sprite, this.getDisplayX(), this.getDisplayY());
        
        this.offsetX -= Math.sign(this.offsetX) * (1/8)
        this.offsetY -= Math.sign(this.offsetY) * (1/8)
    }

    getDisplayX() {
        return this.tile.x + this.offsetX;
    }

    getDisplayY() {
        return this.tile.y + this.offsetY;
    }

    tryMove(dx, dy){
        let newTile = this.tile.getNeighbor(dx, dy);
        if(newTile.passable){
            this.lastMove = [dx, dy];
            if (!newTile.monster){
                this.move(newTile);
            }
            return true;
        }
    }

    move(tile){
        if(this.tile){
            this.tile.monster = null;
            this.offsetX = this.tile.x - tile.x;
            this.offsetY = this.tile.y - tile.y;
        }
        this.tile = tile;
        tile.monster = this;
        // tile.stepOn(this);
    }
}

class Player extends Monster{
    constructor(tile){
        super(tile, spr_player);
        this.isPlayer = true;
    }
}