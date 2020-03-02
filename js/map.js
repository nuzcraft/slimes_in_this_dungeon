
function generateLevel(color){
    // start by generating tiles on the map
    generateTiles();

    // generate monsters here
    generateMonsters();

    // generate other stuff here
    if (level < numLevels){
        generateCrystal(color);
    } else {
        randomPassableTile().replace(Exit);
    }
    
}

function generateTiles(){
    // this function will be used to generate the tiles of the map
    let passableTiles = 0;
    let minXInBounds = numTiles_x;
    let minYInBounds = numTiles_y;
    let width = 0;
    let height = 0;
    // start by building an empty room
    // get the dimensions of the room as well
    tiles = [];
    for (let i = 0; i < numTiles_x; i++){
        tiles[i] = [];
        for (let j = 0; j < numTiles_y; j++){
            if (!inBounds(i, j)){
                tiles[i][j] = new Wall(i, j);
            } else {
                minXInBounds = ((i <= minXInBounds) ? i : minXInBounds)
                minYInBounds = ((j <= minYInBounds) ? j : minYInBounds)
                width = i - minXInBounds + 1;
                height = j - minYInBounds + 1;
                tiles[i][j] = new Floor(i, j);
                passableTiles++;
            }
        }
    }

    // create a container the size of the room
    let main_container = new Container(minXInBounds, minYInBounds, width, height);
    // console.log(main_container);
    let container_tree = split_container(main_container, 4);
    // console.log(container_tree);

    // now, let's find all the space included in the tree and mark anything
    // not in those spaces as walls
    let points = [];
    points = container_tree.getIncludedPoints(points);

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

function generateCrystal(color){
    // add a switch so that we pass in the right color
    // for the right crystal
    if (color == 'magenta') {
        randomPassableTile().replace(MagentaCrystal);
    } else if (color == 'cyan'){
        randomPassableTile().replace(CyanCrystal);
    } else if (color == 'yellow'){
        randomPassableTile().replace(YellowCrystal);
    }
}
