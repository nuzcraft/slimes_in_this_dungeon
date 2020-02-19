## Project Plan
### Base Game
#### Set up Architecture
This includes creating all the initial files and folders necessary to get started coding.
* create a 'slimes_in_this_dungeon' folder and link it to a new github repo *DONE*
* add an 'index.html' file and a 'js' folder to hold javascript files 
* add enough basic code to 'index.html' so that it can open in a browser 

#### Create Super-Basic Mockup
Keep it simple! We only need the basics here! I only want to see the basic game flow and player movement. This will include building an empty level to start playing with.
* create 'game.js' in the 'js' folder and add code to set up the canvas. 
* create function to draw text to the screen in game.js 
* create basic title screen in game.js 
* update index.html start at the title screen 
* update index.html to take inputs 
* update the game so that an input on the title screen will start the game
* create a spritesheet with basic wall, floor, and player sprites
* create map.js to hold map-related code
* create tile.js to hold tile related code
* update tile.js with code for each tile object
* add basic code to map.js so that a blank floor is created of floor tile objects surrounded by a wall of wall objects
* add code so that the tile objects are drawn to the screen
* create monster.js to hold monster and player related code
* add code to monster.js to create a player
* add map code to generate a player and place them on the map
* add code so that the player/monsters can be drawn to the screen
* update player code so that the player can move around the empty level
* add code to end the game, probably with an obsure key press (-)
#### Super-Basic Enemies
Again, keep it simple! Start by creating the most basic of slime enemies. This will also include code to defeat enemies as well as code for them to defeat the player.
* add actual monsters to the monster.js code
* add a new sprite for monsters to the spritesheet
* update the level gen code to place a few monsters in the level
* update monster code to have really basic ai
* update code elsewhere (in game.js?) so that monsters take their turn after the player has moved
* update monster code so that they can attack the player
* update player code so that they can attack monsters
* update both player and monster code to allow them to die
* when the player dies, go back to the title screen
* add code so that new monsters are spawned into the level on some sort of timer
#### New Levels
Create the stairs that will lead to new levels. After X levels, create stairs to end the game.
* add code for stairs (both up and down) to tile.js (they won't be considered a monster)
* add a sprite for stairs (both up and down) to the spritesheet
* when the player steps on down stairs, advance to the next level
* when the player steps on the up stairs, end the game
* update the level gen to place down stairs in the level until the 5th level. 
* on the 5th level, create an up stairs to end the game
#### Crystal Creation
Create the crystals to be collected. Collecting them should unlock the stairs for that level.
* add code for crystals (magenta, yellow, cyan) to tile.js
* add sprites for each to the spritesheet
* add code for yellow, magenta, and cyan stairs to tile.js
* add sprites for yellow, magenta, and cyan stairs to the spritesheet
* update the level gen so that one crystal and one stairs are generated on each level. This will be the start of the color-specific level generation code
* update the code so that the player can collect the crystals
* update the code so that the stairs don't work unless the player has collected the crystal of that color
#### BSP Level Gen
Update the level generation code to use BSP to create rooms and doorways.
* start with the tree and leaf architecture using rooms as the individual leaves. This will require creating some new classes.
* code the creation of the first leaf, which should be the entire floor
* code the subdivision of the leaves, recursively, to a specific depth. each subdivision should create 2 sub-leafs and add them to the tree.
* once all the subdivision is complete, create the rooms on the level (altering the level generation code)
* add the individual rooms (smallest leaves) to a global room list to be used by future level generation
* ensure the player can travel between all the rooms by placing hallways (doors) in the walls connecting some adjacent rooms. It may look best to do this only between the deepest leaves instead of all leaves.
#### Update Player, Enemy, Crystal, and Stair Placement
Change the code so that these objects are placed in rooms as opposed to just looking at the floor as a whole.
#### MAGENTA
Aight, now we get into the specifics. Build out the special ability for Magenta, both for enemies as well as the player. Create the poison clouds and generate them in the level. Update the level generator to do Magenta-specific generation.
#### CYAN
Now, do the same for Cyan. Additionally, add code so that the each level is randomized for the order that floors are visited in and make it so that enemies from previous levels can spawn in on subsequent levels.
#### YELLOW
Now, do the same for Yellow.
#### Exit Level
The final level should be able to spawn all types of slimes / all types of traps from previous levels.
Exiting here should end the game

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
