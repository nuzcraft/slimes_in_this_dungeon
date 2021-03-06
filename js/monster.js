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

        if(this.isPlayer){
            playSound("hit_player");
        } else {
            playSound("hit_slime");
        }
    }
    
    die(){
        this.dead = true;
        this.tile.monster = null;
        this.sprite = spr_empty;
    }

    throwPoisonBomb(other){
        // get a random tile next to the player
        let targetTile = other.tile.getAdjacentPassableNeighborWithoutMonsters()[0];
        let bomb = new PoisonBomb(targetTile);
        bomb.offsetX = this.tile.x - targetTile.x;
        bomb.offsetY = this.tile.y - targetTile.y;
        monsters.push(bomb);
    }

    throwWindGust(other){
        // get a random tile next to the player
        let targetTile = other.tile.getAdjacentPassableNeighborWithoutMonsters()[0];
        let gust = new WindGustMon(targetTile);
        gust.offsetX = this.tile.x - targetTile.x;
        gust.offsetY = this.tile.y - targetTile.y;
        monsters.push(gust);
    }

    summonLightning(){
        // summon horizontal and vertical lightnings
        let directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0]
        ];
        for (let k=0; k < directions.length; k++){
            boltTravel(directions[k], spr_lightning, this.tile);
        }
        playSound("lightning");
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
        this.poisonBombCooldown = 0;
        this.windGustCooldown = 0;
        this.lightningCooldown = 0;
    }

    tryMove(dx, dy){
        if(super.tryMove(dx, dy)){
            tick();
        }
        if (this.poisonBombCooldown > 0){
            this.poisonBombCooldown--;
        }
        if (this.windGustCooldown > 0){
            this.windGustCooldown--;
        }
        if (this.lightningCooldown > 0){
            this.lightningCooldown--;
        }
    }

    throwPoisonBomb(){
        if (this.hasMagenta && this.poisonBombCooldown == 0){
            let monster = getClosestMonster();
            super.throwPoisonBomb(monster);
            this.poisonBombCooldown = 5;
            tick();
        }
    }

    throwWindGust(){
        if (this.hasCyan && this.windGustCooldown == 0){
            // let the player place a wind gust in the direction of
            // last movement
            let newTile = player.tile.getNeighbor(player.lastMove[0], player.lastMove[1]);
            // kill any monster on the tile and summon a wind gust
            if (newTile.monster || (newTile.passable&& !newTile.isExit && !newTile.isCrystal)){
                if (newTile.monster){
                    newTile.monster.hit();
                }
                if (newTile.passable && !newTile.isExit && !newTile.isCrystal){
                    tiles[newTile.x][newTile.y] = new WindGust(newTile.x, newTile.y, 4);
                }
                this.windGustCooldown = 5;
                tick();
            }
        }
    }

    summonLightning(){
        if (this.hasYellow && this.lightningCooldown == 0){
            super.summonLightning();
            this.lightningCooldown = 10;
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

class MagentaSlime extends Monster{
    constructor(tile){
        super(tile, spr_magenta_slime);
        // give the slime an ability timer between 3 and 5 turns
        this.ability_timer = randomRange(4, 7);
    }

    tryMove(dx, dy){
        if(this.tile.dist(player.tile) < 4 && this.ability_timer == 0){
            this.throwPoisonBomb(player);
            this.ability_timer = randomRange(4, 7);
        } else {
            if (this.ability_timer > 0) {
                this.ability_timer--;
            }
            super.tryMove(dx, dy);
        }
    }
}

class CyanSlime extends Monster{
    constructor(tile){
        super(tile, spr_cyan_slime);
        // give the slime an ability timer between 3 and 5 turns
        this.ability_timer = randomRange(4, 7);
    }

    tryMove(dx, dy){
        if(this.tile.dist(player.tile) < 6 && this.ability_timer == 0){
            this.throwWindGust(player);
            this.ability_timer = randomRange(4, 7);
        } else {
            if (this.ability_timer > 0) {
                this.ability_timer--;
            }
            super.tryMove(dx, dy);
        }
    }
}

class YellowSlime extends Monster{
    constructor(tile){
        super(tile, spr_yellow_slime);
        // give the slime an ability timer between 3 and 5 turns
        this.ability_timer = randomRange(4, 7);
    }

    tryMove(dx, dy){
        if(this.ability_timer == 0){
            this.sprite = spr_yellow_slime;
            this.summonLightning();
            this.ability_timer = randomRange(4, 7);
        } else if (this.ability_timer == 1){
            // pause for a turn to charge up
            this.sprite = spr_yellow_slime_charged;
            this.ability_timer--;
        } else {
            if (this.ability_timer > 0) {
                this.ability_timer--;
            }
            super.tryMove(dx, dy);
        }
    }
}

class PoisonBomb extends Monster{
    constructor(tile){
        super(tile, spr_poison_bomb);
        this.timer = 3;
    }

    tryMove(dx, dy){
        // does not move
    }

    timesUp(){
        this.die();
    }

    die(){
        super.die();
        this.sprite = spr_poison_cloud;
        tiles[this.tile.x][this.tile.y] = new PoisonCloud(this.tile.x, this.tile.y, 3);
        tiles[this.tile.x][this.tile.y].fromBomb = true;
        playSound("explosion");
    }
}

class WindGustMon extends Monster{
    // lol this is a stupid monster that only
    // exists so we can see where the wind gust comes from
    constructor(tile){
        super(tile, spr_wind_gust);
        this.timer = 1;
        this.die();
    }

    tryMove(dx, dy){
        // does not move
    }

    timesUp(){
        this.die();
    }

    die(){
        super.die();
        this.sprite = spr_wind_gust;
        tiles[this.tile.x][this.tile.y] = new WindGust(this.tile.x, this.tile.y, 4);
    }
}