# There are Slimes in this Dungeon
This is the code for my 2020 7DRL attempt: There are Slimes in this Dungeon
 
## Design
### Title - There are Slimes in this Dungeon
#### Premise
The player is tasked with venturing down in to a dungeon filled with slimes to collect the 3 COLOR crystals. Each crystal will grant player new abilities, but will also empower the slimes of the dungeon. Collect all 3 and exit to win.
#### Requirements
The game will only be considered complete when:
* The player can move around the dungeon
* the player can fight and defeat multiple types of slimes
* the player can collect all 3 color crystals
* the color crystals grant special abilities when gathered
* the player can exit once 3 color crystals have been gathered
#### Flow
The game will be relatively short, with only a few actual dungeon levels. Ideally, each of the levels will be slightly different every time you play.
1. Title Screen -> Press any key to continue
2. _Optional_ Introduction. This can likely be lumped in with the Title Screen, but should be someone telling you why you need to go into the dungeon in the first place.
4. 1st Level -> level is built with a random theme (color), the player navigates a new level. Slimes here have abilities that the player will have to learn to avoid. There will be treasure to collect (for points) and a crystal to pick up. Once the crystal is picked up, the player gets a new ability. The level ends when the play steps on the stairs after collecting the crystal.
4. _Optional_ after gathering a crystal, display a message letting the player know that slimes of that color will no appear later in the dungeon
6. 2nd - 6th Level -> another random theme, the player navigates a new level. Slimes will have abilities from this level. And new slimes from the previous level have a chance of spawning in. Once the crystal is picked up, the player gets a new ability. The level ends when the player steps on the stairs after collecting the crystal.
9. 7th Level -> escape with the crystals! This level is a grab bag of all slimes and the player has all abilities. When the player reaches the stairs, the game is over!
#### Decisions / Specifics
There are a number of design elements for the game that are objective or replaceable or fudgy. These decisions should help lead the design, but can be changed at any time.
* The map itself should be relatively small, like 9x13 or 11x15 or something.
* Related to above, I want the map to be more rectanular than square, with more space to move horizontally than vertically
* UI elements (like score, crystal indicators, spell availability) should all be at the bottom of the screen. This way they are a) unintrusive and b) different from the other game I made recently.
* Dungeon generation should use Binary Space Partitioning (or similar) (if possible). I like the idea of rooms filling the entire space with only walls and doorways.
* This means dungeons should be procedurally generated.
* Each colored dungeon floor will have its own pseudo-theme. Walls, slimes, traps, will all be centered around this theme. The special ability granted to a player by collecting the crystal from a colored floor should mirror the theme of the floor. 
* Starter colors are Cyan, Magenta, Yellow; blends are Red, Blue, Green. Each have their own specific themes.
* Sprites will be from Quale, recolored by me.
* The majority of the game will be written in javascript. I will be using my previous project (Row Jam Brough) and @humbit's JS Broughlike tutorial as a jumping off point for the majority of my code.
* movement will be orthoganol (no diagonals)
* special abilities will be activated by the number keys
* slimes will have simple bump to attack mechanics. Their special abilities will have a cooldown time
* slime ai will be very simple (move towards player) stretch goal will be to have more sophisticated movement patterns
* adding a small amount of animation will be a stretch goal
* adding scores and high scores will be a stretch goal as well
##### Colors and abilities
###### Cyan
Cyan enemies have wind gusts or force push as an ability
* 3 turn cooldown?
* The cyan level will have spikes on the floor that the player will need to avoid (and not be force pushed into)
* Once the Cyan crystal is collected, the player gets force push
###### Magenta
Magenta enemies will throw poison bombs that explode a turn or two after they land. The poison cloud lingers for a turn or 2 before disappearing.
* 3 turn cooldown?
* The magenta level will have permanent poison clouds all around
* once the magenta crystal is collected, the player gets to throw a poison bomb at the nearest enemy. Bonus points if player bombs aren't harmful to the player.
###### Yellow
Yellow enemies can zap along the x or y axis.
* They must come to a full stop, charge up for a turn
* 5 turn cooldown?
* Electric tripwires on the floor? that activate and deactivate on a set timer
* add additinal pillars to the rooms to block bolts
* the player ability will be to zap in a direction
###### Blue
Enemies have a shield that blocks a single attack.
Blue is achieved by mixing Magenta and Cyan
* the player ability is a shield. I'm not sure if this is a permanent or regenerating shield, or if they have to push the button for it.
###### Red
Enemies will throw bombs. 2 Ideas
* bombs blow up in a large x or + pattern
* or bombs that leave fire spots that dwindle after some time
* add periodic gouts of fire from the walls or floor
* 3 turn cooldown.
Red is achieved by mixing Magenta and Yellow
###### Green
green enemies can attack 2 spaces away, but not through creatures or walls.
* this could be implemented by letting them move twice sometimes / giving them a free turn
* 3 turn cooldown.
* add speedy and slow spaces to the floor / spaces that make you miss a turn or give you an extra turn

## Project Plan
### Set up Architecture
This includes creating all the initial files and folders necessary to get started coding.
### Create Super-Basic Mockup
Keep it simple! We only need the basics here! I only want to see the basic game flow and player movement. This will include building an empty level to start playing with.
### Super-Basic Enemies
Again, keep it simple! Start by creating the most basic of slime enemies. This will also include code to defeat enemies as well as code for them to defeat the player.
### New Levels
Create the stairs that will lead to new levels. After X levels, create stairs to end the game.
### Crystal Creation
Create the crystals to be collected. Collecting them should unlock the stairs for that level.
### BSP Level Gen
Update the level generation code to use BSP to create rooms and doorways.
### Update Player, Enemy, Crystal, and Stair Placement
Change the code so that these objects are placed in rooms as opposed to just looking at the floor as a whole.
### MAGENTAAAA
Aight, now we get into the specifics. Build out the special ability for Magenta, both for enemies as well as the player. Create the poison clouds and generate them in the level. Update the level generator to do Magenta-specific generation.
### CYANNNNN
Now, do the same for Cyan. Additionally, add code so that the each level is randomized for the order that floors are visited in and make it so that enemies from previous levels can spawn in on subsequent levels.
### YELLOOWWW
Now, do the same for Yellow.

## Changelog
### 2020.02.10 Design Changes
Over the weekend, I was thinking about this and decided that I'm going to move away from the level select idea. I think it adds unnecessary tedium for very little gain. The original idea was that you could define your run by choosing your path, but the reality is that the game isn't long enough for that. Instead, levels will come out randomly and new levels will be able to spawn enemies from previous levels. I also started setting out task groups for the project plan. This is starting to come together!!
### 2020.02.07 Color Specifics
I defined some the the specifics to the different colors I want to use.
### 2020.02.06 Game Flow
Today, I started working on the game flow. Basically, the player will go through a couple different dungeon levels collection crystals. The crystals will grant special abilities. After collecting all 3, they have to escape. There's a level selector that sits between the levels. I also added some Decisions that can be used to help drive design in the direction I'm thinking.
### 2020.02.04 Starting the Design
This will be my first attempt at a 7DRL and I'm terrified. I've tried a couple other game jams in the past (GM48) with little success, mostly due to a lack of time, but also due to a lack of experience. This README will comprise all the normal README garbage, but will also be my design document as I begin planning my week of development. I'm very excited! My idea for a game is _really simple_ and I think thats the best way to go for my first try. I'll be coming up with a pseudo-timeline as well as plan extra features in case things go better than expected (they won't).
