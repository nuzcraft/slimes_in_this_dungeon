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
The game will be relatively short, with only 4 actual dungeon levels. Ideally, each of the 4 levels will be slightly different every time you play.
1. Title Screen -> Press any key to continue
2. _Optional_ Introduction. This can likely be lumped in with the Title Screen, but should be someone telling you why you need to go into the dungeon in the first place.
3. Level Select -> Three downward staircases lead to 3 different levels of the dungeon. The player can choose which to go down. Staircases are color-coded: Yellow, Magenta, Cyan. No slimes? 1 or 2? _Optional_ give the player instructions about how to bump and defeat slimes.
4. 1st Level -> based on the staircase chosen, the player navigates a new level. Slimes here have abilities that the player will have to learn to avoid. There will be treasure to collect (for points) and a crystal to pick up. Once the crystal is picked up, the level ends.
4. _Optional_ after gathering a crystal, display a message letting the player know that slimes have been upgraded
5. Level Select -> the previous staircase is now gone (or blocked off/greyed out) and the player chooses a new one.
6. 2nd Level -> based on the staircase chose, the player navigates a new level. Slimes will have abilities from this level _and_ a new mix of this level and the previous. The player will have a new ability as well. Once the crystal is picked up, the level ends.
7. Level Select -> the player must choose the final staircase.
8. 3rd Level -> the player will navigate a new level from the final color. Slimes will have abilities from this level and a mix of this one and the previous. The player will have 2 new abilities (one from the previous level and one a mix of both previous levels). Once the crystal is picked up, the level ends.
9. 4th Level -> escape with the crystals! This level is a grab bag of all slimes and the player has all abilities. When the player reaches the stairs, the game is over!
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

## Changelog
### 2020.02.06 Game Flow
Today, I started working on the game flow. Basically, the player will go through a couple different dungeon levels collection crystals. The crystals will grant special abilities. After collecting all 3, they have to escape. There's a level selector that sits between the levels. I also added some Decisions that can be used to help drive design in the direction I'm thinking.
### 2020.02.04 Starting the Design
This will be my first attempt at a 7DRL and I'm terrified. I've tried a couple other game jams in the past (GM48) with little success, mostly due to a lack of time, but also due to a lack of experience. This README will comprise all the normal README garbage, but will also be my design document as I begin planning my week of development. I'm very excited! My idea for a game is _really simple_ and I think thats the best way to go for my first try. I'll be coming up with a pseudo-timeline as well as plan extra features in case things go better than expected (they won't).
