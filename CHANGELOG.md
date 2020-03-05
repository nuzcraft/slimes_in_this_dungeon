## Changelog
### 2020.03.05 Day 6!
* 6:50 AM, I've got 10 mins till work starts. I'm gonna try to switch the wind gusts to act more like walls, and allow the player to place them around them instead of firing them at enemies.
* Okay, I'm much happier with this setup, it feels less like a cop out and a copy of throwing poison bombs.
### 2020.03.04 Day 5!
* 1:37 PM, HOLY CANOLI DAY 5 ALREADY. Also, I've not been able to do ANY work on this today (besides write this note). My fingers are crossed that I'll get time tonight... I'm definitely glad that I structured my project plan so that I could piecemeal this out...I'll be lucky to finish the cyan and yellow levels by the end at this rate (which was my minimum viable product!!)
* In my mind, cyan and yellow should be quicker, but I could run into issues.
* 9 PM, once again, lots of chores. But, I've got an IPA and am ready to rock!
* Fuck, that felt like a struggle. For now, the Magenta level is complete!!
* Okay, I doubled down, spent a little extra time, and got the Cyan level finished! I'm not super stoked about how the wind gusts work, but I might have time to fix them later (it might be easy if they just push the monster or player to their previous position, AKA a wall with a tick). Tomorrow is Yellow day + the start of polish.
* NOTE: there is a bug where things like poison clouds and bombs can delete crystals and exits, which is bad and should be fixed.
* Total Dev Time - 2 hrs
### 2020.03.03 Day 4!
* 6:30, got to work early again!
* made some progress getting poison clouds working...I may make them their own tile similar to crystals, not sure tho
* 45 mins
* 9 PM. I had a lot of chores to do before I could get started. Honestly, this 7DRL couldn't have fallen on a worse week! We are packing up the house to move! Super exciting! but also, lots of fucking work.
* Things are starting to slow... I got most of the logic set up for poison bombs and clouds, but still have to set it up so that enemies and players can use them. It's kind of amazing, but just adding the poison clouds has made the magenta level so much more dynamic. Tomorrow, I'll finish up the magenta level and start on Cyan.
* 1.5 hrs
* Total Dev Time - 2.25 hrs
### 2020.03.02 Day 3!
* 6:40, got to work a bit early, will hopefully get 20-30 mins of work in, then an hour or so at lunch.
* 20 mins, made a little progress, but nothing to mention.
* Okay, so, I had to leave work early and work from home because I barfed 🤮 I'm not sick! My kids had the flu last week and I'm on Tamiflu to keep from being infected and it apparently doesn't sit well with an empty stomach...it was awful. So, I worked through lunch instead, I'll have to try to make up this time tonight. The goal: complete BSP level generation!
* 8:40 PM, getting started again!
* Wow, really good progress tonight. Level gen is complete! There will likely be some tweaks, I'm probably going to try to expand the map size to accomodate everything, but it looks great for now!
* rooms are created, and enemies are spawned in rooms. The player is placed in one room with no enemies, and the crystal is placed in a different room
* 1 hr 20 mins
* Total Dev Time: 1 hr 40 min
### 2020.03.01 Day 2!
* 5:00 AM, up early! I was hoping to get some dev time in before the family wakes up, and it worked out!
* I finished a couple sections of the project plan:
* added enemies
* gave them simple ai
* added combat (one hit kills)
* added level exits
* TECHNICALLY it's now a game! It has a start, gameplay with a goal, and an end. There's lots more to do though! The next step is to add the collectible crystals and the gameplay mechanic where they will unlock the stairs.
* 1.25 hrs
* 8:30 PM (ish) I'm back!! I can't remember where we're starting tho 😅
* aight! great progress tonight!! I got it set up so the player can collect crystals and use them to advance to the next level. There are currently 3 crystals to collect then a final floor to escape the dungeon. Since enemy ai is pretty simple and the player can only bump attack, its actually pretty hard to win!
* I'll be uploading a Day 2 build to itch.io today as well.
* 2 hours
* Total Dev Time: 3.25 hours
### 2020.02.29 Day 1 begins!
* 5:30 AM, 7DRL has begun!!
* 7 WHOLE MINUTES OF WORK before I had to stop to help deal with a kid 😑
* I made good progress for only ~45 mins of time spent. I've got a working title screen and the start of something good! I grabbed the spritesheet from Row Jam Brough for now, but that will be replaced with a new one when I get there. So exciting!!
* 45 mins
* 8:30 PM (ish), I got back into this. There were a couple interruptions, and I was watching the Monster Hunter US Championship (which was awesome).
* Despite that, I made good progress. We've got a player that can move around an empty level. The next step is to add some slimes and start buildig out basic combat. I'm also going to upload my first build to itch.io (which will take 10-15 mins)
* 1.5 hrs
* Total Dev Time - 2.25 hrs
### 2020.02.18 Some Smaller Tasks
I started the process of creating tasks for each of the different sections of the project. This should be very helpful on deciding what to work on at each point of the process. Obviously, these will flow and adjust once the coding has started. I also split the README out into a few different files - readme, changelog, design, and project_plan. Hopefully this will help with organization and allow the readme to be a lot smaller.
### 2020.02.13 Stretch Goals
I finished up the required task groups and started looking at what stretch goals would be. The next step is start defining tasks and figuring out how long I think this is gonna take. 
### 2020.02.10 Design Changes
Over the weekend, I was thinking about this and decided that I'm going to move away from the level select idea. I think it adds unnecessary tedium for very little gain. The original idea was that you could define your run by choosing your path, but the reality is that the game isn't long enough for that. Instead, levels will come out randomly and new levels will be able to spawn enemies from previous levels. I also started setting out task groups for the project plan. This is starting to come together!!
### 2020.02.07 Color Specifics
I defined some the the specifics to the different colors I want to use.
### 2020.02.06 Game Flow
Today, I started working on the game flow. Basically, the player will go through a couple different dungeon levels collection crystals. The crystals will grant special abilities. After collecting all 3, they have to escape. There's a level selector that sits between the levels. I also added some Decisions that can be used to help drive design in the direction I'm thinking.
### 2020.02.04 Starting the Design
This will be my first attempt at a 7DRL and I'm terrified. I've tried a couple other game jams in the past (GM48) with little success, mostly due to a lack of time, but also due to a lack of experience. This README will comprise all the normal README garbage, but will also be my design document as I begin planning my week of development. I'm very excited! My idea for a game is _really simple_ and I think thats the best way to go for my first try. I'll be coming up with a pseudo-timeline as well as plan extra features in case things go better than expected (they won't).