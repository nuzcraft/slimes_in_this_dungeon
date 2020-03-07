
// colors
const color_white = "#ffffff";
const color_magenta = "#FF00FF";
const color_cyan = "#00FFFF";
const color_yellow = "#FFFF00";
const color_black = "#000000";
const color_dark_grey = "#555555";

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
const spr_empty = 18;
const spr_poison_bomb = 19;
const spr_magenta_slime = 20;
const spr_cyan_slime = 21;
const spr_yellow_slime = 22;
const spr_wind_gust = 23;
const spr_spikes = 24;
const spr_lightning = 25;
const spr_yellow_slime_charged = 26;

var level_colors = ['magenta', 'cyan', 'yellow'];
var level_color = 'magenta';
var collected_crystals = [];
var rooms = [];
var monsters = [];

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
        // textY = canvas.height - uiHeight * tileSize + 25 + textY;
    }
    ctx.fillText(text, textX, textY);
}

function showTitle(){
    // console.log("show title started");
    ctx.drawImage(title, 0, 0);
    ctx.fillStyle = 'rgba(0, 0, 0, .75)';
    ctx.fillRect(canvas.width / 3.5, canvas.height / 7, canvas.width / 2.33, canvas.height / 2.5);
    gameState = "title";
    drawText("There are", 40, true, 0, canvas.height / 2 - 170, color_white);
    drawText("SLIMES", 70, true, 0, canvas.height / 2 - 110, color_cyan);
    // drawText("in this DUNGEON", 40, true, 0, canvas.height / 2 - 70, color_white);
    drawText("in this                     ", 40, true, 0, canvas.height / 2 - 70, color_white);
    drawText("           DUNGEON", 40, true, 0, canvas.height / 2 - 70, color_magenta);
    drawText("Press any key to start", 20, true, 0, canvas.height / 2 - 35, color_yellow);
}

function showGameOver(){
    ctx.fillStyle = 'rgba(0, 0, 0, .75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameover, 0, 0);
    gameState = 'gameover';
}

function showWinScreen(){
    ctx.fillStyle = 'rgba(0, 0, 0, .75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(win, 0, 0);
    gameState = 'win';
}

