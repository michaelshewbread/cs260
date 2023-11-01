# Monkey Island
## Description

## Elevator pitch
Join a party of primates playing simultaneously across the globe and prove you're the king of the apes. Collect tropical fruits and take aim as you attempt to be the last simian standing on this chaotic island. Watch yourself rise the live leaderboard, but be careful; once you're in first, the others will have an arrow guiding them to your location, so be ready for some greedy chimps closing in! Outside the game, view how your top scores compare to others and etch your name forever in monkey history!
## Design

Concept of main game:

![Conceptual picture of game running](https://github.com/michaelshewbread/cs260/blob/main/design.png)

Rough sketch of login screen:

![Conceptual picture of website screen](https://github.com/michaelshewbread/cs260/blob/main/examplescreen.png)
## Key features
* Simultaneous multiplayer
* Keyboard input moves character around map
* Map includes trees that can be shaken and fruit that can be picked up
* Mouse click throws fruit
* Live leaderboard shows top players
* Upon death, if a score is high enough it will be saved to the "scores" page and can be viewed by any player
## Technologies
This application will use these technologies:
### HTML
HTML for the structure of the application, which has login page, main game page, and scores page.
### CSS
CSS for styling text and button elements.
### JavaScript
Javascript for the game logic, including handling input and sending data to server. Will also be used to control the movement of the player on the larger map image and move the larger map image on the screen appropriately. 
### Service
Upon death, request a random monkey noise from a webserver to play (for comedic effect).
### Database
Database for storing usernames associated with top scores.
### Login
A Login service to register new players and login existing ones.
### WebSocket
Input data from all players will be sent via websockets and authoritative player positions will be broadcast to all players. A current leaderboard will also be periodically updated.
### React
The game will be transferred to React.

## HTML Deliverable
### HTML pages
Three pages that provide login services, the main game, and a leaderboard service.
### Links
As in Simon, the login button takes you to the main page. Each page has a header with links to all other pages.
### Text
Appropriate text explaining the different elements in the layout.
### 3rd party service calls
Placeholder with sample audio clip for 3rd party web service in main.html
### Images
Sample game screen is shown through an image.
### Login
Login element included in index.html
### Database
Leaderboard.html features a table holding sample data that will be populated by a database later.
### WebSocket
The live leaderboard in main.html as well as future game functionality represent placeholders for WebSocket communication.

## CSS Deliverable
Looks a lot better, but I may still spend some time later to fix some things up. I was taking way too long doing this so I had to stop myself before I don't get the javascript done in time.
### Header, Footer, Main content
Headers and footers are all good, had to skip elements on the main (game) page due to time.
### Navigation elements
They all work and are stylized a bit. Nothing super crazy.
### Responsive to window resizing
I did not attempt this generally, but I did make some elements in the main game disappear or resize if the window got too small.
### Application elements
Everything that I plan to have in the final version is here, more or less. I put some animations in to be managed a bit by javascript.
### Application text content
I used a few different fonts and colors, trying to keep a consistent palette.
### Application images
The pages feature a couple hand-crafted images along with some pure css ones. I think they look passable.

## HTML Deliverable
### Login
Saves username to local storage and applies it to the live leaderboard in the main game.

### Database
Placeholder data for the leaderboard will be replaced with database data later.

### WebSocket
There is placeholder data in the live leaderboard that will be replaced with other player data layer. The positioning system saves player position independent of the map position, so these (x,y) positions can be sent over a websocket to give accurate positions of other players.

### Application logic
Not everything is here, but several of the most important features are. This includes:
* Ground and tree map layering
* Live leaderboard functionality
* Correct player movement and positioning, even when window is resized
* Correct player rotation when in full screen, still working on allowing it to work after resizing window
* Basic throwing mechanics
* Interactable health bar, though nothing affects it right now.