
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
    let container_tree = split_container(main_container, 3);
    // console.log(container_tree);

    // add all the leaves to an array
    rooms = shuffle(container_tree.getLeafs())
    // console.log(rooms);

    // now, let's find all the space included in the tree and mark anything
    // not in those spaces as walls
    let points = [];
    points = container_tree.getIncludedPoints(points);

    // now let's connect the rooms and add those hallways to the 'points'
    for(let i = 0; i < rooms.length - 1; i++) {
        let center1 = rooms[i].center
        let center2 = rooms[i+1].center
        let horiz = randomRange(0, 1);

        // if horizontal, start with a horizontal tunnel
        if (horiz == 1){
            let x1 = Math.min(center1.x, center2.x);
            let x2 = Math.max(center1.x, center2.x);
            let y = center1.y;
            for (let j = x1; j <= x2; j++){
                points.push([j, y]);
            }
            let y1 = Math.min(center1.y, center2.y);
            let y2 = Math.max(center1.y, center2.y);
            let x = center2.x;
            for (let k = y1; k <= y2; k++){
                points.push([x, k]);
            }
        } else if (horiz == 0){
            let y1 = Math.min(center1.y, center2.y);
            let y2 = Math.max(center1.y, center2.y);
            let x = center1.x;
            for (let k = y1; k <= y2; k++){
                points.push([x, k]);
            }
            let x1 = Math.min(center1.x, center2.x);
            let x2 = Math.max(center1.x, center2.x);
            let y = center2.y;
            for (let j = x1; j <= x2; j++){
                points.push([j, y]);
            }
        }
    }
   
    // now we actually create walls and floors
    for(let i=0;i<numTiles_x;i++){
        tiles[i]=[];
        for(let j=0;j<numTiles_y;j++){
            let inPoints = false;
            for (let k = 0; k < points.length; k++){
                if (points[k][0] === i && points[k][1] ===j){
                    inPoints = true;
                }
            }
            if(!inBounds(i, j) || !inPoints){ // removed the 30% for a wall
                tiles[i][j] = new Wall(i, j);
            }else{
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

function randomPassableTileInRoom(room){
    let tile;
    tryTo('get random passable tile', function(){
        let x = randomRange(room.x, room.x + room.w - 1);
        let y = randomRange(room.y, room.y + room.h - 1);
        tile = getTile(x, y);
        return tile.passable && !tile.monster;
    })
    return tile;
}

function generateMonsters(){
    monsters = [];
    // start with i = 1 bc room 1 is where the player will start
    for(let i = 1; i < rooms.length; i++){
        let numMonsters = randomRange(0, 2);
        for(let j = 0; j < numMonsters; j++){
            spawnMonsterInRoom(rooms[i]);
        }
    }
}

function spawnMonster(){
    let monster = new Slime(randomPassableTile());
    monsters.push(monster);
}

function spawnMonsterInRoom(room){
    let monster = new Slime(randomPassableTileInRoom(room));
    monsters.push(monster);
}

function generateCrystal(color){
    // add a switch so that we pass in the right color
    // for the right crystal

    // choose the room to spawn the crystal in, not in room[0]
    let i = randomRange(1, rooms.length - 1);
    if (color == 'magenta') {
        randomPassableTileInRoom(rooms[i]).replace(MagentaCrystal);
    } else if (color == 'cyan'){
        randomPassableTileInRoom(rooms[i]).replace(CyanCrystal);
    } else if (color == 'yellow'){
        randomPassableTileInRoom(rooms[i]).replace(YellowCrystal);
    }
}
