
// colors
const color_white = "#ffffff";
const color_magenta = "#FF00FF";
const color_cyan = "#00FFFF";
const color_yellow = "#FFFF00";
const color_black = "#000000";

// sprite indexes
const spr_player = 0;
const spr_wall = 1;
const spr_floor = 2;
const spr_slime = 3;
const spr_player_dead = 4;
const spr_exit_level = 5;
const spr_exit_game = 6;
const spr_magenta_crystal = 7;
const spr_cyan_crystal = 8;
const spr_yellow_crystal = 9;
const spr_magenta_exit = 10;
const spr_cyan_exit = 11;
const spr_yellow_exit = 12;
const spr_empty_crystal = 13;
const spr_magenta_wall = 14;
const spr_cyan_wall = 15;
const spr_yellow_wall = 16;
const spr_poison_cloud = 17;

var level_colors = ['magenta', 'cyan', 'yellow'];
var level_color = 'magenta';
var collected_crystals = [];
var rooms = [];

function setupCanvas() {
    // console.log("setUpCanvas started");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = tileSize * numTiles_x;
    canvas.height = tileSize * (numTiles_y + uiHeight);
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    ctx.imageSmoothingEnabled = false;
}

function drawText(text, size, centered, textX, textY, color){
    // console.log("drawTextStarted");
    ctx.fillStyle = color;
    ctx.font = size + "px serif";
    // ctx.font = size + "px monospace";
    if (centered) { // generally, print in center of whole screen
        textX = ((canvas.width - ctx.measureText(text).width) / 2) + textX;
    } else { // if not centered, put it in the ui section
        textY = canvas.height - uiHeight * tileSize + 25 + textY;
    }
    ctx.fillText(text, textX, textY);
}

function showTitle(){
    // console.log("show title started");
    ctx.fillStyle = 'rgba(0, 0, 0, .85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gameState = "title";
    drawText("There are", 40, true, 0, canvas.height / 2 - 170, color_white);
    drawText("SLIMES", 70, true, 0, canvas.height / 2 - 110, color_cyan);
    // drawText("in this DUNGEON", 40, true, 0, canvas.height / 2 - 70, color_white);
    drawText("in this                     ", 40, true, 0, canvas.height / 2 - 70, color_white);
    drawText("           DUNGEON", 40, true, 0, canvas.height / 2 - 70, color_magenta);
    drawText("Press any key to start", 20, true, 0, canvas.height / 2 - 35, color_yellow);
}

function startGame(){
    console.log("Starting game.");
    level = 1;
    level_colors = ['magenta', 'cyan', 'yellow']
    collected_crystals = [];
    startLevel();
    gameState = "running";
}

function startLevel(){
    console.log("Starting level.");
    spawnRate = 15;
    spawnCounter = spawnRate;

    // get a color for this level
    level_color = shuffle(level_colors)[0];
    // console.log(level_color);
    // remove this color from the level array
    level_colors.splice(level_colors.indexOf(level_color), 1);
    // console.log(level_colors);

    generateLevel(level_color);

    // spawn the player in the first room
    player = new Player(randomPassableTileInRoom(rooms[0]));
    console.log("Player placed in level.");
    for (var i = 0; i < collected_crystals.length; i++){
        if (collected_crystals[i] == 'magenta'){
            player.hasMagenta = true;
        } else if (collected_crystals[i] == 'cyan'){
            player.hasCyan = true;
        } else if (collected_crystals[i] == 'yellow'){
            player.hasYellow = true;
        }
    }

    // this was moved into the StepOn code for crystals
    // randomPassableTile().replace(Exit);
}

function draw() {
    if (gameState == "running" || gameState == "dead"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        screenshake();

        for(let i = 0; i < numTiles_x; i++){
            for (let j = 0; j < numTiles_y; j++){
                getTile(i, j, level_color).draw();
            }
        }

        for(let i = 0; i < monsters.length; i++){
            monsters[i].draw();
        }

        player.draw();

        // draw effects

        // draw ui
        if (player.hasMagenta){
            drawSprite(spr_magenta_crystal, 0, 9);
        } else {
            drawSprite(spr_empty_crystal, 0, 9);
        }

        if (player.hasCyan){
            drawSprite(spr_cyan_crystal, 0, 10);
        } else {
            drawSprite(spr_empty_crystal, 0, 10);
        }

        if (player.hasYellow){
            drawSprite(spr_yellow_crystal, 4, 9);
        } else {
            drawSprite(spr_empty_crystal, 4, 9);
        }

    }
}

function drawSprite(sprite, x, y) {
    ctx.drawImage(
        spritesheet,
        (sprite % 8) * 16,
        Math.floor(sprite / 8) * 16,
        16,
        16,
        x * tileSize + shakeX,
        y * tileSize + shakeY,
        tileSize,
        tileSize
    )
}

function tick(){
    for(let k=monsters.length-1;k>=0;k--){
		if(!monsters[k].dead){
			monsters[k].update();
		}else{
			monsters.splice(k, 1);
		}
    }
    // player.update();
    if (player.dead){
        gameState = "dead";
    }
    spawnCounter--;
    if (spawnCounter <= 0){
        spawnMonster();
        spawnCounter = spawnRate;
        spawnRate --;
    }
}

function screenshake(){
    if(shakeAmount){
        shakeAmount--;
    }
    let shakeAngle = Math.random()*Math.PI*2;
	shakeX = Math.round(Math.cos(shakeAngle)*shakeAmount);
	shakeY = Math.round(Math.sin(shakeAngle)*shakeAmount);
}
