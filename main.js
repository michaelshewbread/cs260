let player = document.querySelector(".player");
let map = document.querySelector(".map");

let playername = document.querySelector(".player-name");
playername.textContent = localStorage.getItem("username");

let xpos = 0;
let ypos = 0;

let rot = 0;

const screenWidth = window.screen.width;
const screenHeight = window.screen.height; 

let held_directions = [];

let speed = 5;

const positionPlayer = () => {
    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === 'd') {xpos += speed;}
        if (held_direction === 'a') {xpos -= speed;}
        if (held_direction === 'w') {ypos -= speed;}
        if (held_direction === 's') {ypos += speed;}
    }

    //this needs to be updated to take change in screen size into account, its very inaccurate
    map.style.transform = "translate("+ (-xpos-(screenWidth/2)+925) + "px," + (-ypos-(screenHeight/2)+150) + "px)";
    
    player.style.transform = "translate("+ xpos + "px," + ypos + "px) rotate(" + rot + "deg)";
}

const step = () => {
    positionPlayer();
    window.requestAnimationFrame(()=> {step();})
}
step();

document.addEventListener("keydown", (evt) => {
    let dir = evt.key;
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir);
    }
});

document.addEventListener("keyup", (evt) => {
    //delete the released key from the array
    let dir = evt.key;
    let index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1);
    }
});

document.addEventListener("mousemove", (evt) => {
    //this needs to be changed to be based on an offset from the origin(player), which means
    //that the map transform above needs to incorporate responsive design also
    let x = evt.screenX - screenWidth/2;
    //evt.pageX is relative to document, offsetX is relative to target, screenX relative to scree
    let y = screenHeight/2 - evt.screenY;
    //it takes a lot of math to orient the player right.
    rot = (-1*((Math.atan2(y,x) *(180 / Math.PI)) + 90))+180; 

});