class Monster{
    constructor(tile, sprite){
        this.move(tile);
        this.isPlayer = false;
        this.sprite = sprite;
        this.offsetX = 0;
        this.offsetY = 0;
        this.lastMove = [-1, 0];
        this.teleportCounter = 0;
        this.stunned = true;
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
            } else {
                if (this.isPlayer != newTile.monster.isPlayer){
                    this.attackedThisTurn = true;
                    newTile.monster.stunned = true;
                    newTile.monster.hit()
                    shakeAmount = 5;
                    this.offsetX = (newTile.x - this.tile.x) / 2;
                    this.offsetY = (newTile.y - this.tile.y) / 2;
                }
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
        tile.stepOn(this);
    }

    doStuff(){
        let neighbors = this.tile.getAdjacentPassableNeighbor();
        if (neighbors.length){
            neighbors.sort((a, b) => a.dist(player.tile) - b.dist(player.tile));
            let newTile = neighbors[0];
            this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
        }
    }

    update(){
        this.teleportCounter --;
        if (this.stunned || this.teleportCounter > 0){
            this.stunned = false;
            return;
        }
        this.doStuff();
    }

    hit(){
        if(this.shield > 0){
            this.shield --;
            return;
        }
        this.die();
    }
    
    die(){
        this.dead = true;
        this.tile.monster = null;
        this.sprite = spr_floor;
    }
}

class Player extends Monster{
    constructor(tile){
        super(tile, spr_player);
        this.isPlayer = true;
        this.teleportCounter = 0;
        this.stunned = false;
        this.hasMagenta = false;
        this.hasCyan = false;
        this.hasYellow = false;
    }

    tryMove(dx, dy){
        if(super.tryMove(dx, dy)){
            tick();
        }
    }

    die(){
        this.dead = true;
        this.tile.monster = null;
        this.sprite = spr_player_dead;
    }
}

class Slime extends Monster{
    constructor(tile){
        super(tile, spr_slime);
    }
}