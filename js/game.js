
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
    ctx.fillSytle = 'rgba(75, 75, 75, .85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gameState = "title";
    drawText("There are", 40, true, 0, canvas.height / 2 - 170, color_white);
    drawText("SLIMES", 70, true, 0, canvas.height / 2 - 110, color_cyan);
    // drawText("in this DUNGEON", 40, true, 0, canvas.height / 2 - 70, color_white);
    drawText("in this                     ", 40, true, 0, canvas.height / 2 - 70, color_white);
    drawText("           DUNGEON", 40, true, 0, canvas.height / 2 - 70, color_magenta);
    drawText("WASD keys to start", 20, true, 0, canvas.height / 2 - 35, color_yellow);
}

function startGame(){
    console.log("Starting game.");
    startLevel();
    gameState = "running";
}

function startLevel(){
    console.log("Starting level.");

    generateLevel();

    player = new Player(randomPassableTile());
    console.log("Player placed in level.");

}

function draw() {
    if (gameState == "running" || gameState == "dead"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < numTiles_x; i++){
            for (let j = 0; j < numTiles_y; j++){
                getTile(i, j).draw();
            }
        }

        player.draw();

    }
}

function drawSprite(sprite, x, y) {
    ctx.drawImage(
        spritesheet,
        (sprite % 8) * 16,
        Math.floor(sprite / 8) * 16,
        16,
        16,
        x * tileSize,
        y * tileSize,
        tileSize,
        tileSize
    )
}
