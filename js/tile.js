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
        // does nothing for now
    }
}

class Wall extends Tile {
    constructor(x, y){
        super(x, y, spr_wall, false);
        // set the sprite based on the color of the level
        if (level_color == 'magenta'){
            this.sprite = spr_magenta_wall;
        } else if (level_color == 'cyan'){
            this.sprite = spr_cyan_wall;
        } else if (level_color == 'yellow'){
            this.sprite = spr_yellow_wall;
        }
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

class MagentaExit extends Tile{
    constructor(x, y){
        super(x, y, spr_magenta_exit, true);
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

class CyanExit extends Tile{
    constructor(x, y){
        super(x, y, spr_cyan_exit, true);
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

class YellowExit extends Tile{
    constructor(x, y){
        super(x, y, spr_yellow_exit, true);
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

class MagentaCrystal extends Tile {
    constructor(x, y){
        super(x, y, spr_magenta_crystal, true);
    }

    stepOn(monster){
        // spawn the exit
        if (monster.isPlayer){
            randomPassableTile().replace(MagentaExit);
            // remove the crystal from the floor
            this.replace(Floor);
            this.monster = monster;
            // add the crystal to the player
            monster.hasMagenta = true;
            collected_crystals.push("magenta");
        }
    }
}

class CyanCrystal extends Tile {
    constructor(x, y){
        super(x, y, spr_cyan_crystal, true);
    }

    stepOn(monster){
        // spawn the exit
        if (monster.isPlayer){
            randomPassableTile().replace(CyanExit);
            // remove the crystal from the floor
            this.replace(Floor);
            this.monster = monster;
            // add the crystal to the player
            monster.hasCyan = true;
            collected_crystals.push("cyan");
        }
    }
}

class YellowCrystal extends Tile {
    constructor(x, y){
        super(x, y, spr_yellow_crystal, true);
    }

    stepOn(monster){
        // spawn the exit
        if (monster.isPlayer){
            randomPassableTile().replace(YellowExit);
            // remove the crystal from the floor
            this.replace(Floor);
            this.monster = monster;
            // add the crystal to the player
            monster.hasYellow = true;
            collected_crystals.push("yellow");
        }
    }
}

class PoisonCloud extends Floor {
    constructor(x, y, timer=null){
        super(x, y);
        this.sprite = spr_poison_cloud;
        this.timer = timer;
    }

    stepOn(monster){
        monster.hit();
    }

    timesUp(){
        // destroy this poison cloud
        this.replace(Floor);
        // if not from a bomb, spawn a new cloud
        if (!this.fromBomb){
            let tile = randomPassableTile();
            tiles[tile.x][tile.y] = new PoisonCloud(tile.x, tile.y, randomRange(5, 10));
        }
    }
}
