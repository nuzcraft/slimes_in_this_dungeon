## Project Plan
### Base Game
#### Set up Architecture
This includes creating all the initial files and folders necessary to get started coding.
* create a 'slimes_in_this_dungeon' folder and link it to a new github repo **DONE**
* add an 'index.html' file and a 'js' folder to hold javascript files **DONE**
* add enough basic code to 'index.html' so that it can open in a browser **DONE**

#### Create Super-Basic Mockup
Keep it simple! We only need the basics here! I only want to see the basic game flow and player movement. This will include building an empty level to start playing with.
* create 'game.js' in the 'js' folder and add code to set up the canvas. **DONE**
* create function to draw text to the screen in game.js **DONE**
* create basic title screen in game.js **DONE**
* update index.html start at the title screen **DONE**
* update index.html to take inputs **DONE**
* update the game so that an input on the title screen will start the game **DONE**
* create a spritesheet with basic wall, floor, and player sprites **DONE**
* create map.js to hold map-related code **DONE**
* create tile.js to hold tile related code **DONE**
* update tile.js with code for each tile object **DONE**
* add basic code to map.js so that a blank floor is created of floor tile objects surrounded by a wall of wall objects **DONE**
* add code so that the tile objects are drawn to the screen **DONE**
* create monster.js to hold monster and player related code **DONE**
* add code to monster.js to create a player **DONE**
* add map code to generate a player and place them on the map **DONE**
* add code so that the player/monsters can be drawn to the screen **DONE**
* update player code so that the player can move around the empty level **DONE**
#### Super-Basic Enemies
Again, keep it simple! Start by creating the most basic of slime enemies. This will also include code to defeat enemies as well as code for them to defeat the player.
* add actual monsters to the monster.js code **DONE**
* add a new sprite for monsters to the spritesheet **DONE**
* update the level gen code to place a few monsters in the level **DONE**
* update monster code to have really basic ai **DONE**
* update code elsewhere (in game.js?) so that monsters take their turn after the player has moved **DONE**
* update monster code so that they can attack the player **DONE**
* update player code so that they can attack monsters **DONE**
* update both player and monster code to allow them to die **DONE**
* when the player dies, go back to the title screen **DONE**
* add code so that new monsters are spawned into the level on some sort of timer **DONE**
#### New Levels
Create the stairs that will lead to new levels. After X levels, create stairs to end the game.
* add code for stairs (both up and down) to tile.js (they won't be considered a monster) **DONE**
* add a sprite for stairs (both up and down) to the spritesheet **DONE**
* when the player steps on down stairs, advance to the next level **DONE**
* when the player steps on the up stairs, end the game **DONE**
* update the level gen to place down stairs in the level until the 5th level.  **DONE**
* on the 5th level, create an up stairs to end the game **DONE**
* (ADDITION) add a stun to slimes at the beginning of a level **DONE**
#### Crystal Creation
Create the crystals to be collected. Collecting them should unlock the stairs for that level.
* add code for crystals (magenta, yellow, cyan) to tile.js **DONE**
* add sprites for each to the spritesheet **DONE**
* add code for yellow, magenta, and cyan stairs to tile.js **DONE**
* add sprites for yellow, magenta, and cyan stairs to the spritesheet **DONE**
* update the level gen so that one crystal and one stairs are generated on each level. This will be the start of the color-specific level generation code **DONE**
* update the code so that the player can collect the crystals **DONE**
* update the code so that the stairs don't work unless the player has collected the crystal of that color **DONE**
#### BSP Level Gen
Update the level generation code to use BSP to create rooms and doorways.
* start with the tree and leaf architecture using rooms as the individual leaves. This will require creating some new classes. **DONE**
* code the creation of the first leaf, which should be the entire floor **DONE**
* code the subdivision of the leaves, recursively, to a specific depth. each subdivision should create 2 sub-leafs and add them to the tree. **DONE**
* once all the subdivision is complete, create the rooms on the level (altering the level generation code)
* add the individual rooms (smallest leaves) to a global room list to be used by future level generation
* ensure the player can travel between all the rooms by placing hallways (doors) in the walls connecting some adjacent rooms. It may look best to do this only between the deepest leaves instead of all leaves; this could be done using the list of rooms from the previous step
#### Update Player, Enemy, Crystal, and Stair Placement
Change the code so that these objects are placed in rooms as opposed to just looking at the floor as a whole.
* update the level generation so that it loops through each room to generate enemies (and eventually traps)
* spawn the player, stairs, and crystal in different rooms - it may be worth it to add code so that the player and crystal are spawned on opposite sides of the floor
#### MAGENTA
Aight, now we get into the specifics. Build out the special ability for Magenta, both for enemies as well as the player. Create the poison clouds and generate them in the level. Update the level generator to do Magenta-specific generation.
* add poison cloud sprite to spritesheet
* create poison cloud as a property of a tile, that will damage a player if stepped on
* add an optional timer parameter to tiles with poison clouds so that when the timer hits zero, the cloud is destroyed
* add bomb sprite to the spritesheet
* code bomb object (similar to an enemy) with a timer. When the timer hits zero, destroy the bomb and spawn a poison cloud with a timer
* create a function that will calculate the distance between two monsters
* create a function to find the closest monster
* update Magenta enemy ai so that they target the player and throw a bomb. This may be a second ai that the enemy can switch to after a certain amount of time. The player must be suitably close to the monster. The monster will target a random open tile next to the player.
* update level generation to spawn 1-3 poison clouds in a room (must be next to a wall or have no diagonally adjacent walls; this will help keep us from blocking a doorway)
* create special ability for the player to be able to toss bombs at the nearest enemy as well
#### CYAN
Now, do the same for Cyan. Additionally, add code so that the each level is randomized for the order that floors are visited in and make it so that enemies from previous levels can spawn in on subsequent levels.
* add wind gust to the sprite sheet (may be multiple angles)
* add floor spike to the sprite sheet
* create floor spike as a property of a tile that will damage the player if stepped on
* (BONUS) add a timer so that spikes retract on set intervals
* code the wind gust as a tile effect that moves the monster in a set direction by one space
* update cyan enemy ai so that they create these wind gusts on the floor to hinder the player.
* update the level genration to spawn 1-3 spikes in a room, similarly to how poison clouds were created
* create special ability for the player to be able to create wind gusts as well
* update level generation so that level are bulilt in a randomized order
* adjust code so that enemies from previous levels can spawn into the new
#### YELLOW
Now, do the same for Yellow.
* add horizontal and vertical zaps to the sprite sheet
* create code to create zaps horizontally or vertically from a source until a solid object (like a wall) is found. This should damage players and enemies
* update yellow enemy ai so they do this after a turn of charging up
* update level generation code so that additional pillars are added to individual rooms, to hide behind
* create a special ability for the player to be able to do this. It may be difficult to determine which direction the bolt should go in.
* (BONUS) add trip wires that flip on and off.
#### Exit Level
The final level should be able to spawn all types of slimes / all types of traps from previous levels.
Exiting here should end the game
* adjust the level generator to spawn all types of enemies and traps in smaller quantities in each of the rooms
* this level will not spawn a crystal, but instead unlocked stairs
* exiting ends the game!

### Stretch Goals
If everything above has been completed, we can consider the jam a success. Everything below this is extra and should only be worked on if there is extra time.
#### Sprite Updates
Make changes to sprites to make them look nicer or mesh better. This can include creating and adding in new sprites.
#### Sound Effects and Music
Add sound effects for attacks, special abilities, movement etc. as well as a background track.
#### RED
Create the Red level and integrate it into the game
#### BLUE
Create the blue level and integrate it into the game
#### GREEN
Create the green level and integrate it into the game
#### Advanced AI
Give the slimes a bit more advanced AI. A* pathfinding is a good start.
#### Title Screen
Give the title screen a nice background and spruce it up a little bit
#### Animations
Give the player and slimes little two-frame animations and maybe attack animations.
#### Game Over Screen
Create it / make it better
#### Instructions Page
Create an instructions page for people to reference
#### Story?
Give the game a bit of story? probably just when the game begins and ends
