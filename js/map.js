
function generateLevel(){
    // start by generating tiles on the map
    generateTiles();

    // generate monsters here
    generateMonsters();

    // generate other stuff here
}

function generateTiles(){
    // this function will be used to generate the tiles of the map
    let passableTiles = 0;
    tiles = [];
    for (let i = 0; i < numTiles_x; i++){
        tiles[i] = [];
        for (let j = 0; j < numTiles_y; j++){
            if (!inBounds(i, j)){
                tiles[i][j] = new Wall(i, j);
            } else {
                tiles[i][j] = new Floor(i, j);
                passableTiles++;
            }
        }
    }

    return passableTiles;
}

function inBounds(x, y){
    // thiw will return true if inside the border
    return x > 0 && y > 0 && x < numTiles_x - 1 && y < numTiles_y - 1;
}

function getTile(x, y){
    if(inBounds(x, y)){
        return tiles[x][y];
    } else {
        var wall = new Wall(x, y);
        wall.sprite = spr_wall;
        return wall;
    }
}

function randomPassableTile(){
    let tile;
    tryTo('get random passable tile', function(){
        let x = randomRange(0, numTiles_x - 1);
        let y = randomRange(0, numTiles_y - 1);
        tile = getTile(x, y);
        return tile.passable && !tile.monster;
    })
    return tile;
}

function generateMonsters(){
    monsters = [];
    const numMonsters = 3;
    console.log(numMonsters + " monsters will be generated.");
    for (let i = 0; i < numMonsters; i++){
        spawnMonster();
    }
}

function spawnMonster(){
    let monster = new Slime(randomPassableTile());
    monsters.push(monster);
}