function startGame(){
    console.log("Starting game.");
    level = 1;
    level_colors = ['magenta', 'cyan', 'yellow']
    collected_crystals = [];
    startLevel();
    gameState = "running";

    if (background_audio == 0){
        let background = new Audio('sounds/Lately_Kind_of_Yeah_-_04_-_Exit_Only.mp3');
        background.currentTime = 0;
        background.play();
        background.loop = true;
        background.volume = .5;
        background_audio = 1;
    }
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
    // player.hasYellow = true; // for debugging
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
        for(let i = 0; i < numTiles_x; i++){
            for (let j = 0; j < numTiles_y; j++){
                getTile(i, j, level_color).drawEffect();
            }
        }

        // draw ui
        if (player.hasMagenta){
            drawSprite(spr_magenta_crystal, 0, 9);
            let textColor = color_dark_grey;
            if (player.poisonBombCooldown == 0){
                textColor = color_magenta;
            }
            drawText("(1)", 28, false, 56, 9*64+36, textColor);
            drawText("Throw Poison Bomb",20, false, 90, 9*64+28, textColor);
            drawText("at nearest enemy", 20, false, 94, 9*64+44, textColor);
        } else {
            drawSprite(spr_empty_crystal, 0, 9);
        }

        if (player.hasCyan){
            drawSprite(spr_cyan_crystal, 0, 10);
            let textColor = color_dark_grey;
            if (player.windGustCooldown == 0){
                textColor = color_cyan;
            }
            drawText("(2)", 28, false, 56, 10*64+36, textColor);
            drawText("Summon Tornado",20, false, 90, 10*64+28, textColor);
            drawText("in front of you", 20, false, 98, 10*64+44, textColor);
            drawText("(based on last movement)", 14, false, 86, 10*64+57, textColor);
        } else {
            drawSprite(spr_empty_crystal, 0, 10);
        }

        if (player.hasYellow){
            drawSprite(spr_yellow_crystal, 4, 9);
            let textColor = color_dark_grey;
            if (player.lightningCooldown == 0){
                textColor = color_yellow;
            }
            drawText("(3)", 28, false, 5*64, 9*64+36, textColor);
            drawText("Summon LIGHTNING",20, false, 5*64+44, 9*64+28, textColor);
            drawText("horizontally and vertically", 20, false, 5*64+36, 9*64+44, textColor);
            // drawText("(based on last movement)", 14, false, 86, 10*64+57, textColor);
        } else {
            drawSprite(spr_empty_crystal, 4, 9);
        }

        // draw the instructions there at the bottom
        drawText("Use the W,A,S,D keys to move around.", 25, false, 4*64, 10*64+16, color_white);
        drawText("Use the number keys to use abilities.", 25, false, 4*64, 10*64+48, color_white);
        drawText("Collect the CRYSTALS", 18, false, 10*64+16, 9*64+28, color_white);
        drawText("and", 18, false, 11*64-16+8, 9*64+48, color_white);
        drawText("ESCAPE", 18, false, 11*64+16+8, 9*64+48, color_magenta);
        drawText("the", 18, false, 11*64-24+8, 10*64+4, color_white);
        drawText("DUNGEON", 18, false, 11*64+8, 10*64+4, color_cyan);
        drawText("of", 18, false, 11*64-8+8, 10*64+16+8, color_white);
        drawText("SLIMES", 18, false, 11*64+12+8, 10*64+16+8, color_yellow);
        // drawText("of !")
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
    // let monsters take their turn / remove dead monsters
    for(let k=monsters.length-1;k>=0;k--){
		if(!monsters[k].dead){
            monsters[k].update();
            // monsters[k].throwPoisonBomb();
            if (monsters[k].timer){
                monsters[k].timer--;
                if (monsters[k].timer == 0){
                    monsters[k].timesUp();
                }
            }
		}else{
			monsters.splice(k, 1);
		}
    }

    // player.update();
    if (player.dead){
        gameState = "dead";
    }

    // spawn new monsters in the level
    spawnCounter--;
    if (spawnCounter <= 0){
        spawnMonster();
        spawnCounter = spawnRate;
        spawnRate --;
    }

    // check for tiles that run on a timer
    for(let i = 0; i < numTiles_x; i++){
        for (let j = 0; j < numTiles_y; j++){
            let tile = getTile(i, j, level_color);
            if (tile.timer){
                tile.timer--;
                if (tile.timer == 0){
                    tile.timesUp();
                }
            }
        }
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

function getClosestMonster(){
    let dist = 100; // arbitrary large distance
    var monster
    for (let i = 0; i < monsters.length; i++){
        if (player.tile.dist(monsters[i].tile) < dist && monsters[i] != player){
            dist = player.tile.dist(monsters[i].tile);
            monster = monsters[i];
        }
    }
    return monster
}

function boltTravel(direction, effect, start_tile){
    let newTile = start_tile;
    while (true){
        let testTile = newTile.getNeighbor(direction[0], direction[1]);
        if(testTile.passable){
            newTile = testTile;
            if (newTile.monster){
                newTile.monster.hit();
            }
            newTile.setEffect(effect);
        } else {
            break;
        }
    }
}

function initSounds(){
    sounds = {
        hit_player: new Audio('sounds/player_hit.wav'),
        hit_slime: new Audio('sounds/slime_hit.wav'),
        cast_tornado: new Audio('sounds/cast_tornado.wav'),
        collect_gem: new Audio('sounds/collect_gem.wav'),
        eh_something: new Audio('sounds/eh something.wav'),
        explosion: new Audio('sounds/explosion.wav'),
        lightning: new Audio('sounds/lightning.wav'),
        new_level: new Audio('sounds/new_level.wav'),
    };
}

function playSound(soundName){
    sounds[soundName].currentTime = 0;
    sounds[soundName].volume = .75;
    sounds[soundName].play();
}
