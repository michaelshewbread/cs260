### Monkey Island
## Description

## Elevator pitch
Join a party of primates playing simultaneously across the globe and prove you're the king of the apes. Collect tropical fruits and take aim as you attempt to be the last simian standing on this chaotic island. Watch yourself rise the live leaderboard, but be careful; once you're in first, the others will have an arrow guiding them to your location, so be ready for some greedy chimps closing in! Outside the game, view how your top scores compare to others and etch your name forever in monkey history!
## Design
![Conceptual picture of game running](https://github.com/michaelshewbread/cs260/design.png)

![Conceptual picture of website screen](https://github.com/michaelshewbread/cs260/examplescreen.png)
## Key features
* Simultaneous multiplayer
* Keyboard input moves character around map
* Map includes trees that can be shaken and fruit that can be picked up
* Mouse click throws fruit
* Live leaderboard shows top players
* Upon death, if a score is high enough it will be saved to the "scores" page and can be viewed by any player
## Technologies
This application will use these technologies:
# HTML
HTML for the structure of the application, which has login page, main game page, and scores page.
# CSS
CSS for styling text and button elements.
# JavaScript
Javascript for the game logic, including handling input and sending data to server. Will also be used to control the movement of the player on the larger map image and move the larger map image on the screen appropriately. 
# Service
Upon death, request a random monkey noise from a webserver to play (for comedic effect).
# Database
Database for storing usernames associated with top scores.
# Login
A Login service to register new players and login existing ones.
# WebSocket
Input data from all players will be sent via websockets and authoritative player positions will be broadcast to all players. A current leaderboard will also be periodically updated.
# React
The game will be transferred to React.